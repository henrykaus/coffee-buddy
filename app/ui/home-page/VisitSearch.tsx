'use client';

import SearchInput from '@/app/ui/inputs/SearchInput';
import {useSearchParams, usePathname, useRouter} from 'next/navigation';

interface VisitSearchProps {
  query: string;
}

export default function VisitSearch(props: VisitSearchProps) {
  const {query} = props;

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

  return <SearchInput onSearch={handleSearch} query={query} />;
}
