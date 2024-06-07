import { CancelToken } from 'axios'

import { RefreshTokenRequest } from '@/common/types/dto/auth/refreshTokenRequest'
import { SendOtpRequest } from '@/common/types/dto/auth/sendOtpRequest'
import { SignInRequest } from '@/common/types/dto/auth/signInRequest'
import { SignOutRequest } from '@/common/types/dto/auth/signOutRequest'
import { RequestResponse } from '@/common/types/dto/common/requestResponse'

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
