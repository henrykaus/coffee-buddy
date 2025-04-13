import seedData from '@/app/server/seedData';
import Link from 'next/link';

export default async function Seed() {
  await seedData()

  return (
    <Link href="/home" className='p-4 rounded border-2'>Go Home</Link>
  );
}
