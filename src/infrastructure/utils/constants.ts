import { ToastPosition } from 'react-toastify'

export default class Constants {
  static API_TOKEN_STORAGE = 'API_TOKEN'

  static DateTime = class {
    static DateTimeFormat = 'DD-MM-yyyy HH:mm:ss.SSSS'

    static DateFormat = 'DD-MM-yyyy'
  }

  static LocalStorage = class {
    static LeftMenu: string = 'LEFT_MENU'

    static ApiToken: string = 'API_TOKEN'
  }

  static ToastMessage = class {
    static Notification = class {
      static Position: ToastPosition = 'top-right'

      static Duration: number = 6000
    }

    static Confirmation = class {}
  }
}
