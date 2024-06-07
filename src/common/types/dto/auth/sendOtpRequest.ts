export class SendOtpRequest {
  email: string

  token: string

  constructor(arg: { email: string; token: string }) {
    this.email = arg.email
    this.token = arg.token
  }
}
