export class SignInRequest {
  email: string

  password: string

  constructor(arg: { email: string; password: string }) {
    this.email = arg.email
    this.password = arg.password
  }
}
