'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { ButtonCommon } from '@/components/Button/button-common'
import { FormCommon } from '@/components/Form/form-common'
import { InputPasswordCommon } from '@/components/Input/input-password-common'
import { InputTextCommon } from '@/components/Input/input-text-common'
import SEOHead from '@/components/Seo'
import { useStateDataForm } from '@/hooks/useStateDataForm'
import loginImage from 'assets/images/loginImage.svg'

const LoginPage = () => {
  const router = useRouter()
  const [data, setData] = useStateDataForm({})
  const [, setLoading] = useState(false)
  // const signInAsync = async () => {
  //   const params = new SignInRequest({
  //     email: data.email,
  //     password: data.password,
  //   })
  //   await signInRequest(
  //     params,
  //     () => setLoading(true),
  //     () => {
  //       router.push('/')
  //       cookiesService.setStorage('token', 'token')
  //     },
  //     () => setLoading(false)
  //   )
  // }

  const onSubmit = async () => {
    try {
      setLoading(true)
      const response = await signIn('credentials', {
        username: data.email,
        password: data.password,
        redirect: false,
      })

      if (response && response.ok) {
        setTimeout(() => {
          router.replace('/')
          setLoading(false)
        }, 1500)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Login error: ', error)
      setLoading(false)
    }
  }

  return (
    <>
      <SEOHead title='Login' />
      <div className='flex h-screen bg-template-orange-FEDCC5 justify-center'>
        <div className='md:w-1/2 flex justify-center items-center'>
          <div className='flex flex-col justify-center bg-white bg-opacity-30 h-[700px] w-[600px] rounded-[40px] bg-login-bg backdrop-blur-sm bg-white/30'>
            <FormCommon className='p-24' name='login-form' onFinish={onSubmit}>
              <p className='font-bold text-4xl mb-4'>Login</p>
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
                label='Password'
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
                  Sign in
                </ButtonCommon>
              </div>
            </FormCommon>
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
