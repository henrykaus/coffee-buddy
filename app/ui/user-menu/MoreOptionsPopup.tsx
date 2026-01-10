import Modal from '@/app/ui/common/Modal';
import React, {useState} from 'react';
import {GhostIcon, WhatsNewIcon} from '@/app/ui/icons';
import {MoreMenuOption, Route} from '@/app/lib/enums';
import Link from 'next/link';
import DeleteAccountPopup from '@/app/ui/user-menu/DeleteAccountPopup';

interface MoreOptionsPopupProps {
  onClose: () => void;
}

const optionClasses =
  'transition relative hover:bg-slate-100 active:bg-slate-100 active:bg-slate-200/90 text-slate-700 rounded-lg after:bg-slate-200 after:h-[2px] after:content-[""] after:w-[calc(100%-1.5rem)] after:start-3 after:absolute after:-bottom-[0.5em]';

const buttonClasses =
  'flex justify-between items-center p-3 mb-4 gap-2 w-full whitespace-nowrap';

export default function MoreOptionsPopup(props: MoreOptionsPopupProps) {
  const {onClose} = props;

  // FIXME: Temporary logic for deletion to work until this is moved into a settings page
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    onClose();
  };

  const handleOptionClicked = async (option: MoreMenuOption) => {
    switch (option) {
      case MoreMenuOption.WhatsNew: {
        onClose();
        break;
      }
      case MoreMenuOption.DeleteAccount: {
        setIsDeleteOpen(true);
        break;
      }
    }
  };

  return (
    <>
      {!isDeleteOpen && (
        <Modal title='More Options' fullscreen={false} onClose={onClose}>
          <ul>
            <li className={optionClasses}>
              <Link
                className={buttonClasses}
                href={Route.WhatsNew}
                onNavigate={() => handleOptionClicked(MoreMenuOption.WhatsNew)}
              >
                <span>What&apos;s New</span>
                <WhatsNewIcon />
              </Link>
            </li>
            <li className='transition hover:bg-rose-100 active:bg-rose-200/90 text-rose-700 rounded-lg'>
              <button
                type='button'
                className='flex justify-between items-center p-3 mt-4 gap-2 w-full whitespace-nowrap'
                onClick={() =>
                  handleOptionClicked(MoreMenuOption.DeleteAccount)
                }
              >
                <span>Delete Account</span>
                <GhostIcon />
              </button>
            </li>
          </ul>
        </Modal>
      )}
      {isDeleteOpen && <DeleteAccountPopup onClose={handleCloseDelete} />}
    </>
  );
}
