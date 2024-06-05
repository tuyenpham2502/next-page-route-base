import Link from 'next/link'

import SEOHead from '@/components/Seo/index'
import TransitionCommon from '@/components/Transition'

const Home = () => {
  return (
    <>
      <SEOHead title='Home' />
      <TransitionCommon>
        <div className='bg-white h-screen'>
          <h1 className='text-black'>Home</h1>
          <Link className='text-black' href='auth/login'>
            Login
          </Link>
        </div>
      </TransitionCommon>
    </>
  )
}
Home.requireAuth = true
export default Home
