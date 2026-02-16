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
import {Coordinates, Shop} from '@/app/lib/types';
import clsx from 'clsx';
import useCloseableDropdown from '@/app/hooks/useCloseableDropdown';
import {
  CloseIcon,
  SearchCheckIcon,
  SearchIcon,
  SearchXIcon,
  StoreIcon,
} from '@/app/ui/icons';
import {ShopSearchState} from '@/app/lib/enums';

interface ShopSearchProps {
  className?: string;
  defaultId?: string | number;
  defaultValue?: string | number;
  onChange?: (shopName: string) => void;
}

export default function ShopSearch(props: ShopSearchProps) {
  const {className, defaultId, defaultValue, onChange} = props;

  const [shops, setShops] = useState<Shop[]>([]);
  const [searchInputState, setSearchInputState] = useState<ShopSearchState>(
    defaultId ? ShopSearchState.SelectedShop : ShopSearchState.Default,
  );
  const [dropdownHeight, setDropdownHeight] = useState<
    CSSProperties | undefined
  >(undefined);
  const [userLocation, setUserLocation] = useState<Coordinates>({});

  const clearShops = useCallback(() => {
    if (shops.length) {
      setSearchInputState(
        idRef.current?.value.length
          ? ShopSearchState.SelectedShop
          : ShopSearchState.Default,
      );
      setShops([]);
    }
  }, [shops.length]);

  const ref = useCloseableDropdown<HTMLDivElement>(clearShops);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Get user's current location to bias search results from
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

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

  const handleSearchInput = useCallback(async () => {
    if (nameRef.current?.value && idRef.current) {
      const shopData = await searchShops(
        nameRef.current.value,
        userLocation.latitude,
        userLocation.longitude,
      );
      setSearchInputState(
        shopData.length ? ShopSearchState.FoundShops : ShopSearchState.NoShops,
      );
      setShops(shopData);
    } else {
      setSearchInputState(ShopSearchState.Default);
      setShops([]);
    }
  }, [userLocation]);

  const handleClearShop = () => {
    if (nameRef.current && idRef.current) {
      setSearchInputState(ShopSearchState.Default);
      setShops([]);
      idRef.current.value = '';
      nameRef.current.value = '';

      if (onChange) onChange('');
    }
  };

  const debouncedSearchShops = useMemo(
    () => debounce(handleSearchInput, 1000),
    [handleSearchInput],
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

      if (onChange) onChange(shop.name);
    }
  };

  const formatSpecificLocation = (shop: Shop) => {
    return shop.address;
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
        placeholder='Coffee shop'
        name='shop-name'
        aria-label='Coffee shop search'
        className={clsx(
          className,
          'w-full pe-[2.35rem]',
          'read-only:bg-slate-100 read-only:text-slate-500 read-only:rounded-md read-only:ps-10 read-only:focus:border-slate-300',
        )}
        defaultValue={defaultValue}
        onChange={handleOnChange}
        readOnly={searchInputState === ShopSearchState.SelectedShop}
        required
      />
      <div
        className='absolute top-[1.8em] w-full bg-white border-2 border-slate-300 rounded-b-xl shadow-lg z-10 overflow-hidden'
        hidden={shops.length === 0}
      >
        <ul
          className='overflow-y-auto'
          ref={dropdownRef}
          style={dropdownHeight}
        >
          {shops.map((shop: Shop) => (
            <li key={shop.id} className='last:[&>button]:rounded-b-xl'>
              <button
                className='w-full flex gap-2 justify-between items-center p-2 text-base hover:bg-slate-100 active:bg-slate-100 transition text-start h-12.75'
                onClick={() => handleSelection(shop)}
              >
                <p className='flex-1/4 leading-tight'>{shop.name}</p>
                <span className='text-sm font-normal text-slate-500 text-end leading-tight tracking-tight'>
                  <p>{formatSpecificLocation(shop)}</p>
                  <p>{formatBroadLocation(shop)}</p>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {searchInputState === ShopSearchState.SelectedShop && (
        <button
          className='absolute transition end-2 top-[0.31rem] text-slate-500 rounded-md bg-slate-300 p-[0.1rem]
          hover:bg-slate-400/50 active:bg-slate-400/50 active:scale-95'
          type='button'
          onClick={handleClearShop}
        >
          <CloseIcon height={23} width={23} />
        </button>
      )}
      <ShopSearchIcon
        className='absolute end-1.5 top-[0.3rem] text-slate-400'
        icon={searchInputState}
      />
      <input
        ref={idRef}
        name='shop-id'
        defaultValue={defaultId}
        required
        hidden
      />
    </div>
  );
}

function ShopSearchIcon(props: {icon: ShopSearchState; className?: string}) {
  const {icon, className} = props;

  switch (icon) {
    case ShopSearchState.SelectedShop:
      return <StoreIcon className={clsx(className, 'start-[0.45rem]')} />;
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
