import { EndPoint } from '@/core/application/common/EndPoint'
import { SignInRequest } from '@/core/application/dto/auth/request/signInRequest'
import { useCancelToken } from '@/infrastructure/common/libs/axios/useCancelToken'
import { useApiRequestHook } from '@/infrastructure/common/libs/hooks/useApiRequest.hook'
import { AuthManagementServices } from '@/infrastructure/repository/auth/services/AuthManagement.services'
import { refactorFormDataCommon } from '@/infrastructure/utils/helper'

export const useLoginHook = () => {
  const [requestCommon] = useApiRequestHook()
  const { newCancelToken } = useCancelToken()
  async function request(
    params: SignInRequest,
    onSuccess: (res: any) => void,
    onError: () => void,
    isLoading: boolean = true
  ) {
    await requestCommon(
      newCancelToken(),
      new AuthManagementServices().signInAsync,
      EndPoint.Auth.SignIn,
      refactorFormDataCommon(params),
      onSuccess,
      onError,
      isLoading
    )
  }
  return [request]
}
