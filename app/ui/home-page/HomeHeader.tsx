import Form from 'next/form';
import seedData from '@/app/server/seedData';
import UserMenu from '@/app/ui/user-menu/UserMenu';
import React from 'react';
import {auth} from '@/auth';

export default async function HomeHeader() {
  const session = await auth();

  return (
    <header className='flex sticky top-0 items-center justify-between w-full py-6 px-6 sm:px-20 bg-(--background) z-10'>
      <h1 className='text-3xl font-medium font-[family-name:var(--font-header)]'>
        Recent visits
      </h1>
      <span className='flex items-center gap-4'>
        <Form
          action={async () => {
            'use server';
            await seedData();
          }}
        >
          <button
            className='p-2 border-2 border-slate-200 rounded-lg hover:bg-slate-100 active:bg-slate-100 transition'
            type='submit'
          >
            Add
          </button>
        </Form>
        <UserMenu imageUrl={session?.user?.image} />
      </span>
    </header>
  );
}
