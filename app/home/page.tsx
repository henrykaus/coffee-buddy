import React, {Suspense} from 'react';
import CoffeeListWrapper from '@/app/ui/coffee-list/CoffeeListWrapper';
import {DashboardSkeleton} from '@/app/ui/skeletons';

interface PageProps {
  searchParams?: Promise<{
    query?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <CoffeeListWrapper query={query} />
    </Suspense>
  );
}
