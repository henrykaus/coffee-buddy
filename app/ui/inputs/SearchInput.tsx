import {SearchIcon} from '@/app/ui/icons';
import {useMemo, useRef} from 'react';
import {debounce} from 'lodash';
import {SEARCH_PLACEHOLDER_KEYWORDS} from '@/app/lib/constants';

interface SearchInputProps {
  onSearch: (query: string) => void;
  query: string;
}

export default function SearchInput(props: SearchInputProps) {
  const {onSearch, query} = props;

  const ref = useRef<HTMLInputElement>(null);

  const placeholder = useMemo(() => {
    const randomNumber = Math.floor(
      Math.random() * SEARCH_PLACEHOLDER_KEYWORDS.length,
    );

    return SEARCH_PLACEHOLDER_KEYWORDS[randomNumber];
  }, []);

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
        placeholder={`${placeholder}...`}
        className='peer border-2 border-slate-300 rounded-lg outline-hidden focus:border-b-slate-400 text-slate-600 transition py-2 pl-4 pr-11 placeholder:text-slate-400/80
          text-xl grow shadow-xs w-full bg-(--background)'
        onChange={debouncedSearchShops}
        defaultValue={query}
        suppressHydrationWarning
      />
      <SearchIcon className='absolute end-4 top-3 text-slate-400 peer-focus:text-slate-500 peer-focus:scale-110 pointer-events-none transition' />
    </span>
  );
}
