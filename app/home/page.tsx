import {UserIcon} from '@/app/ui/icons';
import CoffeeCard from '@/app/ui/coffee-list/CoffeeCard';
import Toolbar from '@/app/ui/common/toolbar';
import React from 'react';
import {Visit} from '@/app/lib/types';
import {listUsers} from '@/app/server/users/actions';
import {listVisits, searchVisits} from '@/app/server/visits/actions';
import {HomeActionType} from '@/app/lib/enums';
import AddVisitPopup from '@/app/ui/coffee-list/AddVisitPopup';
import EditVisitPopup from '@/app/ui/coffee-list/EditVisitPopup';
import UserMenu from '@/app/ui/user-menu/UserMenu';
import MoreOptionsPopup from '@/app/ui/user-menu/MoreOptionsPopup';
import DeleteAccountPopup from '@/app/ui/user-menu/DeleteAccountPopup';

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
  const visitId = searchParams?.visitId || '';

  const visits: Visit[] = [];

  const users = await listUsers();
  if (users.length === 0 || !users[0].id) {
    console.error('Not enough users, found 0:', users);
  } else {
    const visitResults =
      query === ''
        ? await listVisits(users[0].id)
        : await searchVisits(users[0].id, query);

    visits.push(...visitResults);
  }

  return (
    <>
      <header className='flex sticky top-0 items-center justify-between w-full py-6 px-8 sm:px-20 bg-white'>
        <h1 className='text-2xl font-medium'>Recent visits</h1>
        <UserMenu />
      </header>
      <div className='flex gap-y-3 flex-col mb-24 pb-6 px-8 sm:px-20'>
        {visits.map((visit) => (
          <CoffeeCard key={visit.id} visit={visit} />
        ))}
      </div>
      <Toolbar />
      {action === HomeActionType.Add && <AddVisitPopup />}
      {action === HomeActionType.Edit && <EditVisitPopup id={visitId} />}
      {action === HomeActionType.MoreOptions && <MoreOptionsPopup />}
      {action === HomeActionType.DeleteAccount && <DeleteAccountPopup />}
    </>
  );
}
