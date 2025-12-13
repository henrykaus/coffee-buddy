'use server';

import 'dotenv/config';
import prisma from '@/app/server/prisma';
import {User} from '@/app/lib/types';
import {AddUser} from '@/app/server/schemas';
import {generateErrorForClient} from '@/app/server/common';

export const addUser = async (email: string): Promise<User | null> => {
  const validatedFields = AddUser.safeParse({
    email: email,
  });

  if (!validatedFields.success) {
    console.error(
      `Failed to add user.\n${generateErrorForClient(validatedFields.error).message}`,
    );
    return null;
  }

  const existingUser = await getUser(email);

  if (existingUser) {
    return existingUser;
  } else {
    return prisma.user.create({
      data: {
        email: email,
      },
    });
  }
};

export const getUser = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const listUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({});
};
