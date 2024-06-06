import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

import { ProtectedLayout } from '@/components/Layout/ProtectedLayout'
import RecoilOutsideComponent from '@/libs/recoil-outside/recoil.service'

type AppPropsWithAuth = AppProps<{ session: Session }> & {
  Component: {
    requireAuth?: boolean
  }
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithAuth) => {
  return (
    <>
      <RecoilRoot>
        <RecoilOutsideComponent />
        <SessionProvider session={session}>
          {Component.requireAuth ? (
            <ProtectedLayout>
              <Component {...pageProps} />
            </ProtectedLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
      </RecoilRoot>
    </>
  )
}

export default App
