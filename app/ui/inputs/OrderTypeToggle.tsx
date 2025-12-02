import {OrderType} from '@/app/lib/enums';
import {CoffeeBeanIcon, MugIcon, ToGoCupIcon} from '@/app/ui/icons';
import {getOrderType} from '@/app/server/common';
import {ChangeEvent, useState} from 'react';

interface OrderTypeToggleProps {
  initialValue?: OrderType;
  onChange: (orderType: OrderType) => void;
}

export default function OrderTypeToggle(props: OrderTypeToggleProps) {
  const {initialValue, onChange} = props;

  const [orderType, setOrderType] = useState<OrderType>(
    initialValue ?? OrderType.ToGo,
  );

  const commonButtonClasses =
    'w-10.5 flex rounded-md transition cursor-pointer text-slate-400 hover:text-slate-500 active:text-slate-500 ' +
    'has-checked:bg-slate-300/90 has-checked:shadow-md has-checked:text-slate-700 has-checked:hover:text-slate-700 has-checked:active:text-slate-700 has-checked:active:scale-90';

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newOrderType = getOrderType(event.target.value);
    setOrderType(newOrderType);

    if (onChange && newOrderType !== orderType) {
      onChange(newOrderType);
    }
  };

  return (
    <fieldset className='flex bg-slate-100 rounded-lg p-1 gap-1'>
      <span className={commonButtonClasses}>
        <input
          type='radio'
          id='to-go-option'
          name='order-type'
          onChange={handleChange}
          value={OrderType.ToGo}
          defaultChecked={orderType === OrderType.ToGo}
          hidden
        />
        <label
          htmlFor='to-go-option'
          aria-label='To go'
          title='To go'
          className='cursor-pointer w-full h-full p-1'
        >
          <ToGoCupIcon className='mx-auto' />
        </label>
      </span>
      <span className={commonButtonClasses}>
        <input
          type='radio'
          id='for-here-option'
          name='order-type'
          onChange={handleChange}
          value={OrderType.ForHere}
          defaultChecked={orderType === OrderType.ForHere}
          hidden
        />
        <label
          htmlFor='for-here-option'
          aria-label='For here'
          title='For here'
          className='cursor-pointer w-full h-full p-1'
        >
          <MugIcon className='mx-auto' />
        </label>
      </span>
      <span className={commonButtonClasses}>
        <input
          type='radio'
          id='beans-option'
          name='order-type'
          onChange={handleChange}
          value={OrderType.CoffeeBeans}
          defaultChecked={orderType === OrderType.CoffeeBeans}
          hidden
        />
        <label
          htmlFor='beans-option'
          aria-label='Coffee beans'
          title='Coffee beans'
          className='cursor-pointer w-full h-full p-1'
        >
          <CoffeeBeanIcon className='mx-auto' />
        </label>
      </span>
    </fieldset>
  );
}
