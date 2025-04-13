'use server';

import {z} from 'zod';
import {prisma} from '@/app/server/prisma';
import {Visit} from '@/app/lib/types';
import {OrderType} from '@/app/lib/enums';

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

const AddVisit = VisitSchema.omit({id: true});

export const addVisit = async (
  prevState: State | undefined,
  formData: FormData,
) => {
  const validatedFields = AddVisit.safeParse({
    userId: formData.get('userId'),
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

  const {userId, shop, size, drink, rating, price, date, notes, orderType} =
    validatedFields.data;

  const visits = await prisma.visits.create({
    data: {
      userId: userId,
      shop: shop,
      size: size,
      drink: drink,
      rating: rating,
      price: price,
      date: new Date(date),
      notes: notes,
      orderType: orderType,
    },
  });

  console.log(visits);
};

export const getVisit = async (id: string): Promise<Visit | undefined> => {
  const rawVisit = await prisma.visits.findUnique({
    where: {
      id: id,
    },
  });

  if (!rawVisit) {
    return undefined;
  }

  const visit = {
    id: rawVisit.id,
    date: rawVisit.date.toLocaleDateString(),
    notes: rawVisit.notes,
    drink: rawVisit.drink,
    shop: rawVisit.shop,
    orderType:
      rawVisit.orderType === OrderType.ForHere
        ? OrderType.ForHere
        : OrderType.ToGo,
    price: rawVisit.price,
    rating: rawVisit.rating,
    size: rawVisit.size,
  };

  return visit;
};

export const listVisits = async (userId: string): Promise<Visit[]> => {
  const rawVisits = await prisma.visits.findMany({
    where: {
      userId: userId,
    },
  });

  const visits = rawVisits.map((visit) => ({
    id: visit.id,
    date: visit.date.toLocaleDateString(),
    notes: visit.notes,
    drink: visit.drink,
    shop: visit.shop,
    orderType:
      visit.orderType === OrderType.ForHere
        ? OrderType.ForHere
        : OrderType.ToGo,
    price: visit.price,
    rating: visit.rating,
    size: visit.size,
  }));

  return visits;
};

const UpdateVisit = VisitSchema;

export const updateVisit = async (
  prevState: State | undefined,
  formData: FormData,
) => {
  const validatedFields = UpdateVisit.safeParse({
    id: formData.get('id'),
    userId: formData.get('userId'),
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

  const {id, userId, shop, size, drink, rating, price, date, notes, orderType} =
    validatedFields.data;

  const visits = await prisma.visits.update({
    where: {
      id: id,
    },
    data: {
      userId: userId,
      shop: shop,
      size: size,
      drink: drink,
      rating: rating,
      price: price,
      date: new Date(date),
      notes: notes,
      orderType: orderType,
    },
  });

  console.log(visits);
};

export const deleteVisit = async (id: string) => {
  await prisma.visits.delete({
    where: {
      id: id,
    },
  });
};

export const searchVisits = async (userId: string, query: string) => {
  const rawVisits = await prisma.visits.findMany({
    where: {
      userId: userId,
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
  });

  const visits = rawVisits.map((visit) => ({
    id: visit.id,
    date: visit.date.toLocaleDateString(),
    notes: visit.notes,
    drink: visit.drink,
    shop: visit.shop,
    orderType:
      visit.orderType === OrderType.ForHere
        ? OrderType.ForHere
        : OrderType.ToGo,
    price: visit.price,
    rating: visit.rating,
    size: visit.size,
  }));

  return visits;
};
