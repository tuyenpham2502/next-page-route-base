import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const useAuth = (redirectTo = '/') => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (session) {
      router.push(redirectTo)
    }
  }, [session, status, router, redirectTo])

  return { session, status }
}

export default useAuth
