import React, {ReactNode, Suspense} from 'react';
import HomeHeader from '@/app/ui/home-page/HomeHeader';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import {Route} from '@/app/lib/enums';
import {HeaderSkeleton} from '@/app/ui/skeletons';

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
      <Suspense fallback={<HeaderSkeleton />}>
        <HomeHeader user={session?.user} />
      </Suspense>
      {children}
    </main>
  );
}
