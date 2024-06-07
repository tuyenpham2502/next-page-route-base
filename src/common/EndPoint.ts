export class EndPoint {
  static Auth = class {
    static SignIn = 'public/user/login'

    static RefreshToken = 'auth/refresh-token'

    static SendOtp = 'private/sms/sendOTP'

    static SignOut = 'private/user/logout'
  }
}
