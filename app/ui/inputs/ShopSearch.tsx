import {useMemo, useRef, useState} from 'react';
import {searchShops} from '@/app/server/shop/actions';
import {debounce} from 'lodash';
import {Shop} from '@/app/lib/types';
import clsx from 'clsx';

interface ShopSearchProps {
  className?: string;
  defaultValue?: string | number;
}

export default function ShopSearch(props: ShopSearchProps) {
  const {className, defaultValue} = props;

  const ref = useRef<HTMLInputElement>(null);
  const [shops, setShops] = useState<Shop[]>([]);

  console.log('re-render');

  const handleSearchInput = async () => {
    if (ref.current) {
      const shopData = await searchShops(ref.current.value);
      console.log('shopData', shopData);
      if (shopData) {
        setShops(shopData);
      } else {
        setShops([]);
      }
    } else {
      console.log('no ref.current');
    }
  };

  const debouncedSearchShops = useMemo(
    () => debounce(handleSearchInput, 1000),
    [],
  );

  const handleSelection = (shopName: string) => {
    if (ref.current) {
      ref.current.value = shopName;
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
    <div className='relative w-full'>
      <input
        ref={ref}
        type='text'
        placeholder='Shop'
        name='shop'
        aria-label='Shop'
        className={clsx(
          className,
          'border-2 border-x-white border-t-white focus:border-slate-300 rounded-t-md w-full transition py-1.5',
        )}
        defaultValue={defaultValue}
        onChange={debouncedSearchShops}
        required
      />
      {shops.length > 0 && (
        <ul className='absolute top-[2.1em] w-full bg-white border-2 border-slate-300 rounded-b-xl shadow-lg'>
          {shops.map((shop: Shop) => (
            <li key={shop.id}>
              <button
                className='w-full flex justify-between items-center p-2 text-base hover:bg-slate-100 transition text-left'
                onClick={() => handleSelection(shop.name)}
              >
                {shop.name}
                <span className='text-sm text-slate-500 text-right leading-tight'>
                  {shop.street && <p>{formatSpecificLocation(shop)}</p>}
                  <p>{formatBroadLocation(shop)}</p>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
