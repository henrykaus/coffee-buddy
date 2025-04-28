import {redirect} from 'next/navigation';
import {Route} from '@/app/lib/enums';
import {auth} from '@/auth';

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect(`/${Route.Home}`);
  } else {
    redirect(`/${Route.Login}`);
  }
}
