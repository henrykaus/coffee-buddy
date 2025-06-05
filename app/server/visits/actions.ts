'use server';

import {prisma} from '@/app/server/prisma';
import {Visit} from '@/app/lib/types';
import {getUser} from '@/app/server/users/actions';
import {
  generateErrorForClient,
  getPriceForDatabase,
  getValidSession,
  getVisitForClient,
  logError,
} from '@/app/server/common';
import {CreateVisit, UpdateVisit} from '@/app/server/schemas';

export type State = {
  message?: string | null;
  visit?: Visit | null;
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

      return generateErrorForClient(validatedFields.error);
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
        price: getPriceForDatabase(price),
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
              osmId: shopId,
            },
            create: {
              osmId: shopId,
              name: shopName,
            },
          },
        },
      },
      include: {
        shop: true,
      },
    });

    return {visit: getVisitForClient(dbVisit, reconId)};
  } catch (error: unknown) {
    logError(error);
    return generateErrorForClient(error, 'adding visit');
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

    return {visit: getVisitForClient(dbVisit)};
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

    const visits = dbVisits.map((visit) => getVisitForClient(visit));
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
      return generateErrorForClient(validatedFields.error);
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
        price: getPriceForDatabase(price),
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
              osmId: shopId,
            },
            create: {
              osmId: shopId,
              name: shopName,
            },
          },
        },
      },
      include: {
        shop: true,
      },
    });

    return {visit: getVisitForClient(rawVisit, reconId)};
  } catch (error: unknown) {
    logError(error);
    return generateErrorForClient(error, 'updating visit');
  }
};

// TODO: need to also use reconId here
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

    return {visit: getVisitForClient(dbVisit)};
  } catch (error: unknown) {
    logError(error);
    return generateErrorForClient(error, `deleting visit with ID ${id}`);
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

    const visits = rawVisits.map((visit) => getVisitForClient(visit));
    return visits;
  } catch (error: unknown) {
    logError(error);
    return [];
  }
};
