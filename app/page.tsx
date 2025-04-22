import Link from 'next/link';

export default async function Home() {
  return (
    <div className='grid grid-rows-[1fr_20px] justify-items-center min-h-screen p-8 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='w-full'>
        <Link href='/home' className='p-4 rounded border-2'>
          Go Home
        </Link>
        <Link href='/seed' className='p-4 rounded border-2 ml-2'>
          Seed Data
        </Link>
        <Link href='/login' className='p-4 rounded border-2 ml-2'>
          Login
        </Link>
      </main>
    </div>
  );
}
