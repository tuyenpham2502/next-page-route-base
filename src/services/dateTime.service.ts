import moment from 'moment'

import { IDateTimeService } from '@/common/interfaces/services/dateTime.interface'
import Constants from 'src/utils/constants'

export default class DateTimeService implements IDateTimeService {
  currentDateTime(format: string = Constants.DateTime.DateTimeFormat) {
    return moment(new Date()).format(format)
  }

  formatDateTime(date: string, format: string = Constants.DateTime.DateFormat) {
    return moment(new Date(date)).format(format)
  }
}
