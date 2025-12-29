'use client';

import React, {ReactNode, useEffect} from 'react';
import ModalBackground from '@/app/ui/common/ModalBackground';
import {CloseIcon} from '@/app/ui/icons';
import clsx from 'clsx';

interface ModalProps {
  actions?: ReactNode[];
  children?: ReactNode;
  fullscreen?: boolean;
  centered?: boolean;
  onClose: (...args: never[]) => void;
  onConfirm?: (formData: FormData) => void | Promise<void>;
  primaryButtonText?: string;
  showClose?: boolean;
  title?: string;
  modalAnimation?: ModalAnimation;
}

export default function Modal(props: ModalProps) {
  const {
    actions,
    children,
    fullscreen = true,
    centered = false,
    onClose,
    showClose = true,
    title,
    modalAnimation = ModalAnimation.Enter,
  } = props;

  useEffect(() => {
    // Stop body from being scrollable when modal is open
    document.body.classList.add('overflow-y-hidden', 'touch-none');
    return () => {
      document.body.classList.remove('overflow-y-hidden', 'touch-none');
    };
  }, []);

  return (
    <>
      <ModalBackground />
      <dialog
        className={clsx(
          'rounded-t-2xl margin-0 w-full fixed bottom-0 start-0 bg-white text-xl p-6 pt-8 pb-10 z-10 shadow-md',
          'md:start-auto md:w-124',
          {
            'h-[75%]': fullscreen,
            'md:h-auto md:m-auto md:end-[50%] md:bottom-[50%] md:translate-1/2 md:rounded-xl':
              centered,
            'md:h-full md:end-0 md:rounded-t-none md:rounded-l-xl': !centered,
            'animate-(--animate-popup-slide-up) md:animate-(--animate-popup-slide-left)':
              modalAnimation === ModalAnimation.Enter,
            'animate-(--animate-popup-slide-down) md:animate-(--animate-popup-slide-right)':
              modalAnimation === ModalAnimation.Exit,
          },
        )}
        open
      >
        <form>
          <header className='flex justify-center items-center text-2xl mb-4 min-h-8'>
            {showClose && (
              <button
                type='button'
                onClick={onClose}
                aria-label='Close popup'
                className='absolute start-6 top-6 hover:bg-slate-200 active:bg-slate-300 rounded-md p-2 flex items-center justify-center text-slate-600 transition'
              >
                <CloseIcon height={20} width={20} />
              </button>
            )}
            {title && <h2 className='font-medium text-slate-700'>{title}</h2>}
            {actions && (
              <span className='absolute end-6 top-6 flex gap-3'>
                {actions.map((action) => action)}
              </span>
            )}
          </header>
          {children}
        </form>
      </dialog>
    </>
  );
}

export enum ModalAnimation {
  Enter = 'enter',
  Exit = 'exit',
}
