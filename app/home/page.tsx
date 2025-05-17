import React from 'react';
import {Visit} from '@/app/lib/types';
import {listVisits, searchVisits} from '@/app/server/visits/actions';
import {HomeActionType, Route} from '@/app/lib/enums';
import MoreOptionsPopup from '@/app/ui/user-menu/MoreOptionsPopup';
import DeleteAccountPopup from '@/app/ui/user-menu/DeleteAccountPopup';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import CoffeeList from '@/app/ui/home-page/CoffeeList';
import HomeHeader from '@/app/ui/home-page/HomeHeader';

interface PageProps {
  searchParams?: Promise<{
    query?: string;
    action?: string;
    visitId?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const action = searchParams?.action || '';

  const session = await auth();

  if (!session) {
    redirect(`/${Route.Login}`);
  }

  const visits: Visit[] =
    query === '' ? await listVisits() : await searchVisits(query);

  console.log('IMPORTANT: re-rendered home');

  return (
    <>
      <HomeHeader />
      <CoffeeList
        hasAnyVisits={!!visits.length || query !== ''}
        visits={visits}
      />
      {action === HomeActionType.MoreOptions && <MoreOptionsPopup />}
      {action === HomeActionType.DeleteAccount && <DeleteAccountPopup />}
    </>
  );
}
