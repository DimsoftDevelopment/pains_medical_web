import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Frequency from './components/Frequency';
import SpecificDays from './components/SpecificDays';
import DaysInterval from './components/DaysInterval';
import TimeDoses from './components/TimeDoses';
import Duration from './components/Duration';
import PageWrapper from '../pageWrapper';
import { useDispatch, useSelector } from 'react-redux'
import { setMedicationAction, setSelectedMedicationIndexAction, updateCourseProp } from './actions';
import { ROUTES } from '../../router/routes';

const SelectedMedication = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { selectedMedication: medication, course, selectedMedicationIndex } = useSelector(({createCourseState}) => createCourseState)

  const setSelectedMedicationIndex = index => dispatch(setSelectedMedicationIndexAction(index))
  const setMedication = index => dispatch(setMedicationAction(index))
  const setCourse = course => dispatch(updateCourseProp(course))

  const handleSelectedMedicines = medicine => {
    const medicines = [...course.course_medications_attributes];
    if (selectedMedicationIndex || selectedMedicationIndex === 0) {
      medicines[selectedMedicationIndex] = {
        ...medicines[selectedMedicationIndex],
        ...medicine,
      };
      setSelectedMedicationIndex(null);
    } else {
      medicines.push(medicine);
    }
    setCourse({
      ...course,
      end_date: moment(course.end_date).isBefore(medicine.end_date) ? medicine.end_date : course.end_date,
      course_medications_attributes: medicines,
    });
    setMedication({})
    history.push(ROUTES.CREATE_COURSE)
  }

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
        start_date: moment(course.start_date).toISOString(),
        end_date: moment(course.start_date).add(duration, 'days').toISOString(),
      };
      handleSelectedMedicines(medicine);
      handleClear();
    }
  };
  return (
    <PageWrapper
      className={PageWrapper.WrapperClassNames.setlectedMedication}
      showSideBar
    >
      <div class="content__top">
        <div class="top__content">
          <div class="top__link">
            <button onClick={() => history.push(ROUTES.CREATE_COURSE)} class="btns btn-back" data-toggle="class" data-target="#popups" data-classes="leave">
              <i class="icons i24x24 i-chevron_left"></i>
            </button>
          </div>
          <div class="top__title">
            Add Medicine
          </div>
        </div>
      </div>
      <div class="content__block">
        <div class="medicine__form">
          <div className='form'>
            <div class="form__row">
              <div class="form__label">Medicine</div>
              <div class="form__text">{medication.title}</div>
            </div>
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
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SelectedMedication;
