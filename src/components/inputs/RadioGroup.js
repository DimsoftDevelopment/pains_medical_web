import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const RadioGroup = ({options, register}) => {
  return (
    <div className="form__row form__row--radiobox">
      {options.map(option => (
        <Fragment key={option.value}>
          <input
            {...register(option.name)}
            className="form__input--radio"
            type="radio"
            name={option.name}
            id={option.id}
            value={option.value}
          />
          <label className="form__label--radio" htmlFor={option.id}>{option.label}</label>
        </Fragment>
      ))}
    </div>
  );
};

RadioGroup.propTypes = {
  options: PropTypes.array,
  register: PropTypes.func,
};

export default RadioGroup;
