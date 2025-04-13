'use client';

import clsx from 'clsx';
import {useState} from 'react';
import {OrderType} from '@/app/lib/enums';
import {MugIcon, ToGoCupIcon} from '@/app/ui/icons';

interface OrderTypeToggleProps {
  defaultValue?: string;
}

export default function OrderTypeToggle(props: OrderTypeToggleProps) {
  const {defaultValue} = props;
  console.log(defaultValue);

  const [selectedOption, setSelectedOption] = useState<OrderType>(
    defaultValue === OrderType.ToGo ? OrderType.ToGo : OrderType.ForHere,
  );

  const commonClasses =
    'p-2 border-2 border-slate-300 cursor-pointer transition flex';
  const leftButtonClasses = 'rounded-l-md border-r-0';
  const rightButtonClasses = 'rounded-r-md';

  const handleOptionSelected = (event) => {
    setSelectedOption(event.currentTarget.value);
  };

  return (
    <fieldset className='flex items-center text-slate-600'>
      <span>
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
          className={clsx(commonClasses, leftButtonClasses, {
            'bg-slate-200': selectedOption === OrderType.ForHere,
          })}
        >
          <MugIcon />
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
          hidden
        />
        <label
          htmlFor='to-go-option'
          aria-label='To go'
          className={clsx(commonClasses, rightButtonClasses, {
            'bg-slate-200': selectedOption === OrderType.ToGo,
          })}
        >
          <ToGoCupIcon />
        </label>
      </span>
    </fieldset>
  );
}
