import React from 'react';
import {useSelector} from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import {useForm, Controller} from 'react-hook-form';
import Modal from './Modal';
import SubmitButton from '../buttons/SubmitButton';
import {PHONE} from '../../constants';
import 'react-phone-number-input/style.css';
import TextInput from '../inputs/TextInput';

const InviteMember = ({handleCloseModal, handleInvite}) => {
  const {isLoading} = useSelector(({authState}) => authState);
  const {handleSubmit, formState: {errors, isDirty, isValid}, control} = useForm({
    defaultValues: {
      phone: '',
    },
    mode: 'onChange',
  });
  return (
    <Modal
      title="phone number"
      className={Modal.ModalClasses.invite}
      additionalClassNames="tac"
      showCloseButton
      handleCloseModal={handleCloseModal}
    >
      <form className="form form--popup" onSubmit={handleSubmit(handleInvite)}>
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
              <TextInput type='number' {...field} />
            )}
          />
          {errors.phone && errors.phone.type === 'phoneNumber' && (
            <p className="input-error-message">Phone number is invalid.</p>
          )}
          {errors.phone && errors.phone.type !== 'phoneNumber' && (
            <p className="input-error-message">{errors.phone.message}</p>
          )}
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

export default InviteMember;
