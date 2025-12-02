import {auth} from '@/auth';
import {Prisma} from '@prisma/client';
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

export const getVisitForClient = (
  dbVisit: VisitWithShop,
  reconId?: string,
): Visit => {
  return {
    id: dbVisit.id,
    reconId: reconId,
    date: dbVisit.date ? getDateForClient(dbVisit.date) : null,
    notes: dbVisit.notes,
    drink: dbVisit.drink,
    shopName: dbVisit.shop.name,
    shopId: dbVisit.shop.googleId,
    orderType: getOrderType(dbVisit.orderType),
    price: getPriceForUser(dbVisit.price),
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
    date: validatedFields.data.date ?? null,
    notes: validatedFields.data.notes ?? null,
    orderType: getOrderType(validatedFields.data?.orderType),
  };

  return {visit: visit};
};

// FORMAT: 4.45 -> 445
export const getPriceForDatabase = (priceFromUser: number) => {
  return Math.floor(priceFromUser * 100);
};

// FORMAT: 445 -> '4.45' | 450 -> '4.5'
export const getPriceForUser = (priceFromDatabase: number) => {
  return Number.parseFloat((priceFromDatabase / 100).toFixed(2));
};

// FORMAT: 445 -> '$4.45' | 400 -> '$4'
export const getPriceForDisplay = (priceFromDatabase: number) => {
  const priceToDisplay =
    priceFromDatabase % 1 === 0
      ? priceFromDatabase
      : priceFromDatabase.toFixed(2);
  return `$${priceToDisplay}`;
};

// Format: YYYY-MM-DD
export const getDateForClient = (dateFromDatabase: Date) => {
  return dateFromDatabase.toISOString().split('T')[0];
};

// Format: M/D/YYYY
export const getDateForUser = (dateForClient: string) => {
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
): State => {
  if (error instanceof ZodError) {
    return {message: condenseZodErrors(error)};
  } else if (error instanceof Error) {
    return {message: error.message};
  } else {
    return {message: `Unknown error occurred when ${context}`};
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
