import React from 'react';
import {useDispatch} from 'react-redux';
import Modal from './Modal';
import {togglePinChanged} from '../../pages/pageWrapper/actions';

const PinChanged = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(togglePinChanged());
  };
  return (
    <Modal
      header="Change PIN Code"
      className={Modal.ModalClasses.pin}
      additionalClassNames="tac"
    >
      <p>Succesfully changed</p>
      <div className="block__btns tac">
        <button className="btns form__submit" onClick={handleCloseModal}>OK</button>
      </div>
    </Modal>
  );
};

export default PinChanged;
