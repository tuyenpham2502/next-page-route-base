import { EndPoint } from '@/core/application/common/EndPoint'
import { SignInRequest } from '@/core/application/dto/auth/request/signInRequest'
import FailureResponse from '@/core/application/dto/common/failureResponse'
import InvalidModelStateResponse from '@/core/application/dto/common/invalidModelStateResponse'
import SuccessResponse from '@/core/application/dto/common/successResponse'
import { CodesMap } from '@/core/domain/enums/CodeMap'
import { notifyError } from '@/infrastructure/common/components/Toast/toastMessage'
import { useCancelToken } from '@/infrastructure/common/libs/axios/useCancelToken'
import { AuthManagementServices } from '@/infrastructure/repository/auth/services/AuthManagement.services'
import LoggerService from '@/infrastructure/services/logger.service'
import { refactorFormDataCommon } from '@/infrastructure/utils/helper'

export const useLoginHook = () => {
  const { newCancelToken } = useCancelToken()
  async function request(
    params: SignInRequest,
    setLoading: (loading: boolean) => void,
    onSuccess: (res: any) => void,
    onError: () => void
  ) {
    const loggerService = new LoggerService()
    setLoading(true)
    const response = await new AuthManagementServices().signInAsync(
      EndPoint.Auth.SignIn,
      refactorFormDataCommon(params),
      newCancelToken()
    )
    if ((response as FailureResponse)?.code !== CodesMap.CANCEL_TOKEN) {
      switch ((await response).status) {
        case 200: {
          const res = (response as SuccessResponse).data
          if (res?.success) {
            if (onSuccess) {
              onSuccess(res)
            }
          } else {
            onError()
            notifyError(
              '',
              (res.errors?.length && res.errors[0]?.error) ||
                'An error occurred. Please contact the administrator'
            )
          }

          return response
        }
        case 202: {
          notifyError(
            '',
            (response as FailureResponse).message ||
              'An error occurred. Please contact the administrator'
          )
          onError()
          break
        }
        case 400: {
          notifyError(
            '',
            (response as InvalidModelStateResponse).message ||
              'An error occurred. Please contact the administrator'
          )
          loggerService.info(response as InvalidModelStateResponse)
          onError()
          break
        }
        default: {
          notifyError('', 'An error occurred. Please contact the administrator')
          onError()
        }
      }
      setLoading(false)
      return response
    }
    return response
  }
  return [request]
}
