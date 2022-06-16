import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import PageWrapper from '../pageWrapper';
import EmptyList from './EmptyList';
import Calendar from '../dashboard/components/Calendar';
import ReceptionMedications from '../dashboard/components/ReceptionMedications';
import CoursesList from './components/Courses';
import TakePill from '../../components/modals/TakePill';
import {acceptInvitation, getCourses, getDoctors, getInvitation, removeDoctor, removeInvitation} from './actions';
import {
  getReceptionMedications,
  getReceptionMedicationsByUser,
} from '../dashboard/actions';
import {getCurrentPastCourses} from './helpers';
import {TABS} from './constants';
import {ROUTES} from '../../router/routes';
import defaultAvatar from '../../assets/img/temp/avatar2.png'
import {config} from '../../config'

const Doctors = () => {
  const { doctorsList, courses, invitations } = useSelector(({doctorsState}) => doctorsState)
  const { user } = useSelector(({authState}) => authState)
  const [selectedTab, setSelectedTab] = useState(TABS[0].name);
  const [showModal, setShowModal] = useState(false);
  const [selectedReception, setSelectedReception] = useState(null);
  const [removeModal, setRemoveModal] = useState(false)
  const toggleRemoveModal = () => setRemoveModal(prev => !prev)
  const dispatch = useDispatch();
  const {
    start_date,
    end_date,
    receptionMedications,
    all_reception_dates,
    mised_reception_dates,
  } = useSelector(({dashboardState}) => dashboardState)
  const [selectedUser, setSelectedUser] = useState(doctorsList[0]?.id)
  const isEmpty = courses.length === 0;
  const [filteredCourses, setFilteredCourses] = useState({past: [], current: []})
  useEffect(() => {
    dispatch(getDoctors())
    dispatch(getInvitation())
  }, [])
  useEffect(() => {
    (!selectedUser || doctorsList.findIndex(item => item.id === selectedUser) === -1) && doctorsList.length && setSelectedUser(doctorsList[0].id)
  }, [doctorsList])
  useEffect(() => {
    selectedUser && dispatch(getCourses(selectedUser))
  }, [selectedUser])
  useEffect(() => {
    setFilteredCourses(getCurrentPastCourses(courses))
  }, [courses])
  const isPast = selectedTab === TABS[1].name
  useEffect(() => {
    dispatch(getReceptionMedicationsByUser(
      start_date,
      end_date,
    ));
    dispatch(getReceptionMedications());
  }, []);
  const handleDateChange = date => {
    dispatch(getReceptionMedicationsByUser(
      date.start_date,
      date.end_date,
    ));
  };
  const toggleModal = reception => {
    setSelectedReception(reception);
    setShowModal(!showModal);
  };

  const handleInviteAccept = () => {
    dispatch(acceptInvitation(invitations[0].id))
  }
  const handleInviteReject = () => {
    dispatch(removeInvitation(invitations[0].id))
  }
  const handleDoctorRemove = () => {
    dispatch(removeDoctor(selectedUser))
    toggleRemoveModal()
  }
  return (
    <PageWrapper showSideBar className={PageWrapper.WrapperClassNames.courses}>
      <div className="content__top">
        <div className="top__content">
          <h1 className="page__title top__title">My Doctors</h1>
          <div className="x">
            {/* <Link
              className="btns btn-courseAdd btn-cta"
              to={ROUTES.CREATE_COURSE}
            >
              Create new course
            </Link> */}
          </div>
        </div>
      </div>
      <div className="content__block">
        <section className="patients">
          <div className="patients__block">
            <ul className="patients__list">
              {doctorsList.map(item => 
                <li className={`list__item ${item.id === selectedUser ? 'active' : ''}`} key={item.id} onClick={() => setSelectedUser(item.id)}>
                  <div className="list__link btns">
                    <figure className="patient__avatar avatar">
                      <img className="image" src={item.avatar_url ? `${config.REACT_APP_IMAGE_URL}${item.avatar_url}` : defaultAvatar} alt={item.email} />
                    </figure>
                    <span className="patient__name"><span>{item.first_name}</span> <span>{item.last_name}</span></span>
										{item.id === selectedUser && <span onClick={toggleRemoveModal} className="patient__notification">×</span>}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </section>
        {isEmpty ?
          <EmptyList doctors={!!doctorsList.length} />
        : (
          <section className="courses">
            <div className="courses__page">
              <div className="courses__tabs">
                <div className="tabs" id="tabs">
                  <div className="tabs__menu tabs__menu--switch">
                    <div className="menu">
                      <ul className="menu__list">
                        {TABS.map(tab => (
                          <li
                            key={tab.name}
                            className={classNames("list__item", {
                              'ui-state-active': tab.name === selectedTab
                            })}
                          >
                            <button
                              className="list__link btns"
                              onClick={() => setSelectedTab(tab.name)}
                            >
                              {`${filteredCourses[tab.name].length} ${tab.title}`}
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className='selector' style={{ width: 138, left: selectedTab === TABS[0].name ? 3 : 144 }} />
                    </div>
                  </div>
                </div>
								<div className="tabs__content">
									<div className="tab">
                    <CoursesList
                      courses={isPast ? filteredCourses.past : filteredCourses.current}
                      isPast={isPast}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      {invitations.length && <div className='invitation'>
        <div className='invitation__card'>
          <p className='invitation__title'>Invitation</p>
          <p className='invitation__details'>
            <strong>{invitations[0].doctor.data.attributes.first_name} {invitations[0].doctor.data.attributes.last_name}</strong>
            {' '}
            want to add you to the patient list
          </p>
          <div className='invitation__btns'>
            <button onClick={handleInviteAccept} className='btncustom btn-accept'>Accept</button>
            <button onClick={handleInviteReject} className='btncustom btn-cancel'>Reject</button>
          </div>
        </div>
      </div>}
      {removeModal && <div className='invitation' onClick={toggleRemoveModal}>
        <div className='invitation__card' onClick={e => e.stopPropagation()}>
          <p className='invitation__title'>Remove a Doctor</p>
          <p className='invitation__details'>
            Are you sure you want to remove
            {' '}
            <strong>
              {doctorsList.find(item => item.id === selectedUser)?.first_name}
              {' '}
              {doctorsList.find(item => item.id === selectedUser)?.last_name}
            </strong>
            {' '}
            from list of your doctors?
          </p>
          <div className='invitation__btns'>
            <button onClick={handleDoctorRemove} className='btns btn-accept'>Accept</button>
            <button onClick={toggleRemoveModal} className='btns btn-cancel'>Reject</button>
          </div>
        </div>
      </div>}
      {showModal && (
        <TakePill
          reception={selectedReception}
          handleCloseModal={toggleModal}
          isMissed={selectedReception.isMissed}
          isTaken={selectedReception.isTaken}
        />
      )}
    </PageWrapper>
  );
};

export default Doctors;
