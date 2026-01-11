import {Visit} from '@/app/lib/types';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {splitVisitsIntoColumns} from '@/app/server/common';
import CoffeeCard from '@/app/ui/coffee-list/CoffeeCard';

interface CoffeeGridProps {
  items: Visit[];
  onEditClick: (visit: Visit | null) => void;
}

export default function CoffeeGrid(props: CoffeeGridProps) {
  const {items, onEditClick} = props;

  const [numColumns, setNumColumns] = useState<number>(1);

  const updateNumColumns = useCallback(() => {
    const startLimit = 1240;

    // Everything below 1240px is 1 column; everything after adds a column every 640 px
    const remainingScreenWidth = window.innerWidth - startLimit;
    const numColumnsForWidth =
      remainingScreenWidth <= 0
        ? 1
        : Math.floor(remainingScreenWidth / 600) + 2;

    // If items count is low, restrict num columns to the number of items
    setNumColumns(Math.min(items.length, numColumnsForWidth));
  }, [setNumColumns, items.length]);

  useEffect(() => {
    updateNumColumns();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateNumColumns);
    return () => {
      window.removeEventListener('resize', updateNumColumns);
    };
  }, [updateNumColumns]);

  useEffect(() => {
    // Update columns if a deletion leads to fewer drawings than columns
    updateNumColumns();
  }, [items.length]);

  const columns = useMemo(
    () => splitVisitsIntoColumns(items, numColumns),
    [items, numColumns],
  );

  return (
    <div className={`flex flex-col-${numColumns} gap-x-3`} role='grid'>
      {columns.map((col, index) => (
        <div key={index} className={`flex flex-col gap-y-3 flex-1`}>
          {col.map((visit) => (
            <CoffeeCard
              key={visit.id}
              onEditClick={() => onEditClick(visit)}
              visit={visit}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
