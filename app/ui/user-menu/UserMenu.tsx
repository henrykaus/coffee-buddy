'use client';

import React, {useState} from 'react';
import {EllipsisIcon, LogOutIcon} from '@/app/ui/icons';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {HomeActionType, Route} from '@/app/lib/enums';
import {signOut} from 'next-auth/react';
import {UserAvatar} from '@/app/ui/user-menu/UserAvatar';
import useCloseableDropdown from '@/app/hooks/useCloseableDropdown';

interface UserMenuProps {
  imageUrl?: string | null;
}

export default function UserMenu(props: UserMenuProps) {
  const {imageUrl} = props;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const ref = useCloseableDropdown<HTMLDivElement>(() => setIsOpen(false));

  const handleMoreOptionsClick = () => {
    ref.current?.blur();

    const params = new URLSearchParams(searchParams);
    params.set('action', HomeActionType.MoreOptions);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='relative text-slate-700 font-medium' ref={ref}>
      <button
        aria-label='Open user menu'
        className='rounded-full p-1 transition hover:bg-slate-200/80'
        onClick={() => setIsOpen(!isOpen)}
      >
        <UserAvatar imageUrl={imageUrl} />
      </button>
      {isOpen && (
        <ul className='bg-(--background) rounded-lg shadow-xl w-fit absolute end-0 transition'>
          <li className='hover:bg-slate-100 border-t-2 border-l-2 border-r-2 border-slate-300 rounded-t-lg'>
            <button
              className='flex justify-between p-2 gap-2 w-full whitespace-nowrap'
              onClick={() => signOut({redirectTo: `/${Route.Login}`})}
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
