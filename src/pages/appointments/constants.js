import moment from "moment";
import KeyMirror from "keymirror";
import {getDefaultDates} from '../../services/DateHelper';

const { start_date, end_date } = getDefaultDates();
const APPOINTMENTS_ACTIONS = KeyMirror({
  GET_APPOINTMENTS: null,
  GET_APPOINTMENTS_SUCCESS: null,
  GET_APPOINTMENTS_FAIL: null,
  CREATE_APPOINTMENT: null,
  CREATE_APPOINTMENT_SUCCESS: null,
  CREATE_APPOINTMENT_FAIL: null
})
const INITIAL_STATE = {
  start_date,
  end_date,
  appointments: [],
  error: null,
  isLoading: false
}
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MONTH_DAYS = month => {
  const monthIndex = month - 1 // 0..11 instead of 1..12
  const date = moment().month(monthIndex).date(1)
  const result = []
  while (date.month() === monthIndex) {
    result.push({
      day: date.date(),
      weekDay: moment().date(date.date()).format('ddd'),
      isPast: date.month() < moment().month() || (date.month() <= moment().month() && date.date() < moment().date()),
    })
    date.date(date.date() + 1)
  }
  return result
}

export {
  MONTHS,
  MONTH_DAYS,
  APPOINTMENTS_ACTIONS,
  INITIAL_STATE,
}
