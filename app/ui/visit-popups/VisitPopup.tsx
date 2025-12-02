'use client';

import React, {useActionState, useCallback, useMemo, useState} from 'react';
import {State} from '@/app/server/visits/actions';
import OrderTypeToggle from '@/app/ui/inputs/OrderTypeToggle';
import PriceInput from '@/app/ui/inputs/PriceInput';
import {CheckIcon, TrashIcon} from '@/app/ui/icons';
import ShopSearch from '@/app/ui/inputs/ShopSearch';
import {RequiredVisitFieldsValidity, Visit} from '@/app/lib/types';
import Modal from '@/app/ui/common/Modal';
import DrinkInput from '@/app/ui/inputs/DrinkInput';
import NotesInput from '@/app/ui/inputs/NotesInput';
import RatingInput from '@/app/ui/inputs/RatingInput';
import DateInput from '@/app/ui/inputs/DateInput';
import {getVisitFromFormData} from '@/app/server/common';
import {v4 as uuidv4} from 'uuid';
import {
  DEFAULT_ADD_VISIT_REQUIRED_FIELDS,
  DEFAULT_EDIT_VISIT_REQUIRED_FIELDS,
} from '@/app/lib/constants';
import {OrderType, VisitFormField} from '@/app/lib/enums';

export interface VisitPopupProps {
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
    onClose,
    onConfirmClientAction,
    onConfirmServerAction,
    onDeleteClientAction,
    onDeleteServerAction,
    visit,
  } = props;

  // COMPONENT STATE

  const [requiredFieldState, setRequiredFieldState] =
    useState<RequiredVisitFieldsValidity>(
      !visit
        ? DEFAULT_ADD_VISIT_REQUIRED_FIELDS
        : DEFAULT_EDIT_VISIT_REQUIRED_FIELDS,
    );
  const [orderType, setOrderType] = useState<OrderType>(
    visit?.orderType ?? OrderType.ToGo,
  );

  const reconId = useMemo(() => uuidv4().substring(0, 6), []);

  const initialState: State = {message: null, visit: null};

  // HANDLERS

  const handleRequiredFieldChange = (value: string, field: VisitFormField) => {
    switch (field) {
      // For required fields, ensure a value is set
      case VisitFormField.Shop:
        setRequiredFieldState({
          ...requiredFieldState,
          shopIsValid: value !== null && value !== undefined && value !== '',
        });
        break;
      case VisitFormField.Drink:
        setRequiredFieldState({
          ...requiredFieldState,
          drinkIsValid: value !== null && value !== undefined && value !== '',
        });
        break;
      case VisitFormField.Price: {
        setRequiredFieldState({
          ...requiredFieldState,
          priceIsValid: value !== null && value !== undefined && value !== '',
        });
        break;
      }
      // For non-required fields, we won't run a validation until submission
      default:
        break;
    }
  };

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

  const handleDelete = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    },
    [onClose, onDeleteClientAction, onDeleteServerAction, visit],
  );

  const handleClose = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    onClose();
  };

  const canSave = useMemo(
    () =>
      requiredFieldState.shopIsValid &&
      requiredFieldState.drinkIsValid &&
      requiredFieldState.priceIsValid,
    [
      requiredFieldState.drinkIsValid,
      requiredFieldState.priceIsValid,
      requiredFieldState.shopIsValid,
    ],
  );

  const actions = useMemo(
    () => [
      <DateInput key={0} defaultValue={visit?.date ?? undefined} />,
      <RatingInput key={1} defaultValue={visit?.rating} />,
      <NotesInput key={2} defaultValue={visit?.notes ?? undefined} />,
      ...(onDeleteServerAction
        ? [<DeleteButton onClick={handleDelete} key={3} />]
        : []),
      <ConfirmButton disabled={!canSave} onClick={formAction} key={4} />,
    ],
    [
      canSave,
      handleDelete,
      onDeleteServerAction,
      visit?.date,
      visit?.notes,
      visit?.rating,
    ],
  );

  const inputClasses =
    'border-b-2 border-slate-300 outline-hidden focus:border-b-slate-400 text-slate-600 transition p-1 grow min-w-0 max-w-full';

  return (
    <Modal onClose={handleClose} actions={actions}>
      <section className='flex flex-col gap-8 mt-8'>
        <ShopSearch
          className={inputClasses}
          defaultValue={visit?.shopName}
          defaultId={visit?.shopId}
          onChange={(shopName: string) =>
            handleRequiredFieldChange(shopName, VisitFormField.Shop)
          }
        />
        <DrinkInput
          className={inputClasses}
          defaultDrink={visit?.drink}
          defaultSize={visit?.size}
          onChange={(drink: string) =>
            handleRequiredFieldChange(drink, VisitFormField.Drink)
          }
          isForDrink={orderType !== OrderType.CoffeeBeans}
        />
        <div className='flex gap-3'>
          <PriceInput
            className={inputClasses}
            defaultValue={visit?.price}
            onChange={(price: string) =>
              handleRequiredFieldChange(price, VisitFormField.Price)
            }
          />
          <OrderTypeToggle
            initialValue={visit?.orderType}
            onChange={(orderType: OrderType) => setOrderType(orderType)}
          />
        </div>
        <input type='text' defaultValue={visit?.id} name='id' readOnly hidden />
        <input
          type='text'
          defaultValue={reconId}
          name='recon-id'
          readOnly
          hidden
        />
      </section>
    </Modal>
  );
}

function DeleteButton(props: {
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => Promise<void>;
}) {
  const {onClick} = props;
  return (
    <button
      className='rounded-full h-10 w-10 flex items-center justify-center text-rose-800 bg-rose-100 hover:bg-rose-200 active:bg-rose-200 active:scale-90 transition'
      onClick={onClick}
      aria-label='Delete visit'
    >
      <TrashIcon />
    </button>
  );
}

function ConfirmButton(props: {
  disabled: boolean;
  onClick: (payload: FormData) => void;
}) {
  const {disabled, onClick} = props;
  return (
    <button
      className='rounded-full h-10 w-10 flex items-center justify-center text-green-800 bg-green-100 hover:bg-green-200 active:bg-green-200 active:scale-90 transition
        disabled:bg-slate-100 disabled:text-slate-400 disabled:active:scale-none'
      disabled={disabled}
      formAction={onClick}
    >
      <CheckIcon />
    </button>
  );
}
