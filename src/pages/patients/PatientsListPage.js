import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import PageWrapper from '../pageWrapper';
import EmptyList from './EmptyList';
import InviteMember from '../../components/modals/InviteMember';
import {getPatientsList, inviteMember} from './actions';
import defaultAvatar from '../../assets/img/temp/avatar2.png'
import {config} from '../../config';
import _ from 'lodash'

const PatientsListPage = ({
  handleSearch,
  handleSearchString,
  searchString
}) => {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [isEmptyAllowed, setIsEmptyAllowed] = useState(true)
  const {patientsList, isLoading} = useSelector(({patientsState}) => patientsState);
  console.log(patientsList)
  const dispatch = useDispatch();
  const isEmpty = patientsList.length === 0;
  const toggleModal = () => {
    setShowInviteModal(!showInviteModal);
  };
  const handleInvite = ({phone}) => {
    dispatch(inviteMember(phone));
    toggleModal()
  };

  return (
    <PageWrapper showSideBar className={PageWrapper.WrapperClassNames.family}>
      <div className="content__top">
        <div className="top__content">
          <h1 className="page__title">Patients</h1>
          {(!isEmpty || !isEmptyAllowed) && <div className="top__btns">
            <button onClick={toggleModal} className="btns btn-userInvite btn-cta" data-toggle="class" data-target="#popups" data-classes="invite">Invite new Patient</button>
          </div>}
        </div>
      </div>
      <div className="content__block">
        {isEmpty && !searchString && !isLoading && isEmptyAllowed && (
          <EmptyList handleInvite={toggleModal} type='Patients' />
        )}
        <section className="patients">
          <div className="patients__page">
            <div className="patients__search">
              <form className="form--search" onSubmit={handleSearch}>
                <div className="search__row">
                  <input
                    onFocus={() => setIsEmptyAllowed(false)}
                    onBlur={() => setIsEmptyAllowed(true)}
                    onChange={handleSearchString}
                    defaultValue={searchString}
                    className="search__input"
                    type="text"
                  />
                </div>
              </form>
            </div>
            <ul className="patients__list">
              {patientsList.map(item =>
              <li key={item.id} className="list__item">
                <div className="card">
                  <figure className="patient__avatar avatar">
                    <img className="image" src={item.attributes.avatar_url ? `${config.REACT_APP_IMAGE_URL}${item.attributes.avatar_url}` : defaultAvatar} alt={item.attributes.email} />
                  </figure>
                  <span className="patient__info">
                    <span className="patient__name"><span>{item.attributes.first_name}</span> <span>{item.attributes.last_name}</span></span>	
                    <Link className="patient__link" to={`/patients/${item.id}`}>View Profile</Link>
                  </span>					
                </div>
              </li>)}
            </ul>
          </div>
        </section>
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

export default PatientsListPage