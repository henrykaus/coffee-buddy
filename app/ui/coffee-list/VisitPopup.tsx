'use client';

import React, {useActionState} from 'react';
import {State} from '@/app/server/visits/actions';
import OrderTypeToggle from '@/app/ui/inputs/OrderTypeToggle';
import RatingInput from '@/app/ui/inputs/RatingInput';
import PriceInput from '@/app/ui/inputs/PriceInput';
import {listUsers} from '@/app/server/users/actions';
import {TrashIcon} from '@/app/ui/icons';
import ShopSearch from '@/app/ui/inputs/ShopSearch';
import {Visit} from '@/app/lib/types';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import Modal from '@/app/ui/common/Modal';
import SizeInput from '@/app/ui/inputs/SizeInput';
import {getDateForClient} from '@/app/server/common';
import {
  NOTES_PLACEHOLDER_KEYWORDS,
  SEARCH_PLACEHOLDER_KEYWORDS,
} from '@/app/lib/constants';

export interface VisitPopupProps {
  title: string;
  visit?: Visit;
  onConfirm: (
    prevState: State | undefined,
    formData: FormData,
  ) => Promise<{message: string} | undefined>;
  confirmButtonText: string;
  cancelButton?: boolean;
  onDelete?: (id: string) => Promise<void>;
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
    title,
    visit,
    onConfirm,
    confirmButtonText,
    cancelButton = false,
    onDelete,
  } = props;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const initialState: State = {message: null};

  const confirmAction = async (
    prevState: State | undefined,
    formData: FormData,
  ) => {
    const users = await listUsers();

    if (users.length === 0 || !users[0].id) {
      return prevState;
    }

    if (visit) {
      formData.set('id', visit.id);
    }
    formData.set('userId', users[0].id);

    await onConfirm(prevState, formData);
    removeVisitPopupParams();
  };

  const [state, formAction] = useActionState(confirmAction, initialState);

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (onDelete && visit) {
      await onDelete(visit.id);
    }
    removeVisitPopupParams();
  };

  const handleClose = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    removeVisitPopupParams();
  };

  const removeVisitPopupParams = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('action');
    params.delete('visitId');
    replace(`${pathname}?${params.toString()}`);
  };

  const getTodaysDate = () => {
    const today = new Date();
    return getDateForClient(today);
  };

  const selectRandomPlaceholder = () => {
    const randomNumber = Math.floor(
      Math.random() * NOTES_PLACEHOLDER_KEYWORDS.length,
    );

    return NOTES_PLACEHOLDER_KEYWORDS[randomNumber];
  };

  const inputClasses =
    'border-b-2 border-slate-300 outline-hidden focus:border-b-slate-400 text-slate-600 transition p-1 grow min-w-0 max-w-full';
  const textAreaClasses =
    'border-2 border-slate-300 rounded-md outline-hidden focus:border-b-slate-400 text-slate-600 transition p-2';

  return (
    <Modal
      title={title}
      onClose={handleClose}
      onConfirm={formAction}
      primaryButtonText={confirmButtonText}
      showClose={!onDelete}
      showSecondary={cancelButton}
    >
      {onDelete && visit && (
        <button
          className='absolute right-9 top-9 rounded-md p-2 flex items-center justify-center transition hover:bg-rose-200 text-rose-700'
          onClick={handleDelete}
          aria-label='Delete visit'
        >
          <TrashIcon />
        </button>
      )}
      {state?.message && (
        <p className='bg-rose-300 rounded-lg p-2 text-rose-800 mb-4'>
          <span className='font-semibold'>ERROR:</span> {state.message}
        </p>
      )}
      <div className='flex flex-col gap-3'>
        <ShopSearch className={inputClasses} defaultValue={visit?.shop} />
        <div className='flex gap-2'>
          <input
            type='date'
            placeholder='MM/DD/YYYY'
            name='date'
            aria-label='Visit date'
            className={inputClasses}
            defaultValue={visit?.date ? visit.date : getTodaysDate()}
            required
          />
          <OrderTypeToggle defaultValue={visit?.orderType} />
        </div>
        <div className='flex gap-5'>
          <SizeInput className={inputClasses} defaultValue={visit?.size} />
          <input
            type='text'
            placeholder='Drink'
            name='drink'
            aria-label='Location'
            className={inputClasses}
            defaultValue={visit?.drink}
            required
          />
        </div>
        <div className='flex gap-5'>
          <RatingInput className={inputClasses} defaultValue={visit?.rating} />
          <PriceInput className={inputClasses} defaultValue={visit?.price} />
        </div>
        {/* Have more interesting placeholders */}
        <textarea
          placeholder={selectRandomPlaceholder()}
          name='notes'
          aria-label='Notes'
          className={textAreaClasses}
          rows={3}
          defaultValue={visit?.notes ?? undefined}
          suppressHydrationWarning
        />
      </div>
    </Modal>
  );
}
