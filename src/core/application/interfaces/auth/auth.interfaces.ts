import { CancelToken } from 'axios'

import { RefreshTokenRequest } from '@/core/application/dto/auth/request/refreshTokenRequest'
import { SendOtpRequest } from '@/core/application/dto/auth/request/sendOtpRequest'
import { SignInRequest } from '@/core/application/dto/auth/request/signInRequest'
import { SignOutRequest } from '@/core/application/dto/auth/request/signOutRequest'
import { RequestResponse } from '@/core/application/dto/common/requestResponse'

export interface IAuthManagementService {
  signInAsync(
    endPoint: string,
    params: SignInRequest,
    cancellationToken: CancelToken
  ): Promise<RequestResponse>

  refreshTokenAsync(
    endPoint: string,
    params: RefreshTokenRequest,
    cancellationToken: CancelToken
  ): Promise<RequestResponse>

  senOtpAsync(
    endPoint: string,
    params: SendOtpRequest,
    cancellationToken: CancelToken
  ): Promise<RequestResponse>

  signOutAsync(
    endPoint: string,
    params: SignOutRequest,
    cancellationToken: CancelToken
  ): Promise<RequestResponse>
}
