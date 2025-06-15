'use client';

import UserMenu from '@/app/ui/user-menu/UserMenu';
import React from 'react';
import {User} from 'next-auth';
import {usePathname} from 'next/navigation';
import {PageTitle, Route} from '@/app/lib/enums';
import Link from 'next/link';
import {HomeIcon} from '@/app/ui/icons';

interface HomeHeaderProps {
  user: User | undefined;
}

export default function HomeHeader(props: HomeHeaderProps) {
  const {user} = props;

  const pathname = usePathname();

  return (
    <header className='flex sticky top-0 items-center justify-between w-full py-6 px-6 sm:px-20 bg-(--background) z-10'>
      <h1 className='text-3xl font-medium font-[family-name:var(--font-header)]'>
        {convertRouteToTitle(pathname as Route)}
      </h1>
      <span className='flex items-start gap-2'>
        {pathname !== Route.Home && (
          <Link
            href={Route.Home}
            className='rounded-full flex items-center justify-center m-1 h-[44px] w-[44px] text-slate-500 transition hover:bg-slate-200/80 active:bg-slate-200/80 active:scale-90'
          >
            <HomeIcon height={30} width={30} />
          </Link>
        )}
        <UserMenu imageUrl={user?.image} />
      </span>
    </header>
  );
}

const convertRouteToTitle = (route: Route) => {
  switch (route) {
    case Route.WhatsNew:
      return PageTitle.WhatsNew;
    case Route.Home:
      return PageTitle.Home;
    default:
      return PageTitle.Home;
  }
};
