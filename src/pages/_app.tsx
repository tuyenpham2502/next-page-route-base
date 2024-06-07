/* eslint-disable react/function-component-definition */
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
// import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'

import { ProtectedLayout } from '@/components/Layout/ProtectedLayout'
import RecoilOutsideComponent from '@/libs/recoil-outside/recoil.service'

type AppPropsWithAuth = AppProps<{ session: Session }> & {
  Component: {
    requireAuth?: boolean
    requireRoles?: Array<string>
  }
}

function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithAuth) {
  return (
    <>
      <RecoilRoot>
        <RecoilOutsideComponent />
        {/* <ToastContainer style={{ width: '500px' }} /> */}
        <SessionProvider session={session}>
          {Component.requireAuth ? (
            <ProtectedLayout roles={Component.requireRoles}>
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

export default appWithTranslation(App)
