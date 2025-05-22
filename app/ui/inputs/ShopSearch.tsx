'use client';

import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {searchShops} from '@/app/server/shop/actions';
import {debounce} from 'lodash';
import {Shop} from '@/app/lib/types';
import clsx from 'clsx';
import useCloseableDropdown from '@/app/hooks/useCloseableDropdown';
import {
  SearchCheckIcon,
  SearchIcon,
  SearchXIcon,
  StoreIcon,
} from '@/app/ui/icons';
import {ShopSearchState} from '@/app/lib/enums';

interface ShopSearchProps {
  autoFocus?: boolean;
  className?: string;
  defaultId?: string | number;
  defaultName?: string | number;
}

export default function ShopSearch(props: ShopSearchProps) {
  const {autoFocus = false, className, defaultId, defaultName} = props;

  const [shops, setShops] = useState<Shop[]>([]);
  const [searchInputState, setSearchInputState] =
    useState<ShopSearchState | null>(
      defaultId ? ShopSearchState.SelectedShop : null,
    );
  const [dropdownHeight, setDropdownHeight] = useState<
    CSSProperties | undefined
  >(undefined);

  const clearShops = useCallback(() => {
    if (shops.length) {
      setSearchInputState(
        idRef.current?.value.length ? ShopSearchState.SelectedShop : null,
      );
      setShops([]);
    }
  }, [shops.length]);

  const ref = useCloseableDropdown<HTMLDivElement>(clearShops);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shops.length > 0) {
      const itemHeight = 51;
      const maxNumItems = 4;

      const shouldBeTruncated = shops.length > maxNumItems;
      if (shouldBeTruncated) {
        // Create a bounded dropdown height where its height is in increments of rows (no half rows)
        const borderWidth = 1.875;
        const boundedDropdownHeight = itemHeight * maxNumItems + borderWidth;

        setDropdownHeight({height: `${boundedDropdownHeight}px`});
      } else {
        setDropdownHeight(undefined);
      }
    }
  }, [shops.length, dropdownRef]);

  const handleSearchInput = async () => {
    if (nameRef.current?.value && idRef.current) {
      idRef.current.value = '';
      const shopData = await searchShops(nameRef.current.value);
      setSearchInputState(
        shopData.length ? ShopSearchState.FoundShops : ShopSearchState.NoShops,
      );
      setShops(shopData);
    } else {
      setSearchInputState(null);
      setShops([]);
    }
  };

  const debouncedSearchShops = useMemo(
    () => debounce(handleSearchInput, 1000),
    [],
  );

  const handleOnChange = () => {
    setSearchInputState(ShopSearchState.Searching);
    debouncedSearchShops();
  };

  const handleSelection = (shop: Shop) => {
    if (nameRef.current && idRef.current) {
      idRef.current.value = shop.id;
      nameRef.current.value = shop.name;
      setSearchInputState(ShopSearchState.SelectedShop);
      setShops([]);
    }
  };

  const formatSpecificLocation = (shop: Shop) => {
    let location = '';
    if (shop.houseNumber) {
      location = location.concat(shop.houseNumber, ' ');
    }
    location = location.concat(shop.street);

    return location;
  };

  const formatBroadLocation = (shop: Shop) => {
    let location = '';
    if (shop.city) {
      location = location.concat(shop.city, ', ');
    }
    location = location.concat(shop.state);

    return location;
  };

  return (
    <div ref={ref} className='relative w-full'>
      <input
        ref={nameRef}
        type='text'
        placeholder='Shop'
        name='shop-name'
        aria-label='Shop'
        className={clsx(className, 'w-full')}
        defaultValue={defaultName}
        onChange={handleOnChange}
        autoFocus={autoFocus}
        required
      />
      <ul
        className='absolute top-[1.8em] w-full bg-white border-2 border-slate-300 rounded-b-xl shadow-lg z-10 overflow-y-auto'
        hidden={shops.length === 0}
        ref={dropdownRef}
        style={dropdownHeight}
      >
        {shops.map((shop: Shop) => (
          <li key={shop.id} className='last:[&>button]:rounded-b-xl'>
            <button
              className='w-full flex justify-between items-center p-2 text-base hover:bg-slate-100 active:bg-slate-100 transition text-left h-[51px]'
              onClick={() => handleSelection(shop)}
            >
              {shop.name}
              <span className='text-sm font-normal text-slate-500 text-right leading-tight'>
                {shop.street && <p>{formatSpecificLocation(shop)}</p>}
                <p>{formatBroadLocation(shop)}</p>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <ShopSearchIcon
        className='absolute right-1 top-1 text-slate-500'
        icon={searchInputState}
      />
      <input ref={idRef} name='shop-id' defaultValue={defaultId} hidden />
    </div>
  );
}

function ShopSearchIcon(props: {
  icon: ShopSearchState | null;
  className?: string;
}) {
  const {icon, className} = props;

  switch (icon) {
    case ShopSearchState.SelectedShop:
      return <StoreIcon className={className} />;
    case ShopSearchState.Searching:
      return (
        <SearchIcon
          className={clsx(className, 'animate-(--animate-shop-search)')}
        />
      );
    case ShopSearchState.FoundShops:
      return <SearchCheckIcon className={className} />;
    case ShopSearchState.NoShops:
      return <SearchXIcon className={className} />;
    default:
      return null;
  }
}
