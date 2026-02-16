import {auth} from '@/auth';
import {Prisma} from '@/app/generated/prisma/client';
import {Visit} from '@/app/lib/types';
import {OrderType} from '@/app/lib/enums';
import {State} from '@/app/server/visits/actions';
import {CreateVisit} from '@/app/server/schemas';
import {ZodError} from 'zod';

type VisitWithShop = Prisma.VisitGetPayload<{
  include: {shop: true};
}>;

export const getValidSession = async () => {
  const sessionRaw = await auth();
  if (!sessionRaw) {
    throw new Error('Session not found');
  } else if (!sessionRaw.user) {
    throw new Error('User does not exist');
  } else if (!sessionRaw.user.email) {
    throw new Error('User email does not exist');
  }

  return sessionRaw;
};

export const transformVisitForClient = (
  dbVisit: VisitWithShop,
  reconId?: string,
): Visit => {
  return {
    id: dbVisit.id,
    reconId: reconId,
    date: transformDateForClient(dbVisit.date),
    notes: dbVisit.notes ?? undefined,
    drink: dbVisit.drink,
    shopName: dbVisit.shop.name,
    shopId: dbVisit.shop.googleId,
    orderType: getOrderType(dbVisit.orderType),
    price: formatPriceForUser(dbVisit.price),
    rating: dbVisit.rating,
    size: dbVisit.size,
  };
};

export const getVisitFromFormData = (formData: FormData): State => {
  const validatedFields = CreateVisit.safeParse({
    reconId: formData.get('recon-id'),
    shopId: formData.get('shop-id'),
    shopName: formData.get('shop-name'),
    size: formData.get('size'),
    drink: formData.get('drink'),
    rating: formData.get('rating'),
    price: formData.get('price'),
    date: formData.get('date'),
    notes: formData.get('notes'),
    orderType: formData.get('order-type'),
  });

  if (!validatedFields.success) {
    return generateErrorForClient(validatedFields.error);
  }

  const visit: Visit = {
    id: formData.get('id')?.toString() ?? 'no_id',
    reconId: validatedFields.data.reconId,
    shopId: validatedFields.data.shopId,
    shopName: validatedFields.data.shopName,
    size: validatedFields.data.size,
    drink: validatedFields.data.drink,
    rating: validatedFields.data.rating,
    price: validatedFields.data.price,
    date: validatedFields.data.date,
    notes: validatedFields.data.notes,
    orderType: getOrderType(validatedFields.data?.orderType),
  };

  return {visit: visit};
};

// FORMAT: 4.45 -> 445
export const formatPriceForDatabase = (priceFromUser?: number) => {
  return priceFromUser !== undefined ? Math.floor(priceFromUser * 100) : null;
};

// FORMAT: 445 -> 4.45 | 450 -> 4.5
export const formatPriceForUser = (priceFromDatabase: number | null) => {
  return priceFromDatabase
    ? Number.parseFloat((priceFromDatabase / 100).toFixed(2))
    : undefined;
};

// FORMAT: 4.45 -> '$4.45' | 4 -> '$4' | 4.5 -> '$4.50'
export const transformPriceForCard = (priceFromServer: number) => {
  const priceToDisplay =
    priceFromServer % 1 === 0 ? priceFromServer : priceFromServer.toFixed(2);
  return `$${priceToDisplay}`;
};

// FORMAT: 4.45 -> '4.45' | 4 -> '4' | 4.5 -> '4.50'
export const transformPriceForInput = (priceFromServer: number) => {
  return priceFromServer.toFixed(2);
};

// Format: YYYY-MM-DD
export const transformDateForClient = (dateFromDatabase: Date | null) => {
  return dateFromDatabase
    ? dateFromDatabase.toISOString().split('T')[0]
    : undefined;
};

// Format: M/D/YYYY
export const formatDateForUser = (dateForClient: string) => {
  const dateParts = dateForClient.split('-');
  return `${dateParts[1].replace(/^0*/, '')}/${dateParts[2].replace(/^0*/, '')}/${dateParts[0]}`;
};

export const getOrderType = (orderType: string) => {
  switch (orderType) {
    case OrderType.ForHere:
      return OrderType.ForHere;
    case OrderType.CoffeeBeans:
      return OrderType.CoffeeBeans;
    default:
      return OrderType.ToGo;
  }
};

export const logError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }
};

export const generateErrorForClient = (
  error: unknown,
  context?: string,
  visit?: Visit,
): State => {
  if (error instanceof ZodError) {
    const msg = condenseZodErrors(error);
    return {
      message: msg !== '' ? msg : 'Unknown error occurred',
      visit: visit,
    };
  } else if (error instanceof Error) {
    const msg = error.message;
    return {
      message: msg !== '' ? msg : 'Unknown error occurred',
      visit: visit,
    };
  } else if (context && context !== '') {
    return {
      message: `Unknown error occurred when ${context}`,
      visit: visit,
    };
  } else {
    return {
      message: 'Unknown error occurred',
      visit: visit,
    };
  }
};

export const condenseZodErrors = (error: ZodError) => {
  return error.errors.reduce(
    (fullMessage, error) =>
      fullMessage ? `${fullMessage}\n${error.message}` : error.message,
    '',
  );
};

export const getLoginError = (error: string) => {
  switch (error) {
    case 'SignInError':
    case 'OAuthSignInError':
    case 'OAuthCallbackError':
      return 'Try signing in with a different account.';
    case 'AccessDenied':
      return 'Access denied.';
    case 'AccountNotLinked':
      return 'To confirm your identity, sign in with the same account you used originally.';
    case 'EmailSignInError':
      return 'Sign in failed. Check your email address.';
    case 'CredentialsSignin':
      return 'Sign in failed. Check the details you provided are correct.';
    default:
      return 'Unable to sign in.';
  }
};

export const splitVisitsIntoColumns = (
  items: Visit[],
  numColumns: number,
): Visit[][] => {
  const columns: Visit[][] = Array.from({length: numColumns}, () => []);

  items.forEach((item, index) => {
    columns[index % numColumns].push(item);
  });

  return columns;
};
