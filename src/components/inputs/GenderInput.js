import React from 'react';
import PropTypes from 'prop-types';

const GenderInput = ({
  defaultValue,
  register,
}) => {
  return (
    <div className="form__column--2 custom-select">
      <label className="form__label" htmlFor="uGender">Gender</label>
      <select
        {...register('gender')}
        className="form__select"
        id="uGender"
        defaultValue={defaultValue}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>	
    </div>
  );
};

GenderInput.propTypes = {
  defaultValue: PropTypes.string,
  register: PropTypes.func,
};

export default GenderInput;
