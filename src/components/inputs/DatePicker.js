import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

const DatePickerInput = ({name, value, onChange}) => {
  const handleDateChange = date => {
    onChange(moment(date).toISOString());
  };
  return (
    <div className="columns__column--2">
      <label className="form__label" htmlFor="uBday">Birth day</label>
      <DatePicker
        name={name}
        selected={moment(value).toDate()}
        onChange={handleDateChange}
        className="form__input datepicker-here"
        scrollableYearDropdown
        showYearDropdown
        showMonthDropdown
      />
    </div>
  );
};

DatePickerInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, Date]),
  onChange: PropTypes.func,
};

export default DatePickerInput;
