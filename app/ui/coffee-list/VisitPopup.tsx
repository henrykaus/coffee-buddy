'use client';

import React, {ReactNode, useActionState} from 'react';
import {State} from '@/app/server/visits/actions';
import OrderTypeToggle from '@/app/ui/inputs/OrderTypeToggle';
import PriceInput from '@/app/ui/inputs/PriceInput';
import {CheckIcon, TrashIcon} from '@/app/ui/icons';
import ShopSearch from '@/app/ui/inputs/ShopSearch';
import {Visit} from '@/app/lib/types';
import Modal from '@/app/ui/common/Modal';
import DrinkInput from '@/app/ui/inputs/DrinkInput';
import NotesInput from '@/app/ui/inputs/NotesInput';
import RatingInput from '@/app/ui/inputs/RatingInput';
import DateInput from '@/app/ui/inputs/DateInput';
import {getVisitFromFormData} from '@/app/server/common';
import {v4 as uuidv4} from 'uuid';

export interface VisitPopupProps {
  autoFocusShop?: boolean;
  visit?: Visit;
  confirmButton?: ReactNode;
  onConfirm: (
    prevState: State | undefined,
    formData: FormData,
  ) => Promise<State>;
  onDelete?: (id: string) => Promise<State>;
  onClose: () => void;
  whenDone: (visit: Visit) => void;
}

/**
 * Venmo has good interface for a "form" that doesn't feel like a form.
 * For adding it could have 1 screen on searching for location, and the
 * next screen on filling in deats with default date being today.
 * Rating could be 1-5 buttons w/ emoji icons (starting at 0)?
 * Have size picker have increment and decrement buttons in addition to edit '<' 8 '>'
 */
export default function VisitPopup(props: VisitPopupProps) {
  const {
    autoFocusShop = false,
    visit,
    onConfirm,
    onDelete,
    onClose,
    whenDone,
  } = props;

  const initialState: State = {message: null, visit: null};

  const handleConfirm = async (
    prevState: State | undefined,
    formData: FormData,
  ): Promise<State> => {
    whenDone(getVisitFromFormData(formData));
    console.log('when done');
    onClose();
    console.log('after close');

    let state: State = {};
    setTimeout(async () => {
      state = await onConfirm(prevState, formData);
    }, 100);
    return state;
  };

  const [state, formAction] = useActionState(handleConfirm, initialState);

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    onClose();
    if (onDelete && visit) {
      // whenDone(visit);
      setTimeout(async () => {
        await onDelete(visit.id);
      }, 100);
    }
  };

  const handleClose = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    onClose();
  };

  const inputClasses =
    'border-b-2 border-slate-300 outline-hidden focus:border-b-slate-400 text-slate-600 transition p-1 grow min-w-0 max-w-full';

  const confirmButton = (
    <button
      formAction={formAction}
      className='rounded-full h-10 w-10 flex items-center justify-center text-green-800 bg-green-100 hover:bg-green-200 active:bg-green-200 active:scale-90 transition'
      key={3}
    >
      <CheckIcon />
    </button>
  );

  const deleteButton = (
    <button
      className='rounded-full h-10 w-10 flex items-center justify-center text-rose-800 bg-rose-100 hover:bg-rose-200 active:bg-rose-200 active:scale-90 transition'
      onClick={handleDelete}
      aria-label='Delete visit'
      key={10}
    >
      <TrashIcon />
    </button>
  );

  const actions = [
    <DateInput key={0} defaultValue={visit?.date ?? undefined} />,
    <RatingInput key={1} defaultValue={visit?.rating ?? undefined} />,
    <NotesInput key={2} defaultValue={visit?.notes ?? undefined} />,
    ...(onDelete ? [deleteButton] : []),
    confirmButton,
  ];

  return (
    <Modal onClose={handleClose} actions={actions}>
      {state?.message && (
        <p className='bg-rose-300 rounded-lg p-2 text-rose-800 mb-4'>
          <span className='font-semibold'>ERROR:</span> {state.message}
        </p>
      )}
      <div className='flex flex-col gap-6 mt-8'>
        <ShopSearch
          autoFocus={autoFocusShop}
          className={inputClasses}
          defaultName={visit?.shopName}
          defaultId={visit?.shopId}
        />
        <div className='flex gap-5'>
          <DrinkInput
            className={inputClasses}
            defaultDrink={visit?.drink}
            defaultSize={visit?.size ?? undefined}
          />
        </div>
        <div className='flex gap-3'>
          <PriceInput className={inputClasses} defaultValue={visit?.price} />
          <OrderTypeToggle defaultValue={visit?.orderType} />
        </div>
      </div>
      <input type='text' defaultValue={visit?.id} name='id' readOnly hidden />
      <input
        type='text'
        defaultValue={uuidv4().substring(0, 6)}
        name='recon-id'
        readOnly
        hidden
      />
    </Modal>
  );
}
