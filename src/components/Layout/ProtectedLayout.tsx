import { Spin } from 'antd'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

type Props = {
  children: React.ReactElement
  roles?: Array<string>
}

export const ProtectedLayout = ({ children, roles }: Props): JSX.Element => {
  const router = useRouter()
  const { status: sessionStatus, data: session } = useSession()
  const authorized = sessionStatus === 'authenticated'
  const unAuthorized = sessionStatus === 'unauthenticated'
  const loading = sessionStatus === 'loading'
  useEffect(() => {
    // check if the session is loading or the router is not ready
    if (loading || !router.isReady) return
    // if the user is not authorized, redirect to the login page
    if (unAuthorized) {
      router.replace('/auth/login')
    }
    if (roles && session && !roles.includes(session.user.role[0])) {
      router.replace('403')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, unAuthorized, sessionStatus, router, authorized, roles])

  // if the user refresh the page or somehow navigated to the protected page
  if (loading) {
    return (
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Spin size='large' />
      </div>
    )
  }

  // if the user is authorized, render the page
  // otherwise, render nothing while the router redirects him to the login page
  return authorized ? <>{children}</> : <></>
}
