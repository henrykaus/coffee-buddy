import {SearchIcon} from '@/app/ui/icons';
import {useMemo, useRef} from 'react';
import {debounce} from 'lodash';
import {SEARCH_PLACEHOLDER_KEYWORDS} from '@/app/lib/constants';

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

  const selectRandomPlaceholder = () => {
    const randomNumber = Math.floor(
      Math.random() * SEARCH_PLACEHOLDER_KEYWORDS.length,
    );

    return SEARCH_PLACEHOLDER_KEYWORDS[randomNumber];
  };

  return (
    <span className='relative w-full'>
      <input
        ref={ref}
        type='text'
        placeholder={`${selectRandomPlaceholder()}...`}
        className='border-[2px] rounded-full py-3 pl-4 pr-11 placeholder:text-slate-400/80 text-xl h-14 flex-grow border-slate-300 shadow-md w-full'
        onChange={debouncedSearchShops}
        suppressHydrationWarning
      />
      <SearchIcon className='absolute end-4 top-4 text-slate-400' />
    </span>
  );
}
