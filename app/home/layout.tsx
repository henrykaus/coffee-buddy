import React, {ReactNode} from 'react';

interface LayoutProps {
  children: Readonly<ReactNode>;
}

export default async function Layout(props: LayoutProps) {
  const {children} = props;

  return (
    <main className='w-full min-h-screen font-[family-name:var(--font-geist-sans)]'>
      {children}
    </main>
  );
}
