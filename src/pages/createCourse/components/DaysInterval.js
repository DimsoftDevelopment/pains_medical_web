import React from 'react';

const DaysInterval = ({daysInterval, setDaysInterval}) => {
  const increaseDaysInterval = () => {
    setDaysInterval(daysInterval + 1);
  };
  const decreaseDaysInterval = () => {
    if (daysInterval === 1) return;
    setDaysInterval(daysInterval - 1);
  };
  return (
    <div className="form__row form__row--duration">
      <input
        className="form__input"
        type="text"
        placeholder=""
        defaultValue={`Every ${daysInterval} days`}
        value={`Every ${daysInterval} days`}
        disabled
      />
      <button
        className="btns btn-prev"
        type="button"
        onClick={decreaseDaysInterval}
      />
      <button
        className="btns btn-next"
        type="button"
        onClick={increaseDaysInterval}
      />
    </div>
  );
};

export default DaysInterval;
