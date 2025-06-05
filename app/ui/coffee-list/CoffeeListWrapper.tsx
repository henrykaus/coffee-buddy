import CoffeeList from '@/app/ui/home-page/CoffeeList';
import React from 'react';
import {Visit} from '@/app/lib/types';
import {listVisits, searchVisits} from '@/app/server/visits/actions';

interface TestComponentProps {
  query: string;
}

export default async function CoffeeListWrapper(props: TestComponentProps) {
  const {query} = props;

  const visits: Visit[] =
    query === '' ? await listVisits() : await searchVisits(query);

  return <CoffeeList visits={visits} query={query} />;
}
