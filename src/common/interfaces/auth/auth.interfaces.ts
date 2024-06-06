import { CancelToken } from 'axios'

import { RefreshTokenRequest } from '@/common/types/dto/auth/refreshTokenRequest'
import { SignInRequest } from '@/common/types/dto/auth/signInRequest'
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
}
