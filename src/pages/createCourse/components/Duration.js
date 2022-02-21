import React from 'react';

const Duration = ({duration, setDuration}) => {
  const increaseDuration = () => {
    setDuration(duration + 1);
  };
  const decreaseDuration = () => {
    if (duration === 1) return;
    setDuration(duration - 1);
  };
  return (
    <div className="form__row form__row--duration">
      <label className="form__label">Duration</label>
      <input
        className="form__input"
        type="text"
        placeholder=""
        value={`${duration} Days`}
        disabled
      />
      <button
        className="btns btn-prev"
        type="button"
        onClick={decreaseDuration}
      />
      <button
        className="btns btn-next"
        type="button"
        onClick={increaseDuration}
      />
    </div>
  );
};

export default Duration;
