import {auth} from '@/auth';
import {Prisma} from '@prisma/client';
import {Visit} from '@/app/lib/types';
import {OrderType} from '@/app/lib/enums';
import {State} from '@/app/server/visits/actions';

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
    shopId: dbVisit.shop.osmId,
    orderType:
      dbVisit.orderType === OrderType.ForHere
        ? OrderType.ForHere
        : OrderType.ToGo,
    price: getPriceForUser(dbVisit.price),
    rating: dbVisit.rating,
    size: dbVisit.size,
  };
};

// FIXME: This is very basic and incorrect, this should use proper validation before it is sent to client rather than defaults
export const getVisitFromFormData = (formData: FormData): Visit => {
  const visit = {
    id: formData.get('id')?.toString() ?? 'FIXME id',
    reconId: formData.get('recon-id')?.toString() ?? 'FIXME reconID',
    shopId: formData.get('shop-id')?.toString() ?? 'FIXME shopId',
    shopName: formData.get('shop-name')?.toString() ?? 'FIXME shop',
    size: parseInt(formData.get('size')?.toString() ?? '0') ?? null,
    drink: formData.get('drink')?.toString() ?? 'FIXME drink',
    rating: parseInt(formData.get('rating')?.toString() ?? '0') ?? null,
    price: parseFloat(formData.get('price')?.toString() ?? '-1'),
    date: formData.get('date')?.toString() ?? null,
    notes: formData.get('notes')?.toString() ?? null,
    orderType:
      formData.get('order-type')?.toString() === OrderType.ForHere
        ? OrderType.ForHere
        : OrderType.ToGo,
  };

  return visit;
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
  if (error instanceof Error) {
    return {message: error.message};
  } else {
    return {message: `Unknown error occurred when ${context}`};
  }
};
