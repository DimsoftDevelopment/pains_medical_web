import moment from "moment";
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

export {MONTHS, MONTH_DAYS};
