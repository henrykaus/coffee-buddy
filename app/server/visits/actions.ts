'use server';

import 'dotenv/config';
import prisma from '@/app/server/prisma';
import {Visit} from '@/app/lib/types';
import {getUser} from '@/app/server/users/actions';
import {
  generateErrorForClient,
  formatPriceForDatabase,
  getValidSession,
  transformVisitForClient,
  logError,
} from '@/app/server/common';
import {CreateVisit, UpdateVisit} from '@/app/server/schemas';
import {EMPTY_VISIT} from '@/app/lib/constants';

export type State = {
  message?: string | null;
  visit?: Visit | null;
};

const getSanitizedFormDataString = (str: FormDataEntryValue | null) => {
  return str === null || typeof str !== 'string' ? '' : str;
};

const getVisitForError = async (id: FormDataEntryValue | null) => {
  try {
    const visitId = getSanitizedFormDataString(id);
    if (visitId === '') {
      return undefined;
    }

    const visit = await getVisit(visitId);
    if (!visit.visit) {
      return undefined;
    }

    return visit.visit;
  } catch {
    // Ignore any error
    return undefined;
  }
};

export const createVisit = async (
  prevState: State | undefined,
  formData: FormData,
): Promise<State> => {
  try {
    const session = await getValidSession();
    const user = await getUser(session.user?.email as string);
    if (!user || !user.id) {
      throw new Error(`User with email ${session.user?.email} does not exist.`);
    }

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
      logError(
        `Failed to add location.\n${generateErrorForClient(validatedFields.error).message}`,
      );

      return generateErrorForClient(validatedFields.error, undefined, {
        ...EMPTY_VISIT,
        reconId: getSanitizedFormDataString(formData.get('recon-id')),
      });
    }

    const {
      reconId,
      shopId,
      shopName,
      size,
      drink,
      rating,
      price,
      date,
      notes,
      orderType,
    } = validatedFields.data;

    const dbVisit = await prisma.visit.create({
      data: {
        size: size,
        drink: drink,
        rating: rating,
        price: formatPriceForDatabase(price),
        date: date ? new Date(date) : null,
        notes: notes,
        orderType: orderType,
        user: {
          connect: {
            id: user.id,
          },
        },
        shop: {
          connectOrCreate: {
            where: {
              googleId: shopId,
            },
            create: {
              googleId: shopId,
              name: shopName,
            },
          },
        },
      },
      include: {
        shop: true,
      },
    });

    return {visit: transformVisitForClient(dbVisit, reconId)};
  } catch (error: unknown) {
    logError(error);

    return generateErrorForClient(error, 'adding visit', {
      ...EMPTY_VISIT,
      reconId: getSanitizedFormDataString(formData.get('recon-id')),
    });
  }
};

export const getVisit = async (id: string): Promise<State> => {
  try {
    const session = await getValidSession();
    const user = await getUser(session.user?.email as string);
    if (!user || !user.id) {
      throw new Error(`User with email ${session.user?.email} does not exist.`);
    }

    const dbVisit = await prisma.visit.findUnique({
      where: {
        id: id,
        userId: user.id,
      },
      include: {
        shop: true,
      },
    });

    if (!dbVisit) {
      throw new Error(`Visit with ID ${id} was not found.`);
    }

    return {visit: transformVisitForClient(dbVisit)};
  } catch (error: unknown) {
    logError(error);
    return generateErrorForClient(error, `getting visit with ID ${id}`);
  }
};

export const listVisits = async (): Promise<Visit[]> => {
  try {
    const session = await getValidSession();
    const user = await getUser(session.user?.email as string);
    if (!user || !user.id) {
      throw new Error(`User with email ${session.user?.email} does not exist.`);
    }

    const dbVisits = await prisma.visit.findMany({
      where: {
        userId: user.id,
      },
      orderBy: [
        {
          date: 'desc',
        },
      ],
      include: {
        shop: true,
      },
    });

    const visits = dbVisits.map((visit) => transformVisitForClient(visit));
    return visits;
  } catch (error: unknown) {
    logError(error);
    return [];
  }
};

export const updateVisit = async (
  prevState: State | undefined,
  formData: FormData,
): Promise<State> => {
  try {
    const session = await getValidSession();
    const user = await getUser(session.user?.email as string);
    if (!user || !user.id) {
      throw new Error(`User with email ${session.user?.email} does not exist.`);
    }

    const validatedFields = UpdateVisit.safeParse({
      id: formData.get('id'),
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
      return generateErrorForClient(
        validatedFields.error,
        undefined,
        await getVisitForError(formData.get('id')),
      );
    }

    const {
      id,
      reconId,
      shopId,
      shopName,
      size,
      drink,
      rating,
      price,
      date,
      notes,
      orderType,
    } = validatedFields.data;

    const rawVisit = await prisma.visit.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: {
        size: size,
        drink: drink,
        rating: rating,
        price: formatPriceForDatabase(price),
        date: date ? new Date(date) : null,
        notes: notes,
        orderType: orderType,
        user: {
          connect: {
            id: user.id,
          },
        },
        shop: {
          connectOrCreate: {
            where: {
              googleId: shopId,
            },
            create: {
              googleId: shopId,
              name: shopName,
            },
          },
        },
      },
      include: {
        shop: true,
      },
    });

    return {visit: transformVisitForClient(rawVisit, reconId)};
  } catch (error: unknown) {
    logError(error);

    return generateErrorForClient(
      error,
      'updating visit',
      await getVisitForError(formData.get('id')),
    );
  }
};

export const deleteVisit = async (id: string): Promise<State> => {
  try {
    const session = await getValidSession();
    const user = await getUser(session.user?.email as string);
    if (!user || !user.id) {
      throw new Error(`User with email ${session.user?.email} does not exist.`);
    }

    const dbVisit = await prisma.visit.delete({
      where: {
        id: id,
        userId: user.id,
      },
      include: {
        shop: true,
      },
    });

    return {visit: transformVisitForClient(dbVisit)};
  } catch (error: unknown) {
    logError(error);
    return generateErrorForClient(
      error,
      `deleting visit with ID ${id}`,
      await getVisitForError(id),
    );
  }
};

export const searchVisits = async (query: string): Promise<Visit[]> => {
  try {
    const session = await getValidSession();
    const user = await getUser(session.user?.email as string);
    if (!user || !user.id) {
      throw new Error(`User with email ${session.user?.email} does not exist.`);
    }

    const rawVisits = await prisma.visit.findMany({
      where: {
        userId: user.id,
        AND: {
          OR: [
            {
              shop: {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            },
            {
              drink: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
      },
      orderBy: [
        {
          date: 'desc',
        },
      ],
      include: {
        shop: true,
      },
    });

    const visits = rawVisits.map((visit) => transformVisitForClient(visit));
    return visits;
  } catch (error: unknown) {
    logError(error);
    return [];
  }
};
