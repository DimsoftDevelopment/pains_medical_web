import React, {useState} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {MONTHS, MONTH_DAYS} from '../constants';
import {isMissedDay} from '../../courses/helpers';
import {getCurrentDayDate, convertDatesISO} from '../../../services/DateHelper';

const Calendar = ({onChangeDate, all_reception_dates, mised_reception_dates}) => {
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
  const [selectedDay, setSelectedDay] = useState(moment().date());
  const handleMonthSelect = month => () => {
    const {start_date, end_date} = convertDatesISO(selectedDay, month - 1);
    setSelectedMonth(month);
    onChangeDate({start_date, end_date});
  };
  const handleDaySelect = day => () => {
    const {start_date, end_date} = convertDatesISO(day, selectedMonth - 1);
    setSelectedDay(day);
    onChangeDate({start_date, end_date});
  };
  const days = MONTH_DAYS(selectedMonth);
  return (
    <section className="calendar">
      <div className="calendar__block">
        <div className="calendar__months">
          <div className="months__list">
            {MONTHS.map(month => (
              <div
                key={month}
                className={
                  classNames("month", {
                    active: selectedMonth === month,
                  })
                }
                onClick={handleMonthSelect(month)}
              >
                {moment().month(month - 1).format('MMMM')}
              </div>
            ))}
          </div>
        </div>
        <div className="calendar__days">
          <div className="days__list">
            {days.map(dayData => (
              <button
                key={dayData.day}
                onClick={handleDaySelect(dayData.day)}
                className={classNames("day", {
                  active: selectedDay === dayData.day,
                  past: dayData.isPast,
                  missed: isMissedDay(getCurrentDayDate(selectedMonth, dayData.day), mised_reception_dates),
                })}
              >
                <div className="month__day">{dayData.day}</div>
                <div className="week__day">{dayData.weekDay}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
