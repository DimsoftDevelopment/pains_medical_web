import React, { useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import Modal from './Modal';
import SubmitButton from '../buttons/SubmitButton';
import TextInput from '../inputs/TextInput'
import DatePicker from '../inputs/DatePicker'
import CustomSelect from '../inputs/CustomSelect';

const CreateAppointment = ({handleCloseModal, handleCreation}) => {
  const { isLoading } = useSelector(({authState}) => authState)
  const { patientsList } = useSelector(({patientsState}) => patientsState)
  const { handleSubmit, register, setValue, formState: { errors, isDirty, isValid }, control } = useForm({
    defaultValues: {
      user_id: '',
      start_date: new Date().toISOString(),
      place: '',
      time: ''
    },
    mode: 'onChange',
  })

  const [selectArr, setSelectArr] = useState([...patientsList.map(item => ({value: item.id, text: `${item.attributes.last_name} ${item.attributes.first_name}`}))])

  useEffect(() => setSelectArr(prev => [...patientsList.map(item => ({value: item.id, text: `${item.attributes.last_name} ${item.attributes.first_name}`}))]), [patientsList])
  useEffect(() => console.log(selectArr), [selectArr])

  return (
    <Modal
      title="Make an appointment"
      className={Modal.ModalClasses.invite}
      additionalClassNames="tac"
      showCloseButton
      handleCloseModal={handleCloseModal}
    >
      <form className="form form--popup" onSubmit={handleSubmit(handleCreation)}>
        {/* <div className="form__row custom-select">
          <label className="form__label" htmlFor="aPatient">Choose a patient</label>
          <select defaultValue={''} className="form__select" name="aPatient" id="aPatient" {...register('user_id', {required: true})}>
            <option value='' disabled>Patient</option>
            {patientsList.map(item => <option value={item.id}>{item.attributes.last_name} {item.attributes.first_name}</option>)}
          </select>
        </div> */}
        <CustomSelect id='patient' label='Choose a patient' className='form__row' defaultName='Patient' name='user_id' required={true} register={register} setValue={setValue} data={selectArr} />
        <div className="form__row">
					<label className="form__label" htmlFor="aLocation">Add place</label>
          <TextInput id='aLocation' name='place' placeholder='Add place' register={register} required={true} />
        </div>
        <div className="form__row form__row--columns row_customs">
          <div className="row__column row__column--2 row_custom">
            <Controller
              control={control}
              name='start_date'
              render={({field}) => (
                <DatePicker
                  minDate
                  name={field.name}
                  label='Choose a date'
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
          <div className="row__column row__column--2 row_custom">
            <label className="form__label" htmlFor="aTime">Choose a time</label>
            <input
              className="form__input timepicker"
              type="time"
              name="time"
              id='aTime'
              {...register('time', {required: true})}
            />
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
