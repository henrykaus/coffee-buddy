import {auth} from '@/auth';

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

// FORMAT: $4.45 -> 445
export const getPriceForDatabase = (priceFromUser: number) => {
  return Math.floor(priceFromUser * 100);
};

// FORMAT: 445 -> $4.45
export const getPriceForUser = (priceFromDatabase: number) => {
  return Number.parseFloat((priceFromDatabase / 100).toFixed(2));
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
