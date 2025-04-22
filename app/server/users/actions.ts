'use server';

import {z} from 'zod';
import {prisma} from '@/app/server/prisma';
import {User} from '@/app/lib/types';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

const AddUser = UserSchema.omit({id: true});

export const addUser = async (email: string): Promise<User | null> => {
  const validatedFields = AddUser.safeParse({
    email: email,
  });

  if (!validatedFields.success) {
    console.error(
      `Failed to add user.\n${validatedFields.error.flatten().fieldErrors}`,
    );
    return null;
  }

  const existingUser = await getUser(email);

  if (existingUser) {
    return existingUser;
  } else {
    return prisma.users.create({
      data: {
        email: email,
      },
    });
  }
};

export const getUser = async (email: string): Promise<User | null> => {
  return prisma.users.findUnique({
    where: {
      email: email,
    },
  });
};

export const listUsers = async (): Promise<User[]> => {
  return prisma.users.findMany({});
};
