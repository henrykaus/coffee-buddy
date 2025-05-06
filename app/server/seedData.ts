'use server';

import {PrismaClient} from '@prisma/client';
import {Visit} from '@/app/lib/types';
import {OrderType} from '@/app/lib/enums';
import {getUser} from '@/app/server/users/actions';
import {getValidSession} from '@/app/server/common';

const prisma = new PrismaClient();

const seedData = async () => {
  const session = await getValidSession();
  const user = await getUser(session.user?.email as string);
  if (!user || !user.id) {
    return;
  }

  const userId = user.id;

  const visitList: Visit[] = [
    {
      id: 'N/A',
      notes: 'It was pretty decent for a first drink ngl',
      drink: 'Vanilla Latte',
      date: '2025-03-17',
      orderType: OrderType.ToGo,
      price: 575,
      rating: 4,
      shopName: 'Insomnia',
      shopId: 'N10963848676',
      size: 8,
      userId: userId,
    },
    {
      id: 'N/A',
      notes: 'The art was great and the people were neat',
      drink: 'Vanilla Flat White',
      date: '2025-03-23',
      orderType: OrderType.ForHere,
      price: 175,
      rating: 3.5,
      shopName: 'Lionheart (Beaverton)',
      shopId: 'W946737443',
      size: 8,
      userId: userId,
    },
    {
      id: 'N/A',
      notes: 'Actually not the best unfortunately',
      drink: 'Vanilla Latte',
      date: '2025-03-22',
      orderType: OrderType.ForHere,
      price: 550,
      rating: 2,
      shopName: 'Blue Scorcher Bakery and Cafe',
      shopId: 'N5225196890',
      size: 8,
      userId: userId,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const promises: Promise<any>[] = [];

  for (const visitData of visitList) {
    promises.push(
      prisma.visit.create({
        data: {
          notes: visitData.notes,
          drink: visitData.drink,
          date: new Date(visitData.date),
          orderType: visitData.orderType,
          price: visitData.price,
          rating: visitData.rating,
          size: visitData.size,
          user: {
            connect: {
              id: userId,
            },
          },
          shop: {
            connectOrCreate: {
              where: {
                osmId: visitData.shopId,
              },
              create: {
                osmId: visitData.shopId,
                name: visitData.shopName,
              },
            },
          },
        },
      }),
    );
  }

  Promise.all(promises).then((values) => {
    console.log(values);
  });
};

export default seedData;
