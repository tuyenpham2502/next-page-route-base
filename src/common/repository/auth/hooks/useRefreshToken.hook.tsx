/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from 'next-auth/react'

import { CodesMap } from '@/common/enums/CodeMap'
import CookiesStorageService from '@/common/services/cookiesStorage.service'
import LoggerService from '@/common/services/logger.service'
import { RefreshTokenRequest } from '@/common/types/dto/auth/refreshTokenRequest'
import FailureResponse from '@/common/types/dto/common/failureResponse'
import InvalidModelStateResponse from '@/common/types/dto/common/invalidModelStateResponse'
import SuccessResponse from '@/common/types/dto/common/successResponse'
import { notifyError } from '@/components/Toast/toastMessage'
import Constants from '@/utils/constants'
import { refactorFormDataCommon } from '@/utils/helper'
import { EndPoint } from 'src/common/EndPoint'
import { AuthManagementServices } from 'src/common/repository/auth/services/AuthManagement.services'

export const refreshTokenAsync = async (params: RefreshTokenRequest) => {
  const { data: session } = useSession()
  const loggerService = new LoggerService()
  const cookiesStorageService = new CookiesStorageService()
  const response = await new AuthManagementServices().refreshTokenAsync(
    EndPoint.Auth.RefreshToken, // enpoint
    refactorFormDataCommon(params)
  )
  let result: object = {}
  if ((response as FailureResponse)?.code !== CodesMap.CANCEL_TOKEN) {
    switch (response.status) {
      case 200: {
        const res = (response as SuccessResponse).data
        if (res?.success) {
          cookiesStorageService.setStorage(Constants.API_TOKEN_STORAGE, res.access_token)
          if (session) {
            session.user.access_token = res.access_token
          }
          result = res || {}
        } else {
          cookiesStorageService.removeStorage(Constants.API_TOKEN_STORAGE)
          //   resetSocket()
          window.location.href = '/'
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
        break
      }
      case 400: {
        notifyError(
          '',
          (response as InvalidModelStateResponse).message ||
            'An error occurred. Please contact the administrator'
        )
        loggerService.info(response as InvalidModelStateResponse)
        break
      }
      default: {
        notifyError('', 'An error occurred. Please contact the administrator')
      }
    }
    return result
  }
  return response
}
