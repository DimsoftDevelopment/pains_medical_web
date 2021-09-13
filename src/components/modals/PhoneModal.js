import React from 'react';
import PhoneInput from 'react-phone-number-input';
import {useForm, Controller, useFormState, useController} from 'react-hook-form';
import SubmitButton from '../buttons/SubmitButton';
import 'react-phone-number-input/style.css';

const PhoneModal = () => {
  const {handleSubmit, control} = useForm({
    defaultValues: {
      phone: '',
    },
  });
  const {fieldState} = useController({name: 'phone', control});
  const {isDirty, isValid, errors} = useFormState({control});
  const sendVerificationCode = () => {};
  console.log(isDirty, isValid, errors, fieldState)
  return (
    <div className="popup show phone">
      <div className="popup__overlay">
        <div className="popup__block popup--phone">
          {/* <div className="block__top">
            <button className="btn btn-close"></button>
          </div> */}
          <div className="block__title tac">
            Enter you mobile <br /> phone number
          </div>
          <div className="block__content">
            <form className="form form--popup" onSubmit={handleSubmit(sendVerificationCode)}>
              <div className="form__row">
                <Controller
                  control={control}
                  name="phone"
                  rules={{required: 'Phone is required.', validate: true}}
                  render={({field}) => (
                    <PhoneInput {...field} />
                  )}
                />
              </div>
              <div className="form__row form__row--text tac">
                By clicking «Continue» button you are agree with <a href="#">terms and conditions</a>
              </div>
              <SubmitButton value="CONFIRM" disabled={!isDirty || !isValid} className="tac" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;
