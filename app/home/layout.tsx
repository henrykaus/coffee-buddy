import React, {ReactNode} from 'react';
import HomeHeader from '@/app/ui/home-page/HomeHeader';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import {Route} from '@/app/lib/enums';

interface LayoutProps {
  children: Readonly<ReactNode>;
}

export default async function Layout(props: LayoutProps) {
  const {children} = props;

  const session = await auth();

  if (!session) {
    redirect(Route.Login);
  }

  return (
    <main className='w-full min-h-screen font-[family-name:var(--font-geist-sans)]'>
      <HomeHeader user={session?.user} />
      {children}
    </main>
  );
}
