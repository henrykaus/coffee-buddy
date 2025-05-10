import CoffeeCard from '@/app/ui/coffee-list/CoffeeCard';
import VisitSearch from '@/app/ui/common/VisitSearch';
import React from 'react';
import {Visit} from '@/app/lib/types';
import {listVisits, searchVisits} from '@/app/server/visits/actions';
import {HomeActionType} from '@/app/lib/enums';
import AddVisitPopup from '@/app/ui/coffee-list/AddVisitPopup';
import EditVisitPopup from '@/app/ui/coffee-list/EditVisitPopup';
import UserMenu from '@/app/ui/user-menu/UserMenu';
import MoreOptionsPopup from '@/app/ui/user-menu/MoreOptionsPopup';
import DeleteAccountPopup from '@/app/ui/user-menu/DeleteAccountPopup';
import {auth} from '@/auth';
import seedData from '@/app/server/seedData';
import Form from 'next/form';
import AddVisitButton from '@/app/ui/coffee-list/AddVisitButton';

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

  const session = await auth();

  const visits: Visit[] =
    query === '' ? await listVisits() : await searchVisits(query);

  return (
    <>
      <header className='flex sticky top-0 items-center justify-between w-full py-6 px-8 sm:px-20 bg-(--background) z-10'>
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
              className='p-2 border-2 border-slate-200 rounded-lg hover:bg-slate-100 transition'
              type='submit'
            >
              Add
            </button>
          </Form>
          <UserMenu imageUrl={session?.user?.image} />
        </span>
      </header>
      <section className='flex gap-y-3 flex-col mb-24 pb-10 px-8 sm:px-20'>
        {(visits.length || query !== '') && <VisitSearch />}
        {visits.length ? (
          visits.map((visit) => <CoffeeCard key={visit.id} visit={visit} />)
        ) : (
          <div className='absolute start-0 mx-auto w-full text-center top-[calc(50%-28px)]'>
            <p className='font-semibold text-xl text-slate-500'>No visits</p>
            {query === '' && (
              <p className='text-lg text-slate-400'>
                Click the + button to add
              </p>
            )}
          </div>
        )}
      </section>
      <AddVisitButton />
      {action === HomeActionType.Add && <AddVisitPopup />}
      {action === HomeActionType.Edit && <EditVisitPopup id={visitId} />}
      {action === HomeActionType.MoreOptions && <MoreOptionsPopup />}
      {action === HomeActionType.DeleteAccount && <DeleteAccountPopup />}
    </>
  );
}
