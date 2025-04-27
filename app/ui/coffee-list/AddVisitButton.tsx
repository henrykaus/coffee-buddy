'use client';

import {PlusIcon} from '@/app/ui/icons';
import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {HomeActionType} from '@/app/lib/enums';
import Form from 'next/form';

export default function AddVisitButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const handleAddClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('action', HomeActionType.Add);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Form action={handleAddClick}>
      <button
        type='submit'
        className='flex items-center justify-center fixed right-5 bottom-5
          text-4xl font-medium text-yellow-700 h-16 w-16 shadow-md
          rounded-full bg-[#f7e2ba] hover:bg-[#f7daa3] transition active:transform-[scale(0.93)]'
      >
        <PlusIcon height={30} width={30} />
      </button>
    </Form>
  );
}
