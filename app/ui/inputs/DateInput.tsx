import {CalendarIcon} from '@/app/ui/icons';
import clsx from 'clsx';

interface DateInput {
  defaultValue?: string;
  iconOnly?: boolean;
}

export default function DateInput(props: DateInput) {
  const {defaultValue, iconOnly = true} = props;

  const getTodaysDate = () => {
    const todayParts = new Date().toLocaleDateString().split('/');
    return `${todayParts[2]}-${todayParts[0].padStart(2, '0')}-${todayParts[1].padStart(2, '0')}`;
  };

  return (
    <span
      className='relative flex items-center justify-center rounded-full cursor-pointer
    bg-slate-200 hover:bg-slate-300 active:bg-slate-300 active:scale-90 transition pr-3 h-10 min-w-10'
    >
      <input
        type='date'
        name='date'
        aria-label='Visit date'
        className={clsx(
          'outline-none text-slate-600 pl-3 h-full transition text-sm font-semibold w-[10em] cursor-pointer calendar',
          {'icon-only': iconOnly},
        )}
        defaultValue={defaultValue ?? getTodaysDate()}
        required
      />
      <span className='absolute end-2 top-[0.45rem] pointer-events-none text-slate-600'>
        <CalendarIcon />
      </span>
    </span>
  );
}
