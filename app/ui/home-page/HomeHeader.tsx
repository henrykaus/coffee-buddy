'use client';

import UserMenu from '@/app/ui/user-menu/UserMenu';
import React, {useEffect, useState} from 'react';
import {User} from 'next-auth';
import {usePathname} from 'next/navigation';
import {PageTitle, Route} from '@/app/lib/enums';
import clsx from 'clsx';
// import seedData from '@/app/server/seedData';

interface HomeHeaderProps {
  user: User | undefined;
}

export default function HomeHeader(props: HomeHeaderProps) {
  const {user} = props;

  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Indicator that the page has been scrolled
  useEffect(() => {
    const handleScrolled = () => {
      if (!isScrolled && window.scrollY >= 10) {
        setIsScrolled(true);
      } else if (window.scrollY < 10) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScrolled);
    return () => {
      window.removeEventListener('scroll', handleScrolled);
    };
  }, [isScrolled]);

  return (
    <header
      className={clsx(
        'flex sticky transition top-0 items-center justify-between w-full h-(--header-height) py-4 px-6 bg-(--background) z-10',
        {
          'shadow-sm': isScrolled,
        },
      )}
    >
      <h1 className='text-3xl font-medium font-(family-name:--font-header)'>
        {convertRouteToTitle(pathname as Route)}
      </h1>
      <span className='flex items-center gap-2'>
        {/*<button*/}
        {/*  className='rounded-lg p-2 bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200/80 active:scale-90 transition font-medium text-slate-700'*/}
        {/*  onClick={async () => await seedData()}*/}
        {/*>*/}
        {/*  Seed*/}
        {/*</button>*/}
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
