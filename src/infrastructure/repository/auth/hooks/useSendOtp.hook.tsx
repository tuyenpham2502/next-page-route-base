import { Dispatch, SetStateAction } from 'react'

import { EndPoint } from '@/core/application/common/EndPoint'
import { SendOtpRequest } from '@/core/application/dto/auth/request/sendOtpRequest'
import { useCancelToken } from '@/infrastructure/common/libs/axios/useCancelToken'
import { useApiRequestHook } from '@/infrastructure/common/libs/hooks/useApiRequest.hook'
import { AuthManagementServices } from '@/infrastructure/repository/auth/services/AuthManagement.services'

export const useSendOtpHook = () => {
  const [requestCommon] = useApiRequestHook()
  const { newCancelToken } = useCancelToken()
  async function request(
    params: SendOtpRequest,
    onSuccess: (res: any) => void,
    onError: () => void,
    setLoading?: Dispatch<SetStateAction<boolean>>
  ) {
    await requestCommon(
      newCancelToken(),
      new AuthManagementServices().senOtpAsync,
      EndPoint.Auth.SendOtp,
      params,
      onSuccess,
      onError,
      setLoading
    )
  }
  return [request]
}
