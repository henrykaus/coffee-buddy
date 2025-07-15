import clsx from 'clsx';
import {CircleIcon} from '@/app/ui/icons';

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_3s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function SkeletonRow(props: {
  width: string;
  height: string;
  color?: string;
}) {
  const {width, height, color = 'bg-slate-200'} = props;

  return <div className={`${color} ${width} ${height} rounded-md`} />;
}

export function SkeletonListItem(props: {
  width: string;
  height: string;
  color?: string;
}) {
  const {width, height, color = 'bg-slate-200'} = props;

  return (
    <div className='ml-7 relative'>
      <CircleIcon
        height={8}
        className='absolute -start-[1.65rem] top-2 text-slate-500/90'
        fill='currentColor'
      />
      <div className={`${color} ${width} ${height} rounded-md`} />
    </div>
  );
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

export function PatchNoteSkeleton() {
  return (
    <div
      className={clsx(shimmer, 'relative flex flex-col gap-y-3 px-6 sm:px-20')}
    >
      <div className='bg-slate-50 flex flex-col gap-y-3 p-6 sm:px-20 rounded-lg'>
        <div className='flex justify-between items-center mb-3'>
          <SkeletonRow width='w-45' height='h-6' />
          <SkeletonRow width='w-18' height='h-5' />
        </div>
        <SkeletonRow width='w-30' height='h-5' />
        <SkeletonListItem width='w-[12rem]' height='h-5' />
        <SkeletonListItem width='w-[15rem]' height='h-5' />
        <SkeletonRow width='w-45' height='h-5' />
        <SkeletonListItem width='w-[13rem]' height='h-5' />
      </div>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className='flex flex-col gap-6 mt-4'>
      <div
        className={clsx(
          shimmer,
          'relative flex flex-col gap-y-3 px-6 sm:px-20',
        )}
      >
        <SkeletonRow color='bg-slate-100' width='w-30' height='h-6' />
      </div>
      <PatchNoteSkeleton />
      <PatchNoteSkeleton />
    </div>
  );
}
