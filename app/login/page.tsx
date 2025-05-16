import {signIn} from '@/auth';
import MovingBackground from '@/app/ui/login/MovingBackground';
import {Route} from '@/app/lib/enums';

export default function Page() {
  const handleLoginClick = async () => {
    'use server';
    await signIn('google', {
      redirectTo: `/${Route.Home}`,
    });
  };

  return (
    <main className='relative flex gap-3 items-center justify-center h-screen overflow-hidden'>
      <section className='p-5 py-5 flex flex-col gap-7 items-center justify-center rounded-2xl backdrop-blur-xs'>
        <h1 className='font-semibold text-4xl text-slate-700 font-[family-name:var(--font-header)]'>
          Coffee Buddy
        </h1>
        <form action={handleLoginClick}>
          <button
            className='border-2 border-slate-200 rounded-full py-2 px-4 hover:bg-slate-100 active:bg-slate-100 bg-(--background) transition cursor-pointer'
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
