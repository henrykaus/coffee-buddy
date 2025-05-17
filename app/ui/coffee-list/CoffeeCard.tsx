'use client';

import {useState} from 'react';
import {Visit} from '@/app/lib/types';
import {OrderType} from '@/app/lib/enums';
import {EditIcon, MugIcon, ToGoCupIcon} from '@/app/ui/icons';
import clsx from 'clsx';
import {getDateForUser, getPriceForDisplay} from '@/app/server/common';

interface CoffeeCardProps {
  onEditClick: () => void;
  visit: Visit;
}

export default function CoffeeCard(props: CoffeeCardProps) {
  const {onEditClick, visit} = props;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const formattedDrink =
    visit.size !== null ? `${visit.size}oz ${visit.drink}` : visit.drink;

  return (
    <article
      className={clsx(
        'border-2 border-slate-200 pb-2 pt-3 px-3 rounded-md text-lg text-slate-700 text-left transition cursor-pointer',
        {'shadow-lg': isExpanded},
      )}
      onClick={handleClick}
      aria-expanded={isExpanded}
      role='row'
    >
      <header className='flex justify-between gap-4'>
        <span className='flex gap-2'>
          {visit.orderType === OrderType.ForHere ? (
            <MugIcon className='text-slate-600 shrink-0' />
          ) : (
            <ToGoCupIcon className='text-slate-600 shrink-0' />
          )}
          <p className='font-semibold text-lg/5 mt-[0.2rem] mb-[0.2rem]'>
            {visit.shopName}
          </p>
        </span>
        <span className='flex gap-2'>
          {visit.rating !== null && (
            <p>
              <span className='font-bold text-2xl/8'>{visit.rating}</span>
              /5
            </p>
          )}
          {isExpanded && (
            <button
              onClick={onEditClick}
              aria-label='Edit visit'
              className='flex justify-center items-center h-8 w-8 hover:bg-slate-100 active:bg-slate-100 transition border-slate-200 rounded-md text-slate-600'
            >
              <EditIcon strokeWidth={2} height={22} width={22} />
            </button>
          )}
        </span>
      </header>
      <p>{formattedDrink}</p>
      {/* TODO: Make this accessible, the description is still visible to screen-readers */}
      <div
        className={clsx('grid transition-all', {
          'grid-rows-[1fr]': isExpanded,
          'grid-rows-[0fr]': !isExpanded,
        })}
      >
        <div className='overflow-hidden'>
          {/* This is required for shrinking cards to work */}
          <p className='bg-slate-100 rounded-md p-2 text-sm my-1.5'>
            {visit.notes ? (
              visit.notes
            ) : (
              <span className='text-slate-400'>No notes</span>
            )}
          </p>
        </div>
      </div>
      <div className='flex justify-between items-baseline'>
        {visit.date && (
          <p className='text-sm'>Visited {getDateForUser(visit.date)}</p>
        )}
        <p className='justify-self-end'>{getPriceForDisplay(visit.price)}</p>
      </div>
    </article>
  );
}
