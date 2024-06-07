import { EndPoint } from '@/common/EndPoint'
import { CodesMap } from '@/common/enums/CodeMap'
import { AuthManagementServices } from '@/common/repository/auth/services/AuthManagement.services'
import LoggerService from '@/common/services/logger.service'
import { SignOutRequest } from '@/common/types/dto/auth/signOutRequest'
import FailureResponse from '@/common/types/dto/common/failureResponse'
import InvalidModelStateResponse from '@/common/types/dto/common/invalidModelStateResponse'
import SuccessResponse from '@/common/types/dto/common/successResponse'
import { notifyError } from '@/components/Toast/toastMessage'
import { useCancelToken } from '@/libs/axios/useCancelToken'
import { refactorFormDataCommon } from '@/utils/helper'

export const useSignOutHook = () => {
  const { newCancelToken } = useCancelToken()
  async function request(
    params: SignOutRequest,
    setLoading: (loading: boolean) => void,
    onSuccess: (res: any) => void,
    onError: () => void
  ) {
    const loggerService = new LoggerService()
    setLoading(true)
    const response = await new AuthManagementServices().signOutAsync(
      EndPoint.Auth.SignOut,
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
