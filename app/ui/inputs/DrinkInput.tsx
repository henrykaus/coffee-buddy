import React, {ChangeEvent, useState} from 'react';
import clsx from 'clsx';

interface SizeInputProps {
  className?: string;
  defaultSize?: number | string;
  defaultDrink?: number | string;
}

export default function DrinkInput(props: SizeInputProps) {
  const {className, defaultSize, defaultDrink} = props;

  return (
    <span className='flex relative w-full items-baseline text-slate-500'>
      <input
        type='text'
        placeholder='Drink'
        name='drink'
        aria-label='Drink'
        className={clsx(className, 'pr-26')}
        defaultValue={defaultDrink}
        required
      />
      <span className='absolute inline-block right-1 top-1'>
        {/* TODO: Selects do not have good browser support, rework into custom component*/}
        <select
          name='size'
          className='rounded bg-slate-200 px-2 py-0 w-[5.6rem]'
          defaultValue={defaultSize ?? ''}
        >
          <option value='' disabled>
            # oz.
          </option>
          <option value='5'>5 oz.</option>
          <option value='6'>6 oz.</option>
          <option value='8'>8 oz.</option>
          <option value='10'>10 oz.</option>
          <option value='12'>12 oz.</option>
          <option value='16'>16 oz.</option>
          <option value='20'>20 oz.</option>
        </select>
      </span>
    </span>
  );
}
