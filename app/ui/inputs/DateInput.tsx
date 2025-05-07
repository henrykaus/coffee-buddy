import {getDateForClient} from '@/app/server/common';

interface DateInput {
  defaultValue?: string;
}

export default function DateInput(props: DateInput) {
  const {defaultValue} = props;

  const getTodaysDate = () => {
    const today = new Date();
    return getDateForClient(today);
  };

  return (
    <span className='relative'>
      <input
        type='date'
        name='date'
        aria-label='Visit date'
        className='rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 transition flex items-center justify-center text-lg font-semibold h-10 px-3'
        defaultValue={defaultValue ?? getTodaysDate()}
        required
      />
    </span>
  );
}
