'use client';

import {PlusIcon} from '@/app/ui/icons';
import SearchInput from '@/app/ui/inputs/SearchInput';
import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {HomeActionType} from '@/app/lib/enums';

export default function Toolbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleAddClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('action', HomeActionType.Add);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='flex items-center justify-center w-full gap-2 fixed left-0 bottom-0 p-8 sm:px-20'>
      <SearchInput onSearch={handleSearch} />
      <button
        onClick={handleAddClick}
        className='flex items-center justify-center text-4xl font-medium text-slate-600 h-14 w-14 border-[2px] shadow-md rounded-md border-slate-300 bg-white'
      >
        <PlusIcon />
      </button>
    </div>
  );
}
