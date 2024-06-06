import { CancelToken } from 'axios'

import NetworkException from '@/common/exceptions/networkException'
import { IAuthManagementService } from '@/common/interfaces/auth/auth.interfaces'
import LoggerService from '@/common/services/logger.service'
import RequestService from '@/common/services/request.service'
import { RefreshTokenRequest } from '@/common/types/dto/auth/refreshTokenRequest'
import { SignInRequest } from '@/common/types/dto/auth/signInRequest'
import FailureResponse from '@/common/types/dto/common/failureResponse'
import InvalidModelStateResponse from '@/common/types/dto/common/invalidModelStateResponse'
import { RequestResponse } from '@/common/types/dto/common/requestResponse'
import SuccessResponse from '@/common/types/dto/common/successResponse'

export class AuthManagementServices implements IAuthManagementService {
  loggerService = new LoggerService()

  public async signInAsync(
    endPoint: string,
    params: SignInRequest,
    cancellationToken?: CancelToken
  ): Promise<RequestResponse> {
    try {
      const result = await new RequestService().makePostRequestAsync(
        endPoint,
        params,
        cancellationToken
      )
      if (result.status === 200) {
        return result as SuccessResponse
      }
      if (result.status === 202) {
        return result as FailureResponse
      }
      if (result.status === 400) {
        return result as InvalidModelStateResponse
      }
      throw new NetworkException('No http status code handler')
    } catch (e) {
      this.loggerService.error(e)
      throw e
    }
  }

  public async refreshTokenAsync(
    endPoint: string,
    params: RefreshTokenRequest,
    cancellationToken?: CancelToken
  ): Promise<RequestResponse> {
    try {
      const result = await new RequestService().makePostRequestAsync(
        endPoint,
        params,
        cancellationToken
      )
      if (result.status === 200) {
        return result as SuccessResponse
      }
      if (result.status === 202) {
        return result as FailureResponse
      }
      if (result.status === 400) {
        return result as InvalidModelStateResponse
      }
      throw new NetworkException('No http status code handler')
    } catch (e) {
      this.loggerService.error(e)
      throw e
    }
  }
}
