import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({id, name, label, defaultChecked, simpleSwitch, onChange}) => {
  const handleChange = event => {
    const key = event.target.name;
    onChange({
      [key]: !defaultChecked,
    });
  };

  return simpleSwitch ? (
    <div className="switch">
      <input
        className="switch__input"
        type="checkbox"
        defaultChecked={defaultChecked}
        name={name}
        id={id}
        onChange={handleChange}
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
          onChange={handleChange}
        />
        <label className="switch__label" htmlFor={id} />
      </div>
    </div>
  );
};

Switch.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  simpleSwitch: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Switch;
