import React from 'react';
import {Visit} from '@/app/lib/types';
import {listVisits, searchVisits} from '@/app/server/visits/actions';
import {Route} from '@/app/lib/enums';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import CoffeeList from '@/app/ui/home-page/CoffeeList';
import HomeHeader from '@/app/ui/home-page/HomeHeader';

interface PageProps {
  searchParams?: Promise<{
    query?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const session = await auth();

  if (!session) {
    redirect(`/${Route.Login}`);
  }

  const visits: Visit[] =
    query === '' ? await listVisits() : await searchVisits(query);

  console.log('IMPORTANT: re-rendered home');

  return (
    <>
      <HomeHeader user={session?.user} />
      <CoffeeList
        hasAnyVisits={!!visits.length || query !== ''}
        visits={visits}
      />
    </>
  );
}
