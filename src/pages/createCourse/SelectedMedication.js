import React, {useState, Fragment} from 'react';
import TimeDose from './components/TimeDose';
import {NUMBER_REGEXP} from './constants';

const SelectedMedication = ({medication}) => {
  const [selectedFrequency, setFrequency] = useState('');
  const [editTimeDose, setEditTimeDose] = useState(false);
  const [timeDoses, setTimeDoses] = useState([]);
  const [selectedTimeDose, setTimeDose] = useState(null);
  const [selectedEditTimeDose, setSelectedTimeDose] = useState(null);
  const handleFrequency = event => {
    const {value} = event.target;
    setFrequency(value);
  };
  const addTimeDoses = () => {
    const timeDose = {
      time: '8:00',
      dosage_form: medication.dosage_form,
      dose: '1',
    };
    setTimeDose(timeDose);
    setEditTimeDose(true);
  };
  const handleAddTimeDose = () => {
    const newTimeDosesArray = [...timeDoses];
    if (selectedEditTimeDose) {
      newTimeDosesArray[selectedEditTimeDose] = {
        ...newTimeDosesArray[selectedEditTimeDose],
        ...selectedTimeDose,
      };
      setSelectedTimeDose(null);
    } else {
      newTimeDosesArray.push(selectedTimeDose);
    }
    setTimeDoses(newTimeDosesArray);
    setEditTimeDose(false);
    setTimeDose(null);
  };
  const handleEditTimeDose = index => {
    setTimeDose(timeDoses[index]);
    setSelectedTimeDose(index);
    setEditTimeDose(true);
  };
  const deleteTimeDose = index => {
    const allTimeDoses = [...timeDoses];
    allTimeDoses.splice(index, 1);
    setTimeDoses(allTimeDoses);
  };
  const handleIncreaseTime = () => {

  };
  const handleDecreaseTime = () => {

  };
  const handleDoseChange = event => {
    const value = event.target.value;
    if (NUMBER_REGEXP.test(value)) {
      const newSelectedTimeDose = {...selectedTimeDose};
      newSelectedTimeDose.dose = value;
      setTimeDose(newSelectedTimeDose);
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
    const newSelectedTimeDose = {
      ...selectedTimeDose,
      dose: Number(selectedTimeDose.dose) - 1,
    };
    setTimeDose(newSelectedTimeDose);
  };
  return (
    <div className="medicines__settings">
      <div className="settings__form form">
        <div className="form__row custom-select">
          <label className="settings__label" htmlFor="mFrequency">Frequency</label>
          <select
            className="settings__select"
            onChange={handleFrequency}
            value={selectedFrequency}
          >
            <option value="">Choose frequency</option>
            <option value="every_day">Every Day</option>
            <option value="specific_days">Specific days</option>
            <option value="days_interval">Days interval</option>
          </select>
        </div>
        {selectedFrequency === 'specific_days' && (
          <div className="form__row form__row--days">
            <div className="day">
              <input className="form__checkbox--days" type="checkbox" name="d01" id="d01" />
              <label  className="form__label--days" for="d01">MON</label>
            </div>
            <div className="day">
              <input className="form__checkbox--days" type="checkbox" name="d02" id="d02" />
              <label  className="form__label--days" for="d02">TUE</label>
            </div>
            <div className="day">
              <input className="form__checkbox--days" type="checkbox" name="d03" id="d03" />
              <label  className="form__label--days" for="d03">WED</label>
            </div>
            <div className="day">
              <input className="form__checkbox--days" type="checkbox" name="d04" id="d04" />
              <label  className="form__label--days" for="d04">THU</label>
            </div>
            <div className="day">
              <input className="form__checkbox--days" type="checkbox" name="d05" id="d05" />
              <label  className="form__label--days" for="d05">FRI</label>
            </div>
            <div className="day">
              <input className="form__checkbox--days" type="checkbox" name="d06" id="d06" />
              <label  className="form__label--days" for="d06">SAT</label>
            </div>
            <div className="day">
              <input className="form__checkbox--days" type="checkbox" name="d07" id="d07" />
              <label  className="form__label--days" for="d07">SUN</label>
            </div>
          </div>
        )}
        {selectedFrequency === 'days_interval' && (
          <div className="form__row form__row--duration">
            <input className="form__input" type="text" placeholder="" value="Every 2 days" />
            <button className="btns btn-prev"></button>
            <button className="btns btn-next"></button>
          </div>
        )}
        {selectedFrequency && (
          <div className="form__row">
            <label className="settings__label">Time & Dose</label>
            <div className="form__row form__row--columns">
            <div className="columns__column columns__column--timeAdoze">
              {timeDoses.map((timeDose, index) => (
                <TimeDose
                  key={index}
                  timeDose={timeDose}
                  index={index}
                  editTimeDose={handleEditTimeDose}
                  deleteTimeDose={deleteTimeDose}
                />
              ))}
              </div>
              <div className="columns__column columns__column--add">
                <button
                  className="btns btn-timeAdoze"
                  type="button"
                  onClick={addTimeDoses}
                />
              </div>
              {selectedTimeDose && (
                <Fragment>
                  <div className="columns__column columns__column--time">
                    <input
                      className="form__input"
                      type="text"
                      name="mTime"
                      value={selectedTimeDose.time}
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
              )}
            </div>
          </div>
        )}
        {timeDoses.length > 0 && (
          <div className="form__row form__row--duration">
            <label className="settings__label">Duration</label>
            <input className="form__input" type="text" placeholder="" value="7 Days" />
            <button className="btns btn-prev" />
            <button className="btns btn-next" />
          </div>
        )}
        <div className="form__row form__row--submit">
          <input className="form__reset" type="reset" value="CLEAR" />
          {editTimeDose ? (
            <input
              className="form__submit"
              type="button"
              onClick={handleAddTimeDose}
              value="CONFIRM"
            />
          ) : (
            <input
              className="form__submit"
              type="button"
              // onClick={}
              value="ADD MEDICINE"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedMedication;
