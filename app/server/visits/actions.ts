'use server';

import {z} from 'zod';
import {prisma} from '@/app/server/prisma';
import {Visit} from '@/app/lib/types';
import {OrderType} from '@/app/lib/enums';
import {getUser} from '@/app/server/users/actions';
import {
  getDateForClient,
  getPriceForDatabase,
  getPriceForUser,
  getValidSession,
} from '@/app/server/common';

export type State = {
  message?: string | null;
};

const VisitSchema = z.object({
  id: z.string(),
  userId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  shop: z.string().min(1),
  size: z.coerce
    .number()
    .int()
    .gt(0, {message: 'Please enter a valid size greater than 0oz'}),
  drink: z.string().min(1),
  rating: z.coerce
    .number()
    .min(0, {message: 'Please enter a valid rating between 0 and 5'})
    .max(500, {message: 'Please enter a valid rating between 0 and 5'}),
  price: z.coerce.number().min(0, {
    message: 'Please enter a valid price greater than or equal to $0',
  }),
  date: z.string(),
  notes: z.ostring(),
  orderType: z.enum(['TO GO', 'FOR HERE'], {
    invalid_type_error: 'Please select an order type.....',
  }),
});

const AddVisit = VisitSchema.omit({id: true, userId: true});

export const addVisit = async (
  prevState: State | undefined,
  formData: FormData,
) => {
  try {
    const session = await getValidSession();
    const user = await getUser(session.user?.email as string);
    if (!user || !user.id) {
      throw new Error(`User with email ${session.user?.email} does not exist.`);
    }

    const validatedFields = AddVisit.safeParse({
      shop: formData.get('shop'),
      size: formData.get('size'),
      drink: formData.get('drink'),
      rating: formData.get('rating'),
      price: formData.get('price'),
      date: formData.get('date'),
      notes: formData.get('notes'),
      orderType: formData.get('order-type'),
    });

    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      console.log(formData);
      return {
        message: `Failed to add location.\n${validatedFields.error.flatten().fieldErrors}`,
      };
    }

    const {shop, size, drink, rating, price, date, notes, orderType} =
      validatedFields.data;

    const visits = await prisma.visits.create({
      data: {
        userId: user.id,
        shop: shop,
        size: size,
        drink: drink,
        rating: rating,
        price: getPriceForDatabase(price),
        date: new Date(date),
        notes: notes,
        orderType: orderType,
      },
    });

    console.log(visits);
  } catch (error: any) {
    console.error(error);
    return {
      message: error.message,
    };
  }
};

export const getVisit = async (id: string): Promise<Visit | undefined> => {
  try {
    const session = await getValidSession();
    const user = await getUser(session.user?.email as string);
    if (!user || !user.id) {
      throw new Error(`User with email ${session.user?.email} does not exist.`);
    }

    const rawVisit = await prisma.visits.findUnique({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!rawVisit) {
      return undefined;
    }

    const visit = {
      id: rawVisit.id,
      date: getDateForClient(rawVisit.date),
      notes: rawVisit.notes,
      drink: rawVisit.drink,
      shop: rawVisit.shop,
      orderType:
        rawVisit.orderType === OrderType.ForHere
          ? OrderType.ForHere
          : OrderType.ToGo,
      price: getPriceForUser(rawVisit.price),
      rating: rawVisit.rating,
      size: rawVisit.size,
    };

    return visit;
  } catch (error: any) {
    console.error(error.message);
    return undefined;
  }
};

export const listVisits = async (): Promise<Visit[]> => {
  try {
    const session = await getValidSession();
    const user = await getUser(session.user?.email as string);
    if (!user || !user.id) {
      throw new Error(`User with email ${session.user?.email} does not exist.`);
    }

    const rawVisits = await prisma.visits.findMany({
      where: {
        userId: user.id,
      },
      orderBy: [
        {
          date: 'desc',
        },
      ],
    });

    const visits = rawVisits.map((visit) => ({
      id: visit.id,
      date: getDateForClient(visit.date),
      notes: visit.notes,
      drink: visit.drink,
      shop: visit.shop,
      orderType:
        visit.orderType === OrderType.ForHere
          ? OrderType.ForHere
          : OrderType.ToGo,
      price: getPriceForUser(visit.price),
      rating: visit.rating,
      size: visit.size,
    }));

    return visits;
  } catch (error: any) {
    return [];
  }
};

const UpdateVisit = VisitSchema.omit({userId: true});

export const updateVisit = async (
  prevState: State | undefined,
  formData: FormData,
) => {
  try {
    const session = await getValidSession();
    const user = await getUser(session.user?.email as string);
    if (!user || !user.id) {
      throw new Error(`User with email ${session.user?.email} does not exist.`);
    }

    const validatedFields = UpdateVisit.safeParse({
      id: formData.get('id'),
      shop: formData.get('shop'),
      size: formData.get('size'),
      drink: formData.get('drink'),
      rating: formData.get('rating'),
      price: formData.get('price'),
      date: formData.get('date'),
      notes: formData.get('notes'),
      orderType: formData.get('order-type'),
    });

    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      console.log(formData);
      return {
        message: `Failed to update location.\n${validatedFields.error.flatten().fieldErrors}`,
      };
    }

    const {id, shop, size, drink, rating, price, date, notes, orderType} =
      validatedFields.data;

    console.log(date);

    const visit = await prisma.visits.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: {
        userId: user.id,
        shop: shop,
        size: size,
        drink: drink,
        rating: rating,
        price: getPriceForDatabase(price),
        date: new Date(date),
        notes: notes,
        orderType: orderType,
      },
    });

    console.log(visit);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const deleteVisit = async (id: string) => {
  try {
    const session = await getValidSession();
    const user = await getUser(session.user?.email as string);
    if (!user || !user.id) {
      throw new Error(`User with email ${session.user?.email} does not exist.`);
    }

    await prisma.visits.delete({
      where: {
        id: id,
        userId: user.id,
      },
    });
  } catch (error: any) {
    console.error(error.message);
  }
};

export const searchVisits = async (query: string) => {
  try {
    const session = await getValidSession();
    const user = await getUser(session.user?.email as string);
    if (!user || !user.id) {
      throw new Error(`User with email ${session.user?.email} does not exist.`);
    }

    const rawVisits = await prisma.visits.findMany({
      where: {
        userId: user.id,
        AND: {
          OR: [
            {
              shop: {
                contains: query,
                mode: 'insensitive',
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
    });

    const visits = rawVisits.map((visit) => ({
      id: visit.id,
      date: getDateForClient(visit.date),
      notes: visit.notes,
      drink: visit.drink,
      shop: visit.shop,
      orderType:
        visit.orderType === OrderType.ForHere
          ? OrderType.ForHere
          : OrderType.ToGo,
      price: getPriceForUser(visit.price),
      rating: visit.rating,
      size: visit.size,
    }));

    return visits;
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
};
