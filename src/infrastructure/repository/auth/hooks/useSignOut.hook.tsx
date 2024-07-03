import { EndPoint } from '@/core/application/common/EndPoint'
import { SignOutRequest } from '@/core/application/dto/auth/request/signOutRequest'
import { useCancelToken } from '@/infrastructure/common/libs/axios/useCancelToken'
import { useApiRequestHook } from '@/infrastructure/common/libs/hooks/useApiRequest.hook'
import { AuthManagementServices } from '@/infrastructure/repository/auth/services/AuthManagement.services'
import { refactorFormDataCommon } from '@/infrastructure/utils/helper'

export const useSignOutHook = () => {
  const [requestCommon] = useApiRequestHook()
  const { newCancelToken } = useCancelToken()
  async function request(
    params: SignOutRequest,
    onSuccess: (res: any) => void,
    onError: () => void,
    isLoading: boolean = true
  ) {
    await requestCommon(
      newCancelToken(),
      new AuthManagementServices().signOutAsync,
      EndPoint.Auth.SignOut,
      refactorFormDataCommon(params),
      onSuccess,
      onError,
      isLoading
    )
  }
  return [request]
}
