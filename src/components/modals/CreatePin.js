import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Modal from './Modal';
import PinInput from '../inputs/PinInput';
import SubmitButton from '../buttons/SubmitButton';

const CreatePin = ({title, handlePinModal, showReEnter, handleReEnter}) => {
	const [pin_code, setPin] = useState('');
  const {isLoading} = useSelector(({authState}) => authState);
	const handleChangePin = newPin => {
    setPin(newPin);
	};
  const handleCheckPin = event => {
    if (event)
		  event.preventDefault();
    handlePinModal(pin_code);
  };
  const handleKeyDown = event => {
    if (pin_code.length === 4 && event.key === 'Enter')
      handleCheckPin();
  };
  return (
    <Modal
      header={title}
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
        {showReEnter && (
          <div className={`form__row form__row--submit tac`}>
            <input
              type="button"
              className="form__submit"
              value='Re-enter PIN Code'
              readOnly
              onClick={handleReEnter}
            />
          </div>
        )}
        <SubmitButton
          value={isLoading ? "LOADING..." : "CONFIRM"}
          disabled={isLoading || (!pin_code || pin_code.length < 4)}
          className="tac"
        />
      </form>
    </Modal>
  );
};

export default CreatePin;
