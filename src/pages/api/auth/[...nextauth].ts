/* eslint-disable no-param-reassign */
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import LoggerService from '@/infrastructure/services/logger.service'

const loggerService = new LoggerService()
export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 24 * 60 * 60, // 1 day
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Please input your email' },
        otp: { label: 'OTP', type: 'text', placeholder: 'Please input your OTP' },
        token: { label: 'Token', type: 'text', placeholder: 'Please input your token' },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch('https://propero.nobisoft.vn/private/sms/verifyOTP', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            otp: credentials?.otp,
            token: credentials?.token,
          }),
        })
        const user = await res.json()
        // const user = {
        //   id: '1',
        //   email: credentials?.email,
        //   name: 'Quoc test',
        // }
        // If no error and we have user data, return it
        if (res.ok && user) {
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user
          }
        }
        // If you return null then an error will be displayed advising the user to check their details.
        return null
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID as string,
    //   clientSecret: process.env.FACEBOOK_SECRET as string,
    // }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID as string,
    //   clientSecret: process.env.TWITTER_SECRET as string,
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID as string,
    //   clientSecret: process.env.AUTH0_SECRET as string,
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
  ],
  theme: {
    colorScheme: 'light',
  },
  callbacks: {
    async jwt({ token, user }) {
      // eslint-disable-next-line no-console
      // Persist the OAuth access_token and or the user id to the token right after signin
      // if (account) {
      //   token.accessToken = account.access_token
      //   token.id = profile.id
      // }

      return { ...token, ...user }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken
      // session.user.id = token.id
      session.user = token.result as any
      session.user.role = ['admin']
      return session // The return type will match the one returned in `useSession()`
    },
  },
  pages: {
    signIn: '/auth/login', // custom login page
  },
  logger: {
    error(code, ...message) {
      loggerService.error(code, message)
    },
    warn(code, ...message) {
      loggerService.warn(code, message)
    },
    debug(code, ...message) {
      loggerService.debug(code, message)
    },
  },
}

export default NextAuth(authOptions)
