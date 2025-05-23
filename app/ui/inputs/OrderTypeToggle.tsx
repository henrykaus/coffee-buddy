'use client';

import clsx from 'clsx';
import {ChangeEvent, useState} from 'react';
import {OrderType} from '@/app/lib/enums';
import {MugIcon, ToGoCupIcon} from '@/app/ui/icons';

interface OrderTypeToggleProps {
  defaultValue?: OrderType;
}

export default function OrderTypeToggle(props: OrderTypeToggleProps) {
  const {defaultValue} = props;

  const [selectedOption, setSelectedOption] = useState<OrderType>(
    defaultValue === OrderType.ToGo ? OrderType.ToGo : OrderType.ForHere,
  );

  const commonButtonClasses =
    'w-10 flex rounded-md transition cursor-pointer text-slate-400 hover:text-slate-500 active:[&_svg]:scale-90';

  const handleOptionSelected = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.currentTarget.value as OrderType);
  };

  return (
    <fieldset className='flex bg-slate-100 rounded-lg p-1 gap-1'>
      <span
        className={clsx(commonButtonClasses, {
          'bg-slate-300/90 shadow-md text-slate-700 hover:text-slate-700 active:scale-90 active:[&_svg]:scale-100':
            selectedOption === OrderType.ForHere,
        })}
      >
        <input
          type='radio'
          id='for-here-option'
          name='order-type'
          value={OrderType.ForHere}
          onChange={handleOptionSelected}
          defaultChecked={defaultValue !== OrderType.ToGo}
          hidden
        />
        <label
          htmlFor='for-here-option'
          aria-label='For here'
          className='cursor-pointer w-full h-full p-1'
          title='For here'
        >
          <MugIcon className='transition mx-auto' />
        </label>
      </span>
      <span
        className={clsx(commonButtonClasses, {
          'bg-slate-300/90 shadow-md text-slate-700 hover:text-slate-700 active:scale-90 active:[&_svg]:scale-100':
            selectedOption === OrderType.ToGo,
        })}
      >
        <input
          type='radio'
          id='to-go-option'
          name='order-type'
          value={OrderType.ToGo}
          onChange={handleOptionSelected}
          defaultChecked={defaultValue === OrderType.ToGo}
          hidden
        />
        <label
          htmlFor='to-go-option'
          aria-label='To go'
          title='To go'
          className='cursor-pointer w-full h-full p-1'
        >
          <ToGoCupIcon className='transition mx-auto' />
        </label>
      </span>
    </fieldset>
  );
}
