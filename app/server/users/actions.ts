'use server';

import { z } from 'zod';
import {prisma} from '@/app/server/prisma';
import {User} from '@/app/lib/types';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

const AddUser = UserSchema.omit({ id: true });

export const addUser = async (userData: User): Promise<User | null> => {
  const validatedFields = AddUser.safeParse({
    email: userData.email,
  });

  if (!validatedFields.success) {
    console.error(`Failed to add user.\n${validatedFields.error.flatten().fieldErrors}`)
    return null;
  }

  return prisma.users.create({
    data: {
      email: userData.email,
    },
  });
}

export const listUsers = async (): Promise<User[]> => {
  return prisma.users.findMany({})
}
