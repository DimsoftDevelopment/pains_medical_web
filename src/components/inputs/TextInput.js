import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  label,
  register = () => {},
  name,
  required,
  placeholder,
  type,
  id,
  defaultValue,
  containerClassName,
  multyline,
  value,
  onChange = () => {},
  error,
  disabled
}) => {
  return (
    <div className={containerClassName ? containerClassName : "form__row"}>
      <label className="form__label" htmlFor={id}>{label}</label>
      {multyline ? (
        <textarea
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...register(name, {required, onChange})}
          className="form__textarea"
          id={id}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
      ) : (
        <input
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...register(name, {required, onChange})}
          className="form__input"
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      )}
      {error && <p style={{color: 'red'}}>{error}</p>}
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
  containerClassName: PropTypes.string,
  multyline: PropTypes.bool,
};

export default TextInput;
