import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from './Modal';
import PinInput from '../inputs/PinInput';
import {sendPinCode} from '../../pages/auth/actions';
import {updateProfile} from '../../pages/settings/actions';
import {togglePinModal} from '../../pages/pageWrapper/actions';
import SubmitButton from '../buttons/SubmitButton';

const PinModal = ({isEdit, handlePinModal}) => {
	const [pin_code, setPin] = useState('');
  const dispatch = useDispatch();
  const {isLoading, user} = useSelector(({authState}) => authState);
	const handleChangePin = newPin => {
		// if (error) dispatch(clearError());
    setPin(newPin);
	};
  const handleCheckPin = event => {
    if (event)
		  event.preventDefault();
    if (!isEdit) {
      dispatch(sendPinCode(user.phone, pin_code));
    } else {
      dispatch(updateProfile({
        ...user,
        pin_code,
        change_pin: true,
      }));
      handlePinModal();
    }
  };
  const handleKeyDown = event => {
    if (pin_code.length === 4 && event.key === 'Enter')
      handleCheckPin();
  };
  const handleCloseModal = () => {
    dispatch(togglePinModal());
  };
  useEffect(() => {
    if (!user && (user && !user.phone)) {
      handleCloseModal();
    }
  }, [user]);
  return (
    <Modal
      header={isEdit ? "Change PIN Code" : "Enter PIN Code"}
      showCloseButton={isEdit}
      handleCloseModal={handleCloseModal}
      className={Modal.ModalClasses.pin}
      additionalClassNames="tac"
    >
      <form className="form" onSubmit={handleCheckPin}>
        <PinInput
          type={PinInput.PinInputTypes.password}
          handleChange={handleChangePin}
          pin_code={pin_code}
          onKeyDown={handleKeyDown}
        />
        <SubmitButton
          value={isLoading ? "LOADING..." : "CONFIRM"}
          disabled={isLoading || (!pin_code || pin_code.length < 4)}
          className="tac"
        />
      </form>
    </Modal>
  );
};

export default PinModal;
