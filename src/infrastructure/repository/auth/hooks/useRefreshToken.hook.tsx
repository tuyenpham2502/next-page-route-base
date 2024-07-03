/* eslint-disable react-hooks/rules-of-hooks */
import { getSession } from 'next-auth/react'

import { EndPoint } from '@/core/application/common/EndPoint'
import { RefreshTokenRequest } from '@/core/application/dto/auth/request/refreshTokenRequest'
import FailureResponse from '@/core/application/dto/common/failureResponse'
import InvalidModelStateResponse from '@/core/application/dto/common/invalidModelStateResponse'
import SuccessResponse from '@/core/application/dto/common/successResponse'
import { CodesMap } from '@/core/domain/enums/CodeMap'
import { notifyError } from '@/infrastructure/common/components/Toast/toastMessage'
import { AuthManagementServices } from '@/infrastructure/repository/auth/services/AuthManagement.services'
import CookiesStorageService from '@/infrastructure/services/cookiesStorage.service'
import LoggerService from '@/infrastructure/services/logger.service'
import Constants from '@/infrastructure/utils/constants'
import { refactorFormDataCommon } from '@/infrastructure/utils/helper'

export const refreshTokenAsync = async (params: RefreshTokenRequest) => {
  const session = await getSession()
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
