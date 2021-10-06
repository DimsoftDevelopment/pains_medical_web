import React, {useState} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {MONTHS, MONTH_DAYS} from './constants';

const Calendar = ({onChangeDate}) => {
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
  const [selectedDay, setSelectedDay] = useState(moment().date());
  const handleMonthSelect = month => () => {
    const start_date = moment().startOf('day').month(month - 1).date(selectedDay).toISOString();
    const end_date = moment().endOf('day').month(month - 1).date(selectedDay).toISOString();
    setSelectedMonth(month);
    onChangeDate({start_date, end_date});
  };
  const handleDaySelect = day => () => {
    const start_date = moment().startOf('day').add(3, 'hours').month(selectedMonth - 1).date(day).toISOString();;
    const end_date = moment().endOf('day').month(selectedMonth - 1).date(day).toISOString();;
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
                disabled={dayData.isPast}
                onClick={handleDaySelect(dayData.day)}
                className={classNames("day", {
                  active: selectedDay === dayData.day,
                  past: dayData.isPast,
                  missed: false,
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
