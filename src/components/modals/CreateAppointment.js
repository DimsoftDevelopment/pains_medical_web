import React from 'react';
import {useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import Modal from './Modal';
import SubmitButton from '../buttons/SubmitButton';
import TextInput from '../inputs/TextInput'
import DatePicker from '../inputs/DatePicker'

const CreateAppointment = ({handleCloseModal, handleCreation}) => {
  const { isLoading } = useSelector(({authState}) => authState)
  const { patientsList } = useSelector(({patientsState}) => patientsState)
  const { handleSubmit, register, formState: { errors, isDirty, isValid }, control } = useForm({
    defaultValues: {
      user_id: '',
      start_date: '',
      place: '',
      time: ''
    },
    mode: 'onChange',
  });
  return (
    <Modal
      title="Make an appointmant"
      className={Modal.ModalClasses.invite}
      additionalClassNames="tac"
      showCloseButton
      handleCloseModal={handleCloseModal}

    >
      <form className="form form--popup" onSubmit={handleSubmit(handleCreation)}>
        <div class="form__row custom-select">
          <label class="form__label" for="aPatient">Choose a patient</label>
          <select class="form__select" name="aPatient" id="aPatient">
            <option selected disabled>Patient</option>
            {patientsList.map(item => <option value={item.id}>{item.attributes.last_name} {item.attributes.first_name}</option>)}
          </select>
        </div>
        <div class="form__row">
          <TextInput name='place' placeholder='Add place' register={register} required={true} />
        </div>
        <div class="form__row form__row--columns">
          <div class="form__row form__row--columns">
            <div class="row__column row__column--2">
              <DatePicker name='start_date' placeholder='Choose a date' register={register} required={true} />
            </div>
            <div class="row__column row__column--2">
              <label class="form__label" for="aTime">Choose a time</label>
              <input
                className="form__input timepicker"
                type="time"
                name="time"
                id='aTime'
                {...register('time', {required: true})}
              />
            </div>
          </div>
        </div>
        <SubmitButton
          value={isLoading ? "LOADING..." : "INVITE"}
          disabled={!isDirty || !isValid || isLoading}
          className="tac"
        />
      </form>
    </Modal>
  );
};

export default CreateAppointment;
