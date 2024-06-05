/* eslint-disable no-console */
import { ILoggerService } from '@/common/interfaces/services/logger.interface'
import DateTimeProvider from 'src/services/dateTime.service'

export default class LoggerService implements ILoggerService {
  private readonly enabledLogger: boolean = process.env.REACT_APP_ENABLE_LOGGER === 'true'

  debug(...params: any[]) {
    if (this.enabledLogger)
      console.debug(`[DEBUG] - ${new DateTimeProvider().currentDateTime()}: `, ...params)
  }

  error(...params: any[]) {
    if (this.enabledLogger)
      console.error(`[ERROR] - ${new DateTimeProvider().currentDateTime()}: `, ...params)
  }

  fatal(...params: any[]) {
    if (this.enabledLogger)
      console.error(`[ERROR] - ${new DateTimeProvider().currentDateTime()}: `, ...params)
  }

  info(...params: any[]) {
    if (this.enabledLogger)
      console.info(`[INFO] - ${new DateTimeProvider().currentDateTime()}: `, ...params)
  }

  trace(...params: any[]) {
    if (this.enabledLogger)
      console.trace(`[TRACE] - ${new DateTimeProvider().currentDateTime()}: `, ...params)
  }

  warn(...params: any[]) {
    if (this.enabledLogger)
      console.warn(`[WARN] - ${new DateTimeProvider().currentDateTime()}: `, ...params)
  }
}
