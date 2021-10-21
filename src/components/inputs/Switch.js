import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({id, name, label, defaultChecked, simpleSwitch, register}) => {
  return simpleSwitch ? (
    <div className="switch">
      <input
        className="switch__input"
        type="checkbox"
        defaultChecked={defaultChecked}
        name={name}
        id={id}
        {...register(name)}
      />
      <label className="switch__label" htmlFor={id} />
    </div>
  ) : (
    <div className="switch__wrapper">
      <div className="switch__text">{label}</div>
      <div className="switch">
        <input
          className="switch__input"
          type="checkbox"
          defaultChecked={defaultChecked}
          name={name}
          id={id}
          {...register(name)}
        />
        <label className="switch__label" htmlFor={id} />
      </div>
    </div>
  );
};

Switch.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
  simpleSwitch: PropTypes.bool,
  register: PropTypes.func.isRequired,
};

export default Switch;
