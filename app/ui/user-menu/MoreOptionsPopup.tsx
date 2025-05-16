'use client';

import Modal from '@/app/ui/common/Modal';
import React from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {GhostIcon, LogOutIcon} from '@/app/ui/icons';
import {HomeActionType, Route} from '@/app/lib/enums';
import {signOut} from 'next-auth/react';

export default function MoreOptionsPopup() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('action');
    replace(`${pathname}?${params.toString()}`);
  };

  const handleDeleteAccount = () => {
    const params = new URLSearchParams(searchParams);
    params.set('action', HomeActionType.DeleteAccount);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Modal title='More Options' fullscreen={false} onClose={handleClose}>
      <ul>
        <li className='transition relative hover:bg-slate-100 active:bg-slate-100 text-slate-700 rounded-lg after:bg-slate-200 after:h-[2px] after:content-[""] after:w-[calc(100%-1.5rem)] after:start-3 after:absolute after:-bottom-[0.5em]'>
          <button
            type='button'
            className='flex justify-between p-3 mb-4 gap-2 w-full whitespace-nowrap'
            onClick={() => signOut({redirectTo: `/${Route.Login}`})}
          >
            <span>Sign Out</span>
            <LogOutIcon />
          </button>
        </li>
        <li className='transition hover:bg-rose-100 active:bg-rose-100 text-rose-700 rounded-lg'>
          <button
            type='button'
            className='flex justify-between p-3 mt-4 gap-2 w-full whitespace-nowrap'
            onClick={handleDeleteAccount}
          >
            <span>Delete Account</span>
            <GhostIcon />
          </button>
        </li>
      </ul>
    </Modal>
  );
}
