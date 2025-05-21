import Form from 'next/form';
import seedData from '@/app/server/seedData';
import UserMenu from '@/app/ui/user-menu/UserMenu';
import React from 'react';
import {User} from 'next-auth';

interface HomeHeaderProps {
  user: User | undefined;
}

export default async function HomeHeader(props: HomeHeaderProps) {
  const {user} = props;

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
          hidden
        >
          <button
            className='p-2 border-2 border-slate-200 rounded-lg hover:bg-slate-100 active:bg-slate-100 transition'
            type='submit'
          >
            Add
          </button>
        </Form>
        <UserMenu imageUrl={user?.image} />
      </span>
    </header>
  );
}
