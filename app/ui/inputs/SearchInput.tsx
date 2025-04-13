import {SearchIcon} from '@/app/ui/icons';
import {useMemo, useRef} from 'react';
import {debounce} from 'lodash';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export default function SearchInput(props: SearchInputProps) {
  const {onSearch} = props;

  const ref = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (ref.current) {
      onSearch(ref.current.value);
    } else {
      console.error('no ref.current');
    }
  };

  const debouncedSearchShops = useMemo(() => debounce(handleSearch, 300), []);

  return (
    <span className='relative w-full'>
      <input
        ref={ref}
        type='text'
        placeholder='Quick Search'
        className='border-[2px] rounded-md p-3 text-2xl h-14 flex-grow border-slate-300 shadow-md w-full'
        onChange={debouncedSearchShops}
      />
      <SearchIcon className='absolute end-4 top-4 text-slate-400' />
    </span>
  );
}
