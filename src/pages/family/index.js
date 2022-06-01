import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PageWrapper from '../pageWrapper';
import EmptyList from './EmptyList';
import InviteMember from '../../components/modals/InviteMember';
import {inviteMember} from './actions';
import defaultAvatar from '../../assets/img/temp/avatar2.png'
import {Link} from 'react-router-dom';

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
        <section className="patients">
          <div className="patients__page">
            <div className="patients__search">
              {/* <form className="form--search" onSubmit={handleSearch}>
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
              </form> */}
            </div>
            <ul className="patients__list">
              {familyList.map(item =>
              <li key={item.id} className="list__item">
                <div className="card">
                  <figure className="patient__avatar avatar">
                    <img className="image" src={item.avatar_url ? `${process.env.REACT_APP_IMAGE_URL}${item.avatar_url}` : defaultAvatar} alt={item.email} />
                  </figure>
                  <span className="patient__info">
                    <span className="patient__name"><span>{item.first_name}</span> <span>{item.last_name}</span></span>	
                    {/* <Link className="patient__link" to={`/patients/${item.id}`}>View Profile</Link> */}
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

export default Family;
