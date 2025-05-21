import React from 'react';
import clsx from 'clsx';
import {ChevronDownIcon} from '@/app/ui/icons';

interface SizeInputProps {
  className?: string;
  defaultSize?: number;
  defaultDrink?: string;
}

export default function DrinkInput(props: SizeInputProps) {
  const {className, defaultSize, defaultDrink} = props;

  return (
    <span className='flex relative w-full text-slate-500'>
      <input
        type='text'
        placeholder='Drink'
        name='drink'
        aria-label='Drink'
        className={clsx(className, 'pr-26')}
        defaultValue={defaultDrink}
        required
      />
      <span className='absolute end-1 top-1'>
        <select
          name='size'
          className='rounded appearance-none peer bg-slate-200 px-2 py-0 w-[5.75rem] outline-none hover:bg-slate-300 transition cursor-pointer'
          defaultValue={defaultSize ?? -1}
        >
          <option value={-1}># oz.</option>
          <option value={2}>2 oz.</option>
          <option value={5}>5 oz.</option>
          <option value={6}>6 oz.</option>
          <option value={8}>8 oz.</option>
          <option value={10}>10 oz.</option>
          <option value={12}>12 oz.</option>
          <option value={16}>16 oz.</option>
          <option value={20}>20 oz.</option>
        </select>
        <ChevronDownIcon
          className='absolute right-[0.1rem] top-[0.15rem] peer-open:rotate-x-180 transition duration-300'
          strokeWidth={2.1}
        />
      </span>
    </span>
  );
}
