import React, {ReactNode, Suspense} from 'react';
import HomeHeader from '@/app/ui/home-page/HomeHeader';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import {Route} from '@/app/lib/enums';
import {HeaderSkeleton} from '@/app/ui/skeletons';
import MainMenu from '@/app/ui/common/MainMenu';

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
    <main className='flex flex-col min-h-screen font-(family-name:--font-geist-sans)'>
      <Suspense fallback={<HeaderSkeleton />}>
        <HomeHeader user={session?.user} />
      </Suspense>
      <div className='flex-1 flex relative'>
        <MainMenu />
        <div className='w-full mx-auto md:w-[50%]'>{children}</div>
      </div>
    </main>
  );
}
