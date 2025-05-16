import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import {addUser} from '@/app/server/users/actions';

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [Google],
  callbacks: {
    signIn: async ({user, account, profile, email, credentials}) => {
      const userEmail = user?.email;

      if (userEmail) {
        await addUser(userEmail);
        return true;
      }

      return false;
    },
  },
});
