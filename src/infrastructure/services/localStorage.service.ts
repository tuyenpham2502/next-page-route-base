import { ILocalStorageService } from '@/core/application/interfaces/services/localStorage.interface'

export default class LocalStorageService implements ILocalStorageService {
  readStorage(key: string): any {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem(key)
      if (storage && storage.length) {
        return JSON.parse(storage)
      }
    }

    return null
  }

  setStorage(key: string, storage: any) {
    if (storage) {
      localStorage.setItem(key, JSON.stringify(storage))
    }
  }

  removeStorage(key: string) {
    localStorage.removeItem(key)
  }
}
