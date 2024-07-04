import { useRecoilValue } from 'recoil'

import { LoadingState } from '@/core/application/common/atoms/loadingState'
import { FullPageLoading } from '@/infrastructure/common/components/Controls/loading'

const MainLayout: any = ({ children }: any) => {
  const loadingState = useRecoilValue(LoadingState)
  return (
    <div className='flex flex-col min-h-screen'>
      {/* <Header /> */}
      <main className='flex-1'>{children}</main>
      {/* <Footer /> */}
      <FullPageLoading isLoading={loadingState.isLoading} />
    </div>
  )
}

export default MainLayout
