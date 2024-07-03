/* eslint-disable no-await-in-loop */
import { CancelToken } from 'axios'

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

  const requestQueue: (() => Promise<any>)[] = []
  let isProcessing = false

  async function processQueue() {
    if (isProcessing) return
    isProcessing = true

    while (requestQueue.length > 0) {
      const nextRequest = requestQueue.shift()
      if (nextRequest) await nextRequest()
    }
    await setRecoilStateAsync(LoadingState, { isLoading: false, uri: '' })
    isProcessing = false
  }
  async function queueRequest(
    newCancelToken: CancelToken,
    serviceInstance: any,
    endpoint: string,
    params: any,
    onSuccess: (res: any) => void,
    onError: () => void,
    isLoading: boolean = true
  ) {
    const queuedRequest = async () => {
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

      processQueue()
    }

    requestQueue.push(queuedRequest)
    if (isLoading) {
      await setRecoilStateAsync(LoadingState, { isLoading: true, uri: endpoint })
    }
    processQueue()
  }

  return [queueRequest]
}
