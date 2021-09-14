import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import PageWrapper from '../../components/PageWrapper';
import TextInput from '../../components/inputs/TextInput';
import SubmitButton from '../../components/buttons/SubmitButton';
import PhoneVerificationModal from '../../components/modals/PhoneVerificationModal';
import AvatarInput from '../../components/inputs/AvatarInput';

const SignIn = () => {
  const [avatarData, setAvatar] = useState({});
  const {handleSubmit, register} = useForm();
  const handleAvatar = event => {
    const file = event.currentTarget.files[0];
    const url = URL.createObjectURL(file);
    setAvatar({file, url});
  };
  const handleClearAvatar = () => {
    setAvatar({});
  };
  const onSubmit = formData => {
    console.log(formData);
  };
  return (
    <PageWrapper className={PageWrapper.WrapperClassNames.signin}>
      <form className="form form--authorization" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__row form__row--avatar">
          <AvatarInput
            handleAvatar={handleAvatar}
            avatar={avatarData.url}
            handleClearAvatar={handleClearAvatar}
          />
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
          <button className="btns btn-skip">SKIP</button>
        </div>
      </form>
      <PhoneVerificationModal />
    </PageWrapper>
  );
};

export default SignIn;
