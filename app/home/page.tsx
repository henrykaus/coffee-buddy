import React, {Suspense} from 'react';
import {Route} from '@/app/lib/enums';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import HomeHeader from '@/app/ui/home-page/HomeHeader';
import CoffeeListWrapper from '@/app/ui/coffee-list/CoffeeListWrapper';
import {DashboardSkeleton, FullDashboardSkeleton} from '@/app/ui/skeletons';

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

  return (
    <>
      <HomeHeader user={session?.user} />
      <Suspense fallback={<DashboardSkeleton />}>
        <CoffeeListWrapper query={query} />
      </Suspense>
    </>
  );
}
