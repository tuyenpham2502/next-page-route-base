import Cookies from 'js-cookie'

import { ICookiesStorageService } from '@/core/application/interfaces/services/cookiesStorage.interface'

export default class CookiesStorageService implements ICookiesStorageService {
  readStorage(key: string) {
    if (typeof window !== 'undefined') {
      const value = Cookies.get(key)
      return value
    }

    return null
  }

  setStorage(key: string, storage: any) {
    if (storage) {
      Cookies.set(key, storage)
    }
  }

  removeStorage(key: string) {
    Cookies.remove(key)
  }
}
