import { CancelToken } from 'axios'

import NetworkException from '@/core/application/common/exceptions/networkException'
import { RefreshTokenRequest } from '@/core/application/dto/auth/request/refreshTokenRequest'
import { SendOtpRequest } from '@/core/application/dto/auth/request/sendOtpRequest'
import { SignInRequest } from '@/core/application/dto/auth/request/signInRequest'
import { SignOutRequest } from '@/core/application/dto/auth/request/signOutRequest'
import FailureResponse from '@/core/application/dto/common/failureResponse'
import InvalidModelStateResponse from '@/core/application/dto/common/invalidModelStateResponse'
import { RequestResponse } from '@/core/application/dto/common/requestResponse'
import SuccessResponse from '@/core/application/dto/common/successResponse'
import { IAuthManagementService } from '@/core/application/interfaces/auth/auth.interfaces'
import LoggerService from '@/infrastructure/services/logger.service'
import RequestService from '@/infrastructure/services/request.service'

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

  public async senOtpAsync(
    endPoint: string,
    params: SendOtpRequest,
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

  public async signOutAsync(
    endPoint: string,
    params: SignOutRequest,
    cancellationToken: CancelToken
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
