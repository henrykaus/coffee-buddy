import React, {ReactNode} from 'react';

interface LayoutProps {
  children: Readonly<ReactNode>;
}

export default async function Layout(props: LayoutProps) {
  const {children} = props;

  return (
    <div className='min-h-screen font-[family-name:var(--font-geist-sans)]'>
      <main className='w-full'>{children}</main>
    </div>
  );
}
