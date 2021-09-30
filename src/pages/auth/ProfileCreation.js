import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {push} from 'connected-react-router';
import {saveUserInfo} from './actions';
import PageWrapper from '../pageWrapper';
import TextInput from '../../components/inputs/TextInput';
import SubmitButton from '../../components/buttons/SubmitButton';
import CreatePin from '../../components/modals/CreatePin';
import {ROUTES} from '../../router/routes';
import {toggleNotification} from '../pageWrapper/actions';

const ProfileCreation = () => {
  const [showCreatePin, setShowCreatePin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [pin_code, setPinCode] = useState('');
  const {handleSubmit, register} = useForm();
  const {phone, user} = useSelector(({authState}) => authState);
  const dispatch = useDispatch();
  const onSubmit = formData => {
    console.log(formData);
    dispatch(saveUserInfo({
      ...formData,
      phone,
    }));
    setShowCreatePin(true);
  };
  const handlePinModal = pinCode => {
    if (!showConfirmPin) {
      setShowCreatePin(false);
      setShowConfirmPin(true);
      setPinCode(pinCode);
    } else if(pin_code !== pinCode) {
      dispatch(toggleNotification({
        title: 'Wrong PIN Code',
        message: ' ',
        type: 'danger',
      }));
    } else {
      dispatch(saveUserInfo({
        ...user,
        pin_code,
      }));
      dispatch(push(ROUTES.PROFILE_DETAILS));
    }
  };
  const handleReEnter = () => {
    setPinCode('');
    setShowConfirmPin(false);
    setShowCreatePin(true);
  };
  useEffect(() => {
    if (!phone)
      dispatch(push(ROUTES.SIGN_IN));
  }, []);
  return (
    <PageWrapper className={PageWrapper.WrapperClassNames.signin}>
      <form className="form form--authorization" onSubmit={handleSubmit(onSubmit)}>
        <div className="logo" />
        <div className="form__title">
          Account Creation
        </div>
        <TextInput
          register={register}
          name="first_name"
          placeholder="Enter First Name"
          type="text"
          required
          label="First Name"
          defaultValue=""
        />
        <TextInput
          register={register}
          name="last_name"
          placeholder="Enter Last Name"
          type="text"
          required
          label="Last Name"
          defaultValue=""
        />
        <SubmitButton value="NEXT" />
      </form>
      {showCreatePin && (
        <CreatePin
          title='Create Pin'
          handlePinModal={handlePinModal}
        />
      )}
      {showConfirmPin && (
        <CreatePin
          title='Confirm Pin'
          handlePinModal={handlePinModal}
          showReEnter={showConfirmPin}
          handleReEnter={handleReEnter}
        />
      )}
    </PageWrapper>
  );
};

export default ProfileCreation;
