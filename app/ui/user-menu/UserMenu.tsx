'use client';

import React, {useState} from 'react';
import {EllipsisIcon, HomeIcon, LogOutIcon} from '@/app/ui/icons';
import {Route, UserMenuOption} from '@/app/lib/enums';
import {UserAvatar} from '@/app/ui/user-menu/UserAvatar';
import useCloseableDropdown from '@/app/hooks/useCloseableDropdown';
import MoreOptionsPopup from '@/app/ui/user-menu/MoreOptionsPopup';
import {signOut} from 'next-auth/react';
import Link from 'next/link';

interface UserMenuProps {
  imageUrl?: string | null;
}

export default function UserMenu(props: UserMenuProps) {
  const {imageUrl} = props;

  const [isOpen, setIsOpen] = useState(false);
  const [menuOption, setMenuOption] = useState<UserMenuOption | null>(null);

  const ref = useCloseableDropdown<HTMLDivElement>(() => setIsOpen(false));

  const handleClosePopup = () => {
    setMenuOption(null);
    setIsOpen(false);
  };

  const handleOptionClicked = async (option: UserMenuOption) => {
    switch (option) {
      case UserMenuOption.Home: {
        // Navigating away should close popup
        handleClosePopup();
        break;
      }
      case UserMenuOption.MoreOptions: {
        // Close popup when more options menu opens
        setIsOpen(false);
        setMenuOption(UserMenuOption.MoreOptions);
        break;
      }
      case UserMenuOption.LogOut: {
        // TODO: Add spinner to logout when clicked
        await signOut({redirectTo: Route.Login});
        break;
      }
    }
  };

  return (
    <>
      <div className='relative text-slate-700 font-medium' ref={ref}>
        <button
          aria-label='Open user menu'
          className='rounded-full block transition hover:bg-slate-200/80 active:bg-slate-200/80 active:scale-90'
          onClick={() => setIsOpen(!isOpen)}
        >
          <UserAvatar imageUrl={imageUrl} />
        </button>
        {isOpen && (
          <ul className='bg-(--background) rounded-lg shadow-xl min-w-40 w-fit absolute end-0 -bottom-32 md:-bottom-12 transition'>
            <li className='list-item md:hidden hover:bg-slate-100 active:bg-slate-100 border-t-2 border-l-2 border-r-2 border-slate-300 rounded-t-lg'>
              <Link
                href={Route.Home}
                className='flex justify-between p-2 gap-4 w-full whitespace-nowrap'
                onNavigate={() => handleOptionClicked(UserMenuOption.Home)}
              >
                <span>Home</span>
                <HomeIcon />
              </Link>
            </li>
            <li className='list-item md:hidden hover:bg-slate-100 active:bg-slate-100 border-l-2 border-r-2 border-slate-300'>
              <button
                className='flex justify-between p-2 gap-4 w-full whitespace-nowrap'
                onClick={() => handleOptionClicked(UserMenuOption.MoreOptions)}
              >
                <span>More Options</span>
                <EllipsisIcon />
              </button>
            </li>
            <li className='hover:bg-slate-100 active:bg-slate-100 border-b-2 md:border-t-2 border-l-2 border-r-2 border-slate-300 rounded-b-lg md:rounded-t-lg'>
              <button
                className='flex justify-between p-2 gap-4 w-full whitespace-nowrap'
                onClick={() => handleOptionClicked(UserMenuOption.LogOut)}
              >
                <span>Sign Out</span>
                <LogOutIcon />
              </button>
            </li>
          </ul>
        )}
      </div>
      {menuOption === UserMenuOption.MoreOptions && (
        <MoreOptionsPopup onClose={handleClosePopup} />
      )}
    </>
  );
}
