import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {push} from 'connected-react-router';
import PageWrapper from '../pageWrapper';
import TextInput from '../../components/inputs/TextInput';
import GenderInput from '../../components/inputs/GenderInput';
import DatePickerInput from '../../components/inputs/DatePicker';
import SubmitButton from '../../components/buttons/SubmitButton';
import AvatarInput from '../../components/inputs/AvatarInput';
import {ROUTES} from '../../router/routes';
import {signUp} from './actions';
import CustomSelect from '../../components/inputs/CustomSelect'

const ProfileDetails = () => {
  const selectArr = [
    {value: 'male', text: 'Male'},
    {value: 'female', text: 'Female'},
    {value: 'other', text: 'Other'},
  ]

  const [avatarData, setAvatar] = useState({});
  const {handleSubmit, register, setValue, control} = useForm();
  const dispatch = useDispatch();
  const {user} = useSelector(({authState}) => authState);
  const handleAvatar = event => {
    const file = event.currentTarget.files[0];
    const url = URL.createObjectURL(file);
    setAvatar({file, url});
  };
  const handleClearAvatar = () => {
    setAvatar({});
  };
  const onSubmit = formData => {
    const userData = {
      ...user,
      ...formData,
      avatar: avatarData.file ? avatarData.file : null,
    };
    dispatch(signUp(userData));
  };
  useEffect(() => {
    if (!user || !user.phone)
      dispatch(push(ROUTES.SIGN_IN));
  }, [dispatch, user]);
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
          {`${user.first_name} ${user.last_name}`}
        </div>

        <TextInput
          register={register}
          name="email"
          placeholder="Enter email"
          type="email"
          label="Email"
          defaultValue=""
        />
        <div className="form__row form__row--columns">
          <CustomSelect id='gender' label='Gender' className='form__column--2' defaultName='Gender' name='gender' required={true} register={register} setValue={setValue} data={selectArr} />
          <Controller
            control={control}
            id="birthday"
            name="birthday"
            render={({field}) => (
              <DatePickerInput
                name={field.name}
                onBlur={field.onBlur}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </div>
        <SubmitButton value="CREATE ACCOUNT" />
        <div className="form__row form__row--skip">
          <button
            onClick={() => onSubmit({})}
            className="btns btn-skip"
            type="button"
          >
            SKIP
          </button>
        </div>
      </form>
    </PageWrapper>
  );
};

export default ProfileDetails;
