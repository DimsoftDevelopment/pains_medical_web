import React from 'react';
import moment from 'moment';
import {WEEKDAYS} from '../constants';

const SpecificDays = ({setSelectedDays, selectedDays}) => {
  const handleDayChange = event => {
    const day = event.target.name;
    const newSelectedDays = [...selectedDays];
    const selectedIndex = selectedDays.indexOf(day);
    if (selectedIndex >= 0) {
      newSelectedDays.splice(selectedIndex, 1);
      setSelectedDays(newSelectedDays);
    } else {
      newSelectedDays.push(day);
      setSelectedDays(newSelectedDays);
    }
  };

  return (
    <div className="form__row form__row--days">
      {WEEKDAYS.map((weekday, index) => (
        <div className="day" key={weekday}>
          <input
            className="form__checkbox--days"
            type="checkbox"
            name={weekday}
            id={weekday}
            onChange={handleDayChange}
          />
          <label
            className="form__label--days"
            htmlFor={weekday}
          >
            {moment().day(index + 1).format('ddd')}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SpecificDays;
