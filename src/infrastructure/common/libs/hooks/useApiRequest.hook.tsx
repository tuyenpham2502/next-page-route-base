/* eslint-disable no-await-in-loop */
import { CancelToken } from 'axios'
import { Dispatch, SetStateAction } from 'react'

import { LoadingState } from '@/core/application/common/atoms/loadingState'
import FailureResponse from '@/core/application/dto/common/failureResponse'
import InvalidModelStateResponse from '@/core/application/dto/common/invalidModelStateResponse'
import SuccessResponse from '@/core/application/dto/common/successResponse'
import { CodesMap } from '@/core/domain/enums/CodeMap'
import { notifyError } from '@/infrastructure/common/components/Toast/toastMessage'
import { setRecoilStateAsync } from '@/infrastructure/common/libs/recoil-outside/recoil.service'
import LoggerService from '@/infrastructure/services/logger.service'

export const useApiRequestHook = () => {
  const loggerService = new LoggerService()

  async function request(
    newCancelToken: CancelToken,
    serviceInstance: any,
    endpoint: string,
    params: any,
    onSuccess: (res: any) => void,
    onError: () => void,
    setLoading?: Dispatch<SetStateAction<boolean>>
  ) {
    if (setLoading) {
      setLoading(true)
    } else {
      await setRecoilStateAsync(LoadingState, { isLoading: true, uri: endpoint })
    }
    const response = await serviceInstance(endpoint, params, newCancelToken)

    if ((response as FailureResponse)?.code !== CodesMap.CANCEL_TOKEN) {
      switch (response.status) {
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
          break
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
    }
    if (setLoading) {
      setLoading(false)
    } else {
      await setRecoilStateAsync(LoadingState, { isLoading: false, uri: '' })
    }
  }

  return [request]
}
