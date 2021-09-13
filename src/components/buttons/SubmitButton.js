import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({value, disabled, className}) => {
  return (
    <div className={`form__row form__row--submit ${className}`}>
      <input
        type="submit"
        className="form__submit"
        value={value}
        readOnly
        disabled={disabled}
      />
    </div>
  );
};

SubmitButton.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SubmitButton;
