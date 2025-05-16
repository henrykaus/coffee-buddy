'use client';

import Modal from '@/app/ui/common/Modal';
import React from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {CancelIcon, GhostIcon} from '@/app/ui/icons';
import {deleteUserData} from '@/app/server/data-deletion/actions';
import {Route} from '@/app/lib/enums';

export default function DeleteAccountPopup() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const handleDeleteAccount = async () => {
    await deleteUserData();
    replace(`/${Route.Login}`);
  };

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('action');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Modal
      title='Are You Sure?'
      fullscreen={false}
      showClose={false}
      onClose={handleClose}
    >
      <p className='mb-5 mx-2 text-lg text-slate-700'>
        All of your information will be permanently deleted. This action CANNOT
        be undone.
      </p>
      <div className='mx-5'>
        <button
          type='button'
          className='flex justify-center transition hover:bg-rose-100 active:bg-rose-100 text-rose-700 rounded-lg border-rose-700/50 border-[3px] p-2 gap-2 w-full whitespace-nowrap font-medium'
          onClick={handleDeleteAccount}
        >
          <GhostIcon />
          <span>Delete Account</span>
        </button>
        <button
          type='button'
          className='flex justify-center transition hover:bg-slate-200/90 active:bg-slate-200/90 text-slate-700 rounded-lg border-slate-700/50 border-[3px] p-2 gap-2 w-full whitespace-nowrap mt-3'
          onClick={handleClose}
        >
          <CancelIcon />
          <span>Return to Safety</span>
        </button>
      </div>
    </Modal>
  );
}
