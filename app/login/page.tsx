import {signIn} from '@/auth';

export default function Page() {
  return (
    <main className='flex flex-col gap-3 items-center justify-center h-screen'>
      <h1 className='font-medium text-3xl'>Coffee</h1>
      <form
        action={async () => {
          'use server';
          await signIn('google', {redirectTo: '/home'});
        }}
      >
        <button
          className='border-2 rounded-lg p-2 hover:bg-slate-100 transition cursor-pointer'
          type='submit'
        >
          Login with Google
        </button>
      </form>
    </main>
  );
}
