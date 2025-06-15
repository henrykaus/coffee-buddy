'use client';

import Modal from '@/app/ui/common/Modal';
import React from 'react';
import {useRouter} from 'next/navigation';
import {CancelIcon, GhostIcon} from '@/app/ui/icons';
import {deleteUserData} from '@/app/server/data-deletion/actions';
import {Route} from '@/app/lib/enums';

interface DeleteAccountPopupProps {
  onClose: () => void;
}

export default function DeleteAccountPopup(props: DeleteAccountPopupProps) {
  const {onClose} = props;
  const {replace} = useRouter();

  const handleDeleteAccount = async () => {
    await deleteUserData();
    replace(Route.Login);
  };

  return (
    <Modal
      title='Are You Sure?'
      centered
      fullscreen={false}
      showClose={false}
      onClose={onClose}
    >
      <p className='mb-5 mx-2 text-lg text-slate-700'>
        All of your information will be permanently deleted. This action{' '}
        <span className='font-bold'>cannot</span> be undone.
      </p>
      <div className='mx-5'>
        <button
          type='button'
          className='flex justify-center items-center transition hover:bg-rose-100 active:bg-rose-100 text-rose-700 rounded-lg border-rose-700/50 border-[3px] p-2 gap-2 w-full whitespace-nowrap font-medium'
          onClick={handleDeleteAccount}
        >
          <GhostIcon />
          <span>Delete Account</span>
        </button>
        <button
          type='button'
          className='flex justify-center items-center transition hover:bg-slate-200/90 active:bg-slate-200/90 text-slate-700 rounded-lg border-slate-700/50 border-[3px] p-2 gap-2 w-full whitespace-nowrap mt-3'
          onClick={onClose}
        >
          <CancelIcon />
          <span>Return to Safety</span>
        </button>
      </div>
    </Modal>
  );
}
