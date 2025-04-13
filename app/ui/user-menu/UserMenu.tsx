'use client';

import React, {useState} from 'react';
import {EllipsisIcon, LogOutIcon, UserIcon} from '@/app/ui/icons';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {HomeActionType} from '@/app/lib/enums';

export default function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const handleMoreOptionsClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('action', HomeActionType.MoreOptions);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='relative text-slate-700 font-medium'>
      <button
        className='rounded-full p-1 transition hover:bg-slate-200/80'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <UserIcon height={30} width={30} />
      </button>
      {isMenuOpen && (
        <ul className='bg-white rounded-lg shadow-xl w-fit absolute right-0 transition'>
          <li className='hover:bg-slate-100 border-t-2 border-l-2 border-r-2 border-slate-300 rounded-t-lg'>
            <button
              className='flex justify-between p-2 gap-2 w-full whitespace-nowrap'
              onClick={() =>
                console.error('FIXME: button not hooked up to Sign Out')
              }
            >
              <span>Sign Out</span>
              <LogOutIcon />
            </button>
          </li>
          <li className='hover:bg-slate-100 border-b-2 border-l-2 border-r-2 border-slate-300 rounded-b-lg'>
            <button
              className='flex justify-between p-2 gap-2 w-full whitespace-nowrap'
              onClick={handleMoreOptionsClick}
            >
              <span>More Options</span>
              <EllipsisIcon />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
