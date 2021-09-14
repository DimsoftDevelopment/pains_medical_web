import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import {useForm, Controller} from 'react-hook-form';
import Modal from './Modal';
import SubmitButton from '../buttons/SubmitButton';
import {PHONE} from '../../constants';
import {sendVerificationCode} from '../../pages/auth/actions';
import 'react-phone-number-input/style.css';

const PhoneModal = () => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(({authState}) => authState);
  const {handleSubmit, formState: {errors, isDirty, isValid}, control} = useForm({
    defaultValues: {
      phone: '',
    },
    mode: 'onChange',
  });
  const handleSendVerificationCode = ({phone}) => {
    console.log(phone)
    dispatch(sendVerificationCode(phone));
  };
  return (
    <Modal
      header="Enter you mobile"
      title="phone number"
      className={Modal.ModalClasses.phone}
    >
      <form className="form form--popup" onSubmit={handleSubmit(handleSendVerificationCode)}>
        <div className="form__row">
          <Controller
            control={control}
            name="phone"
            rules={{
              required: 'Phone is required.',
              validate: {
                phoneNumber: value => PHONE.test(value),
              }
            }}
            render={({field}) => (
              <PhoneInput {...field} />
            )}
          />
          {errors.phone && errors.phone.type === 'phoneNumber' && (
            <p className="input-error-message">Phone number is invalid.</p>
          )}
          {errors.phone && errors.phone.type !== 'phoneNumber' && (
            <p className="input-error-message">{errors.phone}</p>
          )}
        </div>
        <div className="form__row form__row--text tac">
          By clicking «Continue» button you are agree with <button className="link">terms and conditions</button>
        </div>
        <SubmitButton
          value={isLoading ? "LOADING..." : "CONFIRM"}
          disabled={!isDirty || !isValid || isLoading}
          className="tac"
        />
      </form>
    </Modal>
  );
};

export default PhoneModal;
