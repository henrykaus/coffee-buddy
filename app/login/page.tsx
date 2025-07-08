import {signIn} from '@/auth';
import MovingBackground from '@/app/ui/login/MovingBackground';
import {Route, ToastType} from '@/app/lib/enums';
import Toast from '@/app/ui/common/Toast';
import React from 'react';
import {getLoginError} from '@/app/server/common';

interface PageProps {
  searchParams?: Promise<{
    error?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const error = searchParams?.error || '';

  const handleLoginClick = async () => {
    'use server';
    await signIn('google', {
      redirectTo: Route.Home,
    });
  };

  return (
    <main className='relative flex gap-3 items-center justify-center h-screen overflow-hidden'>
      <Toast show={error !== ''} type={ToastType.Error}>
        {getLoginError(error)}
      </Toast>
      <section className='p-5 py-5 flex flex-col gap-7 items-center justify-center rounded-2xl backdrop-blur-xs'>
        <h1 className='font-semibold text-4xl text-slate-700 font-[family-name:var(--font-header)]'>
          Coffee Buddy
        </h1>
        <form action={handleLoginClick}>
          <button
            className='border-2 border-slate-200 rounded-full py-2 px-4 hover:bg-slate-100 active:bg-slate-100 active:scale-97 bg-(--background) transition cursor-pointer'
            type='submit'
          >
            Log in with Google
          </button>
        </form>
      </section>
      <MovingBackground />
    </main>
  );
}
