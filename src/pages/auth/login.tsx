import { GetStaticProps, InferGetStaticPropsType } from 'next'
// import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'

import { ButtonCommon } from '@/components/Button/button-common'
import { FormCommon } from '@/components/Form/form-common'
import { InputOtpCommon } from '@/components/Input/input-otp-common'
import { InputPasswordCommon } from '@/components/Input/input-password-common'
import { InputTextCommon } from '@/components/Input/input-text-common'
import SEOHead from '@/components/Seo'
import { notifySuccess } from '@/components/Toast/toastMessage'
import useAuth from '@/hooks/useAuth'
import { useStateDataForm } from '@/hooks/useStateDataForm'
import loginImage from 'assets/images/loginImage.svg'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['login'])),
  },
})

const LoginPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  useAuth('/')
  const { t } = useTranslation('login')
  // const router = useRouter()
  const [data, setData] = useStateDataForm({})
  const [isVerify, setIsVerify] = useState(false)
  const onSubmit = async () => {
    try {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      if (response && response.ok) {
        notifySuccess('', 'Login success')
        setIsVerify(true)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Login error: ', error)
    }
  }

  return (
    <>
      <SEOHead title={t('Sign In')} />
      <div className='flex h-screen bg-template-orange-FEDCC5 justify-center'>
        <div className='md:w-1/2 flex justify-center items-center'>
          <div className='flex flex-col justify-center bg-white bg-opacity-30 h-[700px] w-[600px] rounded-[40px] bg-login-bg backdrop-blur-sm bg-white/30'>
            {!isVerify ? (
              <FormCommon className='p-24' name='login-form' onFinish={onSubmit}>
                <p className='font-bold text-4xl mb-4'>{t('Sign In')}</p>
                <InputTextCommon
                  name='email'
                  label='Email'
                  placeholder='Email'
                  autoFocus
                  autoComplete='email'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                  ]}
                  attribute='email'
                  setData={setData}
                  dataAtrribute='email'
                />
                <InputPasswordCommon
                  name='password'
                  label={t('Pass')}
                  placeholder='Password'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  attribute='password'
                  setData={setData}
                  dataAtrribute='password'
                />
                <div className='mt-6'>
                  <ButtonCommon bg='#F25019' minheight='50px' type='primary' htmlType='submit'>
                    {t('Sign In')}
                  </ButtonCommon>
                </div>
              </FormCommon>
            ) : (
              <FormCommon className='p-24' name='login-form' onFinish={onSubmit}>
                <p className='font-bold text-4xl mb-4'>{t('Sign In')}</p>
                <InputOtpCommon
                  name='otp'
                  label='OTP'
                  placeholder='OTP'
                  autoFocus
                  rules={[
                    {
                      required: true,
                      message: 'Please input your OTP!',
                    },
                  ]}
                  attribute='otp'
                  setData={setData}
                  dataAtrribute='otp'
                  length={6}
                />
              </FormCommon>
            )}
          </div>
        </div>
        <div className='hidden md:flex bg-template-orange-FEDCC5 w-1/2 h-full items-center justify-center '>
          <div>
            <img src={loginImage.src} alt='banner' className='' />
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
