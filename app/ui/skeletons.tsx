import clsx from 'clsx';

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_3s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function SkeletonRow(props: {width: string; height: string}) {
  const {width, height} = props;

  return <div className={`bg-slate-200 ${width} ${height} rounded-md`} />;
}

export function SkeletonAvatar(props: {diameter: number}) {
  const {diameter} = props;

  return (
    <div className={`bg-slate-200 w-${diameter} h-${diameter} rounded-full`} />
  );
}

export function CardSkeleton() {
  return (
    <div className='border-2 border-slate-200 pb-2 pt-3 px-3 rounded-md flex flex-col gap-3 bg-(--background)'>
      <div className='flex justify-between'>
        <SkeletonRow width='w-40' height='h-5' />
        <SkeletonRow width='w-12' height='h-5' />
      </div>
      <SkeletonRow width='w-30' height='h-5' />
      <div className='flex justify-between'>
        <SkeletonRow width='w-35' height='h-5' />
        <SkeletonRow width='w-18' height='h-5' />
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
      <div className='flex justify-between border-2 border-slate-200 rounded-lg transition py-2.5 px-3 w-full bg-(--background)'>
        <SkeletonRow width='w-30' height='h-6' />
        <SkeletonRow width='w-7' height='h-6' />
      </div>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div
      className={clsx(
        shimmer,
        'relative flex justify-between gap-y-3 px-6 sm:px-20 py-8',
      )}
    >
      <SkeletonRow width='w-[13rem]' height='h-11' />
      <SkeletonAvatar diameter={11} />
    </div>
  );
}

export function FullDashboardSkeleton() {
  return (
    <>
      <HeaderSkeleton />
      <DashboardSkeleton />
    </>
  );
}
