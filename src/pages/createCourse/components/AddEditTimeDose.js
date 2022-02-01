import React, {Fragment} from 'react';
import moment from 'moment';
import {NUMBER_REGEXP} from '../constants';

const AddEditTimeDose = ({
  selectedTimeDose,
  setTimeDose,
}) => {
  const handleTimeChange = event => {
    const time = event.target.value;
    const newSelectedTimeDose = {
      ...selectedTimeDose,
      time: moment(time, 'HH:mm').format('HH:mm'),
    };
    setTimeDose(newSelectedTimeDose);
  };
  const handleIncreaseTime = () => {
    const newSelectedTimeDose = {
      ...selectedTimeDose,
      time: moment(selectedTimeDose.time, 'HH:mm').add(1, 'minute').format('HH:mm'),
    };
    setTimeDose(newSelectedTimeDose);
  };
  const handleDecreaseTime = () => {
    const newSelectedTimeDose = {
      ...selectedTimeDose,
      time: moment(selectedTimeDose.time, 'HH:mm').subtract(1, 'minute').format('HH:mm'),
    };
    setTimeDose(newSelectedTimeDose);
  };
  const handleDoseChange = event => {
    const value = event.target.value;
    if (NUMBER_REGEXP.test(value)) {
      if (Number(value) < 1) {
        const newSelectedTimeDose = {...selectedTimeDose};
        newSelectedTimeDose.dose = 1;
        setTimeDose(newSelectedTimeDose);
      } else {
        const newSelectedTimeDose = {...selectedTimeDose};
        newSelectedTimeDose.dose = value;
        setTimeDose(newSelectedTimeDose);
      }
    }
  };
  const handleIncreaseDose = () => {
    const newSelectedTimeDose = {
      ...selectedTimeDose,
      dose: Number(selectedTimeDose.dose) + 1,
    };
    setTimeDose(newSelectedTimeDose);
  };
  const handleDecreaseDose = () => {
    if (Number(selectedTimeDose.dose) === 1) return;
    const newSelectedTimeDose = {
      ...selectedTimeDose,
      dose: Number(selectedTimeDose.dose) - 1,
    };
    setTimeDose(newSelectedTimeDose);
  };

  return (
    <Fragment>
      <div className="columns__column columns__column--time">
        <input
          className="form__input"
          type="time"
          name="mTime"
          value={selectedTimeDose.time}
          onChange={handleTimeChange}
        />
        <button
          type="button"
          className="btns btn-plus"
          onClick={handleIncreaseTime}
        />
        <button
          type="button"
          className="btns btn-minus"
          onClick={handleDecreaseTime}
        />
      </div>
      <div className="columns__column columns__column--doze">
        <input
          className="form__input"
          type="text"
          name="mTime"
          value={selectedTimeDose.dose}
          onChange={handleDoseChange}
        />
        <button
          type="button"
          className="btns btn-plus"
          onClick={handleIncreaseDose}
        />
        <button
          type="button"
          className="btns btn-minus"
          onClick={handleDecreaseDose}
        />
      </div>
    </Fragment>
  );
};

export default AddEditTimeDose;
