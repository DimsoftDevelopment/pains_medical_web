import moment from 'moment';

export const getTimezoneOffset = (date) => Math.abs(new Date(date).getTimezoneOffset());

export const getCurrentYear = () => ({
  start_date: moment().startOf('year').add(getTimezoneOffset(), 'minutes').toISOString(),
  end_date: moment().add(getTimezoneOffset(), 'minutes').toISOString(),
});

export const convertDates = (start_date, end_date) => ({
  start_date: start_date && moment(start_date).startOf('day').add(getTimezoneOffset(start_date), 'minutes').toISOString(),
  end_date: end_date && moment(end_date).endOf('day').add(getTimezoneOffset(end_date), 'minutes').toISOString(),
});

export const getDefaultDates = () => ({
  start_date: moment().startOf('day').toISOString(),
  end_date: moment().endOf('day').toISOString(),
});

export const getCurrentDayDate = (selectedMonth, day) => {
  return moment().month(selectedMonth - 1).date(day).toISOString();
};

export const convertDatesISO = (day, month) => ({
  start_date: moment().month(month).date(day).startOf('day').toISOString(),
  end_date: moment().month(month).date(day).endOf('day').toISOString(),
});
