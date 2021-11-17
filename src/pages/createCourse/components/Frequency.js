import React from 'react';

const Frequency = ({handleFrequency, selectedFrequency}) => {
  const handleFrequencyChange = event => {
    const {value} = event.target;
    handleFrequency(value);
  };
  return (
    <div className="form__row custom-select">
      <label className="settings__label" htmlFor="mFrequency">Frequency</label>
      <select
        className="settings__select"
        onChange={handleFrequencyChange}
        value={selectedFrequency}
      >
        <option value="">Choose frequency</option>
        <option value="every_day">Every Day</option>
        <option value="specific_days">Specific days</option>
        <option value="days_interval">Days interval</option>
      </select>
    </div>
  );
};

export default Frequency;
