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
