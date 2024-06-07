import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      email: string
      access_token: string
      refresh_token: string
      lf_id: string | null
      role: Array<string>
    } & DefaultSession['user']
  }
}
