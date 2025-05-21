'use client';

import clsx from 'clsx';
import {ChangeEvent, useState} from 'react';
import {OrderType} from '@/app/lib/enums';
import {MugIcon, ToGoCupIcon} from '@/app/ui/icons';

interface OrderTypeToggleProps {
  defaultValue?: string;
}

export default function OrderTypeToggle(props: OrderTypeToggleProps) {
  const {defaultValue} = props;

  const [selectedOption, setSelectedOption] = useState<OrderType>(
    defaultValue === OrderType.ToGo ? OrderType.ToGo : OrderType.ForHere,
  );

  const commonButtonClasses =
    'text-slate-400 p-1 w-10 flex justify-center rounded-md transition cursor-pointer not-peer-checked:hover:text-slate-500 not-peer-checked:active:[&_svg]:scale-90 peer-checked:active:scale-90';

  const handleOptionSelected = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.currentTarget.value as OrderType);
  };

  return (
    <fieldset className='flex items-center bg-slate-100 border-0 border-slate-300 rounded-lg gap-1 text-slate-600 p-1'>
      <span>
        <input
          type='radio'
          id='for-here-option'
          name='order-type'
          value={OrderType.ForHere}
          onChange={handleOptionSelected}
          defaultChecked={defaultValue !== OrderType.ToGo}
          className='peer'
          hidden
        />
        <label
          htmlFor='for-here-option'
          aria-label='For here'
          className={clsx(commonButtonClasses, {
            'bg-slate-300/90 shadow-md text-slate-700':
              selectedOption === OrderType.ForHere,
          })}
          title='For here'
        >
          <MugIcon className='transition' />
        </label>
      </span>
      <span>
        <input
          type='radio'
          id='to-go-option'
          name='order-type'
          value={OrderType.ToGo}
          onChange={handleOptionSelected}
          defaultChecked={defaultValue === OrderType.ToGo}
          className='peer'
          hidden
        />
        <label
          htmlFor='to-go-option'
          aria-label='To go'
          title='To go'
          className={clsx(commonButtonClasses, {
            'bg-slate-300/90 shadow-md text-slate-700':
              selectedOption === OrderType.ToGo,
          })}
        >
          <ToGoCupIcon className='transition' />
        </label>
      </span>
    </fieldset>
  );
}
