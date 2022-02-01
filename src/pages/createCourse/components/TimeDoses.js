import React from 'react';
import TimeDose from './TimeDose';
import AddEditTimeDose from './AddEditTimeDose';

const TimeDoses = ({
  timeDoses,
  handleEditTimeDose,
  deleteTimeDose,
  addTimeDoses,
  selectedTimeDose,
  setTimeDose,
}) => {
  return (
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
          <AddEditTimeDose
            selectedTimeDose={selectedTimeDose}
            setTimeDose={setTimeDose}
          />
        )}
      </div>
    </div>
  );
};

export default TimeDoses;
