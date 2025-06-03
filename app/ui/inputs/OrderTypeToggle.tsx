import {OrderType} from '@/app/lib/enums';
import {MugIcon, ToGoCupIcon} from '@/app/ui/icons';

interface OrderTypeToggleProps {
  defaultValue?: OrderType;
}

export default function OrderTypeToggle(props: OrderTypeToggleProps) {
  const {defaultValue} = props;

  const commonButtonClasses =
    'w-10.5 flex rounded-md transition cursor-pointer text-slate-400 hover:text-slate-500 active:text-slate-500 ' +
    'has-checked:bg-slate-300/90 has-checked:shadow-md has-checked:text-slate-700 has-checked:hover:text-slate-700 has-checked:active:text-slate-700 has-checked:active:scale-90';

  return (
    <fieldset className='flex bg-slate-100 rounded-lg p-1 gap-1'>
      <span className={commonButtonClasses}>
        <input
          type='radio'
          id='for-here-option'
          name='order-type'
          value={OrderType.ForHere}
          defaultChecked={defaultValue !== OrderType.ToGo}
          hidden
        />
        <label
          htmlFor='for-here-option'
          aria-label='For here'
          className='cursor-pointer w-full h-full p-1'
          title='For here'
        >
          <MugIcon className='mx-auto' />
        </label>
      </span>
      <span className={commonButtonClasses}>
        <input
          type='radio'
          id='to-go-option'
          name='order-type'
          value={OrderType.ToGo}
          defaultChecked={defaultValue === OrderType.ToGo}
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
    </fieldset>
  );
}
