'use client';

import React, {useState} from 'react';
import {EllipsisIcon, LogOutIcon} from '@/app/ui/icons';
import {Route, UserMenuOption} from '@/app/lib/enums';
import {UserAvatar} from '@/app/ui/user-menu/UserAvatar';
import useCloseableDropdown from '@/app/hooks/useCloseableDropdown';
import MoreOptionsPopup from '@/app/ui/user-menu/MoreOptionsPopup';
import DeleteAccountPopup from '@/app/ui/user-menu/DeleteAccountPopup';
import {signOut} from 'next-auth/react';

interface UserMenuProps {
  imageUrl?: string | null;
}

export default function UserMenu(props: UserMenuProps) {
  const {imageUrl} = props;

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<UserMenuOption | null>(null);

  const ref = useCloseableDropdown<HTMLDivElement>(() => setIsOpen(false));

  const handleOptionClicked = async (option: UserMenuOption) => {
    switch (option) {
      case UserMenuOption.DeleteAccount: {
        setMenuOpen(UserMenuOption.DeleteAccount);
        break;
      }
      case UserMenuOption.LogOut: {
        await signOut({redirectTo: Route.Login});
        break;
      }
      case UserMenuOption.MoreOptions: {
        setMenuOpen(UserMenuOption.MoreOptions);
        break;
      }
      case UserMenuOption.WhatsNew: {
        // What's New is navigated to from a Link component
        setMenuOpen(null);
        break;
      }
    }
  };

  const handleClosePopup = () => {
    setMenuOpen(null);
  };

  return (
    <>
      <div className='relative text-slate-700 font-medium' ref={ref}>
        <button
          aria-label='Open user menu'
          className='rounded-full transition hover:bg-slate-200/80 active:bg-slate-200/80 active:scale-90'
          onClick={() => setIsOpen(!isOpen)}
        >
          <UserAvatar imageUrl={imageUrl} />
        </button>
        {isOpen && !menuOpen && (
          <ul className='bg-(--background) rounded-lg shadow-xl w-fit absolute end-0 transition'>
            <li className='hover:bg-slate-100 active:bg-slate-100 border-t-2 border-l-2 border-r-2 border-slate-300 rounded-t-lg'>
              <button
                className='flex justify-between p-2 gap-4 w-full whitespace-nowrap'
                onClick={() => handleOptionClicked(UserMenuOption.LogOut)}
              >
                <span>Sign Out</span>
                <LogOutIcon />
              </button>
            </li>
            <li className='hover:bg-slate-100 active:bg-slate-100 border-b-2 border-l-2 border-r-2 border-slate-300 rounded-b-lg'>
              <button
                className='flex justify-between p-2 gap-4 w-full whitespace-nowrap'
                onClick={() => handleOptionClicked(UserMenuOption.MoreOptions)}
              >
                <span>More Options</span>
                <EllipsisIcon />
              </button>
            </li>
          </ul>
        )}
      </div>
      {menuOpen === UserMenuOption.MoreOptions && (
        <MoreOptionsPopup
          onClose={handleClosePopup}
          handleOptionClicked={handleOptionClicked}
        />
      )}
      {menuOpen === UserMenuOption.DeleteAccount && (
        <DeleteAccountPopup onClose={handleClosePopup} />
      )}
    </>
  );
}
