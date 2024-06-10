import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useSignOutHook } from '@/common/repository/auth/hooks/useSignOut.hook'
import { SignOutRequest } from '@/common/types/dto/auth/signOutRequest'
import { ButtonCommon } from '@/components/Button/button-common'
import SEOHead from '@/components/Seo/index'
import TransitionCommon from '@/components/Transition'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['home'])),
  },
})

const Home = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [signOutReq] = useSignOutHook()
  const { t } = useTranslation('home')
  const { data: session } = useSession()

  const signOutAsync = async () => {
    const signOutParams = new SignOutRequest({
      access_token: session?.user.access_token || '',
      refresh_token: session?.user.refresh_token || '',
    })
    await signOutReq(
      signOutParams,
      () => {},
      async () => {
        await signOut({
          redirect: false,
          callbackUrl: '/',
        })
      },
      () => {}
    )
  }
  return (
    <>
      <SEOHead title={t('Home')} />
      <TransitionCommon>
        <div className='bg-white h-screen'>
          <h1 className='text-black'>{t('Home')}</h1>
          <Link className='text-black' href='auth/login'>
            Login
          </Link>
          <div>
            <ButtonCommon
              onClick={() => {
                signOutAsync()
              }}
            >
              Logout
            </ButtonCommon>
          </div>
        </div>
      </TransitionCommon>
    </>
  )
}
Home.requireAuth = true
Home.requireRoles = ['user']
export default Home
