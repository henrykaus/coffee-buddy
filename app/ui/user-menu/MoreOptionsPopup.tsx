import Modal from '@/app/ui/common/Modal';
import React from 'react';
import {GhostIcon, LogOutIcon} from '@/app/ui/icons';
import {UserMenuOption} from '@/app/lib/enums';

interface MoreOptionsPopupProps {
  onClose: () => void;
  handleOptionClicked: (option: UserMenuOption) => void;
}

export default function MoreOptionsPopup(props: MoreOptionsPopupProps) {
  const {onClose, handleOptionClicked} = props;

  return (
    <Modal title='More Options' fullscreen={false} onClose={onClose}>
      <ul>
        <li className='transition relative hover:bg-slate-100 active:bg-slate-100 text-slate-700 rounded-lg after:bg-slate-200 after:h-[2px] after:content-[""] after:w-[calc(100%-1.5rem)] after:start-3 after:absolute after:-bottom-[0.5em]'>
          <button
            type='button'
            className='flex justify-between p-3 mb-4 gap-2 w-full whitespace-nowrap'
            onClick={() => handleOptionClicked(UserMenuOption.LogOut)}
          >
            <span>Sign Out</span>
            <LogOutIcon />
          </button>
        </li>
        <li className='transition hover:bg-rose-100 active:bg-rose-100 text-rose-700 rounded-lg'>
          <button
            type='button'
            className='flex justify-between p-3 mt-4 gap-2 w-full whitespace-nowrap'
            onClick={() => handleOptionClicked(UserMenuOption.DeleteAccount)}
          >
            <span>Delete Account</span>
            <GhostIcon />
          </button>
        </li>
      </ul>
    </Modal>
  );
}
