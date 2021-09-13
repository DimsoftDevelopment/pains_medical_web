import React from 'react';
import {useForm} from 'react-hook-form';
import PageWrapper from '../components/PageWrapper';
import TextInput from '../components/inputs/TextInput';
import SubmitButton from '../components/buttons/SubmitButton';
import PhoneModal from '../components/modals/PhoneModal';

const SignIn = () => {
  const {handleSubmit, register, formState: {errors}, control} = useForm();
  const handleAvatar = () => {};
  const onSubmit = formData => {
    console.log(formData);
  };
  return (
    <PageWrapper className={PageWrapper.WrapperClassNames.signin}>
      <form className="form form--authorization" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__row form__row--avatar">
          <label htmlFor="uAvatar" className="form__label form__label--avatar">
            <input className="form__input--avatar" id="uAvatar" type="file" name="uAvatar" defaultValue="" onChange={handleAvatar} />
          </label>
        </div>
        <div className="form__title">
          Stephanus Huggins
        </div>

        <TextInput
          register={register}
          name="email"
          placeholder="Enter email"
          type="email"
          required
          label="Email"
          defaultValue=""
        />
        <div className="form__row form__row--columns">
          <div className="form__column--2 custom-select">
            <select name="uGender">
              <option value="">Select Gender</option>
              <option value="">Male</option>
              <option value="">Female</option>
              <option value="">Other</option>
            </select>	
          </div>
          <div className="form__column--2">
            <input className="form__input form__input--datepicker datepicker-here" id="uBirth" type="text" placeholder="" />		
          </div>
        </div>
        <SubmitButton value="CREATE ACCOUNT" />
        <div className="form__row form__row--skip">
          <a className="btns btn-skip" href="#">SKIP</a>
        </div>
      </form>
      <PhoneModal />
    </PageWrapper>
  );
};

export default SignIn;
