'use server';

import {getValidSession, logError} from '@/app/server/common';
import {getUser} from '@/app/server/users/actions';
import {prisma} from '@/app/server/prisma';

export const deleteUserData = async () => {
  try {
    const session = await getValidSession();
    const user = await getUser(session.user?.email as string);
    if (!user || !user.id) {
      throw new Error(`User with email ${session.user?.email} does not exist.`);
    }

    // Delete user
    const deletedUser = await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    console.log(`Delete user ${deletedUser.email} with id ${deletedUser.id}`);
  } catch (error: unknown) {
    logError(error);
    return undefined;
  }
};
