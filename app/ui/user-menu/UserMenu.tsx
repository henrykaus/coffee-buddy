'use client';

import React, {useEffect, useRef, useState} from 'react';
import {EllipsisIcon, LogOutIcon} from '@/app/ui/icons';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {HomeActionType} from '@/app/lib/enums';
import {signOut} from 'next-auth/react';
import {UserAvatar} from '@/app/ui/user-menu/UserAvatar';

interface UserMenuProps {
  imageUrl?: string | null;
}

export default function UserMenu(props: UserMenuProps) {
  const {imageUrl} = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeMenu();
    }
  };

  const handleMoreOptionsClick = () => {
    closeMenu();

    const params = new URLSearchParams(searchParams);
    params.set('action', HomeActionType.MoreOptions);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='relative text-slate-700 font-medium' ref={ref}>
      <button
        className='rounded-full p-1 transition hover:bg-slate-200/80'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <UserAvatar imageUrl={imageUrl} />
      </button>
      {isMenuOpen && (
        <ul className='bg-white rounded-lg shadow-xl w-fit absolute right-0 transition'>
          <li className='hover:bg-slate-100 border-t-2 border-l-2 border-r-2 border-slate-300 rounded-t-lg'>
            <button
              className='flex justify-between p-2 gap-2 w-full whitespace-nowrap'
              onClick={() => signOut({redirectTo: '/login'})}
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
