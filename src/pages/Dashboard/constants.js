import moment from "moment";
import KeyMirror from "keymirror";

const DASHBOARD_ACTIONS = KeyMirror({
  GET_RECEPTION_MEDICATIONS: null,
  GET_RECEPTION_MEDICATIONS_SUCCESS: null,
  GET_RECEPTION_MEDICATIONS_ERROR: null,
  GET_RECEPTION_MEDICATIONS_BY_USER: null,
  GET_RECEPTION_MEDICATIONS_BY_USER_SUCCESS: null,
  GET_RECEPTION_MEDICATIONS_BY_USER_ERROR: null,
});
const INITIAL_STATE = {
  start_date: moment().startOf('day'),
  end_date: moment().endOf('day'),
  selectedUser: '',
  receptionMedications: [],
  error: null,
};
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MONTH_DAYS = month => {
  const monthIndex = month - 1; // 0..11 instead of 1..12
  const date = moment().month(monthIndex).date(1);
  const result = [];
  while (date.month() === monthIndex) {
    result.push({
      day: date.date(),
      weekDay: moment().date(date.date()).format('ddd'),
      isPast: date.month() < moment().month() || (date.month() <= moment().month() && date.date() < moment().date()),
    });
    date.date(date.date() + 1);
  }
  return result;
};

export {
  MONTHS,
  MONTH_DAYS,
  DASHBOARD_ACTIONS,
  INITIAL_STATE,
};
