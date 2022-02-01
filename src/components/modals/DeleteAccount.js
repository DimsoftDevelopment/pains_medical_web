import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from './Modal';
import {deleteAccount} from '../../pages/settings/actions';

const DeleteAccount = ({toggleDeleteModal}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(({authState}) => authState);
	const handleDeleteAccount = () => {
    dispatch(deleteAccount(user.id));
	};
  return (
    <Modal
      header='Delete Account?'
      className={Modal.ModalClasses.pin}
      additionalClassNames="tac"
    >
      <div className="block__btns">
        <button className="btns btn-cancel" onClick={toggleDeleteModal}>CANCEL</button>
        <button className="btns btn-remove" onClick={handleDeleteAccount}>YES</button>
      </div>
    </Modal>
  );
};

export default DeleteAccount;
