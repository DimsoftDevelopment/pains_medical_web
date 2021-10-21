import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = ({options, register}) => {
  return (
    <div className="form__row form__row--radiobox">
      {options.map(option => (
        <>
          <input
            {...register(option.name)}
            key={option.value}
            className="form__input--radio"
            type="radio"
            name={option.name}
            id={option.id}
            value={option.value}
          />
          <label key={option.label} value={option.value} {...register(option.name)} className="form__label--radio" htmlFor={option.id}>{option.label}</label>
        </>
      ))}
    </div>
  );
};

RadioGroup.propTypes = {
  options: PropTypes.array,
  register: PropTypes.func,
};

export default RadioGroup;
