import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { LoadingState } from '@/core/application/common/atoms/loadingState'
import { FullPageLoading } from '@/infrastructure/common/components/Controls/loading'

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
  const loadingState = useRecoilValue(LoadingState)
  const unAuthorizedRoles = roles && session && !roles?.includes(session?.user.role[0])
  useEffect(() => {
    // check if the session is loading or the router is not ready
    if (loading || !router.isReady) return
    // if the user is not authorized, redirect to the login page
    if (unAuthorized) {
      router.replace('/auth/login')
    }
    if (unAuthorizedRoles) {
      router.replace('/403')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, unAuthorized, sessionStatus, router, authorized, roles])

  // if the user refresh the page or somehow navigated to the protected page
  if (loading) {
    return <FullPageLoading isLoading />
  }

  // if the user is authorized, render the page
  // otherwise, render nothing while the router redirects him to the login page
  return authorized && !unAuthorizedRoles ? (
    <>
      {children}
      <FullPageLoading isLoading={loadingState.isLoading} />
    </>
  ) : (
    <></>
  )
}
