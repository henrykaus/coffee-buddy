import React, {ChangeEvent, useState} from 'react';
import clsx from 'clsx';
import {ChevronDownIcon} from '@/app/ui/icons';

interface SizeInputProps {
  ariaLabel?: string;
  className?: string;
  defaultSize?: number;
  defaultDrink?: string;
  isForDrink?: boolean;
  onChange?: (drink: string) => void;
  placeholder?: string;
}

export default function DrinkInput(props: SizeInputProps) {
  const {
    ariaLabel = '',
    className,
    defaultSize,
    defaultDrink,
    onChange,
    placeholder = '',
  } = props;

  const [drink, setDrink] = useState(defaultDrink ?? '');

  const handleDrinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDrinkValue = event.target.value.trimStart();

    setDrink(newDrinkValue);
    if (onChange) onChange(newDrinkValue);
  };

  const handleDrinkBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const newDrinkValue = event.target.value.trim();

    setDrink(newDrinkValue);
    if (onChange) onChange(newDrinkValue);
  };

  return (
    <span className='flex relative w-full text-slate-500'>
      <input
        type='text'
        placeholder={placeholder}
        name='drink'
        aria-label={ariaLabel}
        className={clsx(className, 'pr-26')}
        value={drink}
        onChange={handleDrinkChange}
        onBlur={handleDrinkBlur}
        required
      />
      <span className='absolute end-1 top-1'>
        <select
          name='size'
          className='rounded appearance-none peer bg-slate-200 px-2 py-0 w-23 outline-none hover:bg-slate-300 focus:bg-slate-300 transition cursor-pointer'
          defaultValue={defaultSize ?? -1}
        >
          <option value={-1}># oz.</option>
          <option value={2}>2 oz.</option>
          <option value={4}>4 oz.</option>
          <option value={6}>6 oz.</option>
          <option value={8}>8 oz.</option>
          <option value={10}>10 oz.</option>
          <option value={12}>12 oz.</option>
          <option value={16}>16 oz.</option>
          <option value={20}>20 oz.</option>
        </select>
        <ChevronDownIcon
          className='absolute right-[0.1rem] top-[0.15rem] peer-open:rotate-x-180 transition duration-300 pointer-events-none'
          strokeWidth={2.1}
        />
      </span>
    </span>
  );
}
