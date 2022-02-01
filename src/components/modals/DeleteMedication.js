import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from './Modal';
import {deleteMedication} from '../../pages/meds/actions';

const DeleteMedication = ({toggleDeleteModal}) => {
  const dispatch = useDispatch();
  const {medication} = useSelector(({medsState}) => medsState);
	const handleDeleteMedication = () => {
    dispatch(deleteMedication(medication.id));
	};
  return (
    <Modal
      header='Delete Medicine?'
      className={Modal.ModalClasses.remove}
      additionalClassNames="tac"
    >
      <p>
        Are you sure you want to delete <strong>{medication.title}</strong> from your library?
      </p>
      <div className="block__btns">
        <button className="btns btn-cancel" onClick={toggleDeleteModal}>CANCEL</button>
        <button className="btns btn-remove" onClick={handleDeleteMedication}>YES, REMOVE</button>
      </div>
    </Modal>
  );
};

export default DeleteMedication;
