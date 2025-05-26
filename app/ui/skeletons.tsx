// Loading animation
import clsx from 'clsx';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={clsx(
        shimmer,
        'relative border-2 border-slate-200 pb-2 pt-3 px-3 rounded-md flex flex-col gap-3',
      )}
    >
      <div className='flex justify-between'>
        <div className='bg-slate-200 w-40 h-5 rounded-md' />
        <div className='bg-slate-200 w-12 h-5 rounded-md' />
      </div>
      <div className='bg-slate-200 w-30 h-5 rounded-md' />
      <div className='flex justify-between'>
        <div className='bg-slate-200 w-35 h-5 rounded-md' />
        <div className='bg-slate-200 w-18 h-5 rounded-md' />
      </div>
    </div>
  );
}

export function CardSkeletonList() {
  return (
    <div className='flex flex-col gap-y-3 px-6 sm:px-20'>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div
      className={clsx(shimmer, 'relative flex flex-col gap-y-3 px-6 sm:px-20')}
    >
      <div className='flex justify-between border-2 border-slate-200 rounded-lg transition py-2 px-3 w-full bg-(--background)'>
        <div className='bg-slate-200 w-30 h-6 rounded-md' />
        <div className='bg-slate-200 w-7 h-6 rounded-md' />
      </div>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
