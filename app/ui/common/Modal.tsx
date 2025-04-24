'use client';

import React, {ReactNode} from 'react';
import ModalBackground from '@/app/ui/common/ModalBackground';
import {CloseIcon} from '@/app/ui/icons';

interface ModalProps {
  children?: ReactNode;
  title: string;
  onClose: (...args: never[]) => void;
  onConfirm?: (formData: FormData) => void | Promise<void>;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showSecondary?: boolean;
  showClose?: boolean;
}

export default function Modal(props: ModalProps) {
  const {
    children,
    title,
    onClose,
    onConfirm,
    primaryButtonText = 'Save',
    secondaryButtonText = 'Cancel',
    showSecondary = true,
    showClose = true,
  } = props;

  const showFooter = !!onConfirm || showSecondary;

  return (
    <>
      <ModalBackground />
      <dialog
        className='rounded-t-2xl margin-0 w-full fixed bottom-0 left-0 bg-white text-xl p-10 pb-10'
        open
      >
        <form>
          <header className='flex justify-center items-center text-2xl mb-4'>
            {showClose && (
              <button
                onClick={onClose}
                aria-label='Close popup'
                className='absolute left-9 top-9 hover:bg-slate-200 rounded-md p-2 flex items-center justify-center text-slate-600 transition'
              >
                <CloseIcon height={20} width={20} />
              </button>
            )}
            <h2 className='font-medium text-slate-700'>{title}</h2>
          </header>
          {children}
          {showFooter && (
            <footer className='flex items-center justify-center gap-3 mt-4'>
              {onConfirm && (
                <button
                  formAction={onConfirm}
                  className='rounded-lg self-center bg-green-200 py-1 px-3 font-medium text-green-800 hover:bg-green-300 transition'
                >
                  {primaryButtonText}
                </button>
              )}
              {showSecondary && (
                <button
                  onClick={onClose}
                  className='rounded-lg self-center bg-slate-200 py-1 px-3 font-medium text-slate-600 hover:bg-slate-300 transition'
                >
                  {secondaryButtonText}
                </button>
              )}
            </footer>
          )}
        </form>
      </dialog>
    </>
  );
}
