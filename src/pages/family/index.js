import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PageWrapper from '../pageWrapper';
import EmptyList from './EmptyList';
import InviteMember from '../../components/modals/InviteMember';
import {inviteMember} from './actions';

const Family = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const {familyList} = useSelector(({familyState}) => familyState);
  console.log(familyList)
  const dispatch = useDispatch();
  const isEmpty = familyList.length === 0;
  const toggleModal = () => {
    setShowInviteModal(!showInviteModal);
  };
  const handleInvite = ({phone}) => {
    dispatch(inviteMember(phone));
    toggleModal()
  };
  return (
    <PageWrapper showSideBar className={PageWrapper.WrapperClassNames.family}>
      <div className="breadcrumbs">
        <h1 className="page__title">Family Tracking</h1>
      </div>
      <div className="content__block">
        {isEmpty && (
          <EmptyList handleInvite={toggleModal} />
        )}
      </div>
      {showInviteModal && (
        <InviteMember
          handleCloseModal={toggleModal}
          handleInvite={handleInvite}
        />
      )}
    </PageWrapper>
  );
};

export default Family;
