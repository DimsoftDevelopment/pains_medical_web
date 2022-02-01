import React, {useState} from 'react';
import moment from 'moment';
import Frequency from './components/Frequency';
import SpecificDays from './components/SpecificDays';
import DaysInterval from './components/DaysInterval';
import TimeDoses from './components/TimeDoses';
import Duration from './components/Duration';

const SelectedMedication = ({medication, start_date, handleSelectedMedicines}) => {
  const [selectedFrequency, setFrequency] = useState(medication.frequency || '');
  const [editTimeDose, setEditTimeDose] = useState(false);
  const [timeDoses, setTimeDoses] = useState(medication.time_dose || []);
  const [selectedTimeDose, setTimeDose] = useState(null);
  const [selectedEditTimeDose, setSelectedTimeDose] = useState(null);
  const [selectedDays, setSelectedDays] = useState(medication.selected_days || []);
  const [daysInterval, setDaysInterval] = useState(medication.days_interval_count || 1);
  const [duration, setDuration] = useState(medication.duration || 1);
  const [error, setError] = useState('');
  const addTimeDoses = () => {
    setError('');
    const timeDose = {
      time: moment().format('HH:mm'),
      dosage_form: medication.dosage_form || medication.time_dose[0].dosage_form,
      dose: '1',
    };
    setTimeDose(timeDose);
    setEditTimeDose(true);
  };
  const handleAddTimeDose = () => {
    const newTimeDosesArray = [...timeDoses];
    if (selectedEditTimeDose || selectedEditTimeDose === 0) {
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
  const handleClear = () => {
    setFrequency('');
    setEditTimeDose(false);
    setTimeDoses([]);
    setTimeDose(null);
    setSelectedTimeDose(null);
    setSelectedDays([]);
    setDaysInterval(1);
    setDuration(1);
  };
  const handleAddMedicine = () => {
    if (timeDoses.length === 0) {
      setError('Please, select time dose');
    } else {
      const medicine = {
        medication_id: medication.id || medication.medication_id,
        medication_title: medication.title || medication.medication_title,
        frequency: selectedFrequency,
        selected_days: selectedFrequency === 'specific_days' ? selectedDays : null,
        days_interval_count: selectedFrequency === 'days_interval' ? daysInterval : null,
        duration,
        time_dose: timeDoses,
        start_date: moment(start_date).toISOString(),
        end_date: moment(start_date).add(duration, 'days').toISOString(),
      };
      handleSelectedMedicines(medicine);
      handleClear();
    }
  };
  return (
    <div className="medicines__settings">
      {error && (
        <p className="error-message">{error}</p>
      )}
      <div className="settings__form form">
        <Frequency
          handleFrequency={setFrequency}
          selectedFrequency={selectedFrequency}
        />
        {selectedFrequency === 'specific_days' && (
          <SpecificDays
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        )}
        {selectedFrequency === 'days_interval' && (
          <DaysInterval
            daysInterval={daysInterval}
            setDaysInterval={setDaysInterval}
          />
        )}
        {selectedFrequency && (
          <TimeDoses
            timeDoses={timeDoses}
            handleEditTimeDose={handleEditTimeDose}
            deleteTimeDose={deleteTimeDose}
            addTimeDoses={addTimeDoses}
            selectedTimeDose={selectedTimeDose}
            setTimeDose={setTimeDose}
          />
        )}
        {timeDoses.length > 0 && (
          <Duration
            duration={duration}
            setDuration={setDuration}
          />
        )}
        <div className="form__row form__row--submit">
          <input
            className="form__reset"
            type="button"
            value="CLEAR"
            onClick={handleClear}
          />
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
              onClick={handleAddMedicine}
              value="ADD MEDICINE"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedMedication;
