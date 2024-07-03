import Image from 'next/image'
import Link from 'next/link'

import notPermission from 'assets/images/403.svg'

import SEOHead from '@/components/Seo'
import TransitionCommon from '@/components/Transition'

const NonPermissionPage = () => {
  return (
    <>
      <SEOHead title='Error Forbidden' />
      <TransitionCommon>
        <div className='bg-white h-screen flex flex-row justify-center items-center gap-14'>
          <div className='max-w-[400px] text-center flex flex-col gap-3 items-center'>
            <h1 className='text-5xl text-[#1A1C16]'>Permission denied</h1>
            <p className='text-[#44483D]'>You don&apos;t have permission to access this page.</p>
            <Link href='/' className='bg-[#8AC732] text-white py-2 px-4 rounded-full max-w-36'>
              Home Page
            </Link>
          </div>
          <Image src={notPermission} alt='Not found' priority />
        </div>
      </TransitionCommon>
    </>
  )
}

export default NonPermissionPage
