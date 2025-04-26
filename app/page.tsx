import {redirect} from 'next/navigation';
import {Route} from '@/app/lib/enums';

export default async function Home() {
  redirect(`/${Route.Login}`);
}
