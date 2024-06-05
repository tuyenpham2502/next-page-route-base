import '@/styles/globals.css'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
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
        <ConfigProvider>
          <StyleProvider hashPriority='high'>
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
          </StyleProvider>
        </ConfigProvider>
      </RecoilRoot>
    </>
  )
}

export default App
