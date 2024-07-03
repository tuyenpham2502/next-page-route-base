import Image from 'next/image'
import Link from 'next/link'

import SEOHead from '@/infrastructure/common/components/Seo'
import TransitionCommon from '@/infrastructure/common/components/Transition'
import notFound from 'assets/images/404.svg'

const NotFoundPage = () => {
  return (
    <>
      <SEOHead title='404 Not Found' />
      <TransitionCommon>
        <div className='bg-white h-screen flex flex-col justify-center items-center gap-14'>
          <Image src={notFound} alt='Not found' priority />
          <div className='max-w-96 text-center flex flex-col gap-3 items-center'>
            <h1 className='text-5xl text-[#1A1C16]'>Page Not Found</h1>
            <p className='text-[#44483D]'>
              The page you are looking for might have been removed had its name changed or is
              temporarily unavailable.
            </p>
            <Link href='/' className='bg-[#8AC732] text-white py-2 px-4 rounded-full max-w-36'>
              Home Page
            </Link>
          </div>
        </div>
      </TransitionCommon>
    </>
  )
}

export default NotFoundPage
