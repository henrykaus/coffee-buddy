'use client';

import React, {useActionState} from 'react';
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
  onClose: () => void;
  onConfirmClientAction: (state: State) => void;
  onConfirmServerAction: (
    prevState: State | undefined,
    formData: FormData,
  ) => Promise<State>;
  onDeleteClientAction?: (visit: Visit) => void;
  onDeleteServerAction?: (visit: Visit) => Promise<State>;
  visit?: Visit;
}

export default function VisitPopup(props: VisitPopupProps) {
  const {
    autoFocusShop = false,
    onClose,
    onConfirmClientAction,
    onConfirmServerAction,
    onDeleteClientAction,
    onDeleteServerAction,
    visit,
  } = props;

  const initialState: State = {message: null, visit: null};

  const handleConfirm = async (
    prevState: State | undefined,
    formData: FormData,
  ): Promise<State> => {
    onConfirmClientAction(getVisitFromFormData(formData));
    onClose();

    let state: State = {};
    setTimeout(async () => {
      state = await onConfirmServerAction(prevState, formData);
    }, 100);
    return state;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useActionState(handleConfirm, initialState);

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    onClose();
    if (onDeleteServerAction && visit) {
      if (onDeleteClientAction) {
        onDeleteClientAction(visit);
      }
      setTimeout(async () => {
        await onDeleteServerAction(visit);
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
    <RatingInput key={1} defaultValue={visit?.rating} />,
    <NotesInput key={2} defaultValue={visit?.notes ?? undefined} />,
    ...(onDeleteServerAction ? [deleteButton] : []),
    confirmButton,
  ];

  return (
    <Modal onClose={handleClose} actions={actions}>
      <section className='flex flex-col gap-8 mt-8'>
        <ShopSearch
          autoFocus={autoFocusShop}
          className={inputClasses}
          defaultName={visit?.shopName}
          defaultId={visit?.shopId}
        />
        <DrinkInput
          className={inputClasses}
          defaultDrink={visit?.drink}
          defaultSize={visit?.size}
        />
        <div className='flex gap-3'>
          <PriceInput className={inputClasses} defaultValue={visit?.price} />
          <OrderTypeToggle defaultValue={visit?.orderType} />
        </div>
        <input type='text' defaultValue={visit?.id} name='id' readOnly hidden />
        <input
          type='text'
          defaultValue={uuidv4().substring(0, 6)}
          name='recon-id'
          readOnly
          hidden
        />
      </section>
    </Modal>
  );
}
