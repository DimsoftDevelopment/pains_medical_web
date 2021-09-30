import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from './Modal';
import CodeInput from '../inputs/CodeInput';
import {resendVerificationCode, checkVerificationCode} from '../../pages/auth/actions';
import SubmitButton from '../buttons/SubmitButton';
import blueCheckIcon from '@assets/img/icons/i-check_blue.png';

const CodeModal = () => {
	const [pin_code, setPin] = useState('');
  const dispatch = useDispatch();
  const {isLoading, phone, codeResent} = useSelector(({authState}) => authState);
	const handleChangePin = newPin => {
		// if (error) dispatch(clearError());
    setPin(newPin);
	};
  const handleCheckPin = event => {
    if (event)
		  event.preventDefault();
    dispatch(checkVerificationCode(phone, pin_code));
  };
  const handleKeyDown = () => {
    if (pin_code.length === 4)
      handleCheckPin();
  };
  const handleResend = () => {
    dispatch(resendVerificationCode(phone));
  };
  return (
    <Modal
      header="Enter code from sms,"
      title="sent to number"
      subtitle={phone}
      className={Modal.ModalClasses.sms}
    >
      <form className="form form--popup" onSubmit={handleCheckPin}>
        <CodeInput
          type={CodeInput.CodeInputTypes.text}
          handleChange={handleChangePin}
          pin_code={pin_code}
          onKeyDown={handleKeyDown}
        />
        {codeResent && (
          <div className="form__row form__row--notification tac">
            SMS RESEND <img className="icon" src={blueCheckIcon} alt="Done" />
          </div>
        )}
        <div className="form__row form__row--text tac">
          No sms? Request <button className="link" type="button" onClick={handleResend}>resend</button>
        </div>
        <SubmitButton
          value={isLoading ? "LOADING..." : "CONFIRM"}
          disabled={isLoading || (!pin_code || pin_code.length < 4)}
          className="tac"
        />
      </form>
    </Modal>
  );
};

export default CodeModal;
