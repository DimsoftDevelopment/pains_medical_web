import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

const DatePickerInput = ({
  label,
  name,
  value,
  onChange,
  containerClassName,
  disabled,
  maxDate,
  minDate
}) => {
  const handleDateChange = date => {
    onChange(moment(date).toISOString());
  };
  return (
    <div className={containerClassName ? containerClassName : "columns__column--2"}>
      <label className="form__label" htmlFor="uBday">{label || 'Birth day'}</label>
      <DatePicker
        maxDate={maxDate && new Date()}
        minDate={minDate && new Date()}
        name={name}
        selected={moment(value).toDate()}
        onChange={handleDateChange}
        className="form__input datepicker-here"
        scrollableYearDropdown
        showYearDropdown
        showMonthDropdown
        disabled={disabled}
      />
    </div>
  );
};

DatePickerInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, Date]),
  onChange: PropTypes.func,
  containerClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default DatePickerInput;
