import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ButtonCommon } from '@/components/Button/button-common'
import SEOHead from '@/components/Seo/index'
import TransitionCommon from '@/components/Transition'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['home'])),
  },
})

const Home = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('home')
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
                signOut({
                  redirect: false,
                  callbackUrl: '/',
                })
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
Home.requireRoles = ['admin']
export default Home
