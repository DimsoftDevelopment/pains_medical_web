import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  label,
  register,
  name,
  required,
  placeholder,
  type,
  id,
  defaultValue,
}) => {
  return (
    <div className="form__row">
      <label className="form__label" htmlFor={id}>{label}</label>
      <input
        {...register(name, {required})}
        className="form__input"
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string,
  register: PropTypes.func,
  name: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default TextInput;
