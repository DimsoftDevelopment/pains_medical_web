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
import {getCourses} from './actions';
import {
  getReceptionMedications,
  getReceptionMedicationsByUser,
} from '../dashboard/actions';
import {getCurrentPastCourses} from './helpers';
import {TABS} from './constants';
import {ROUTES} from '../../router/routes';
import defaultAvatar from '../../assets/img/temp/avatar2.png'
import {config} from '../../config'

const Courses = () => {
  const { patientsList } = useSelector(({patientsState}) => patientsState)
  const { user } = useSelector(({authState}) => authState)
  const [selectedTab, setSelectedTab] = useState(TABS[0].name);
  const [showModal, setShowModal] = useState(false);
  const [selectedReception, setSelectedReception] = useState(null);
  const dispatch = useDispatch();
  const {
    start_date,
    end_date,
    receptionMedications,
    all_reception_dates,
    mised_reception_dates,
  } = useSelector(({dashboardState}) => dashboardState);
  const [selectedUser, setSelectedUser] = useState(user.user_type === 'doctor' ? patientsList[0]?.id : null)
  const {courses} = useSelector(({coursesState}) => coursesState);
  const isEmpty = courses.length === 0;
  const [filteredCourses, setFilteredCourses] = useState({past: [], current: []})
  useEffect(() => {
    dispatch(getCourses(selectedUser))
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
  return (
    <PageWrapper showSideBar className={PageWrapper.WrapperClassNames.courses}>
      <div className="content__top">
        <div className="top__content">
          <h1 className="page__title top__title">{user.user_type === 'user' ? 'My ' : ''}Courses</h1>
          <div className="x">
            <Link
              className="btns btn-courseAdd btn-cta"
              to={ROUTES.CREATE_COURSE}
            >
              Create new course
            </Link>
          </div>
        </div>
      </div>
      <div className="content__block">
        {user.user_type === 'doctor' && <section className="patients">
          <div className="patients__block">
            <ul className="patients__list">
              {patientsList.map(item => 
                <li className={`list__item ${item.id === selectedUser ? 'active' : ''}`} key={item.id} onClick={() => setSelectedUser(item.id)}>
                  <div className="list__link btns">
                    <figure className="patient__avatar avatar">
                      <img className="image" src={item.attributes.avatar_url ? `${config.REACT_APP_IMAGE_URL}${item.attributes.avatar_url}` : defaultAvatar} alt={item.attributes.email} />
                    </figure>
                    <span className="patient__name"><span>{item.attributes.first_name}</span> <span>{item.attributes.last_name}</span></span>
										{!!item.attributes.courses_count && <span className="patient__notification">{item.attributes.courses_count}</span>}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </section>}
        {isEmpty ?
          <EmptyList />
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
                    {user.user_type === 'user' && 
                      <Calendar
                        onChangeDate={handleDateChange}
                        courses={all_reception_dates}
                        mised_reception_dates={mised_reception_dates}
                      />
                    }
                    <CoursesList
                      courses={isPast ? filteredCourses.past : filteredCourses.current}
                      isPast={isPast}
                    />
                    {user.user_type === 'user' && 
                      <ReceptionMedications
                        receptionMedications={receptionMedications}
                        selectedDate={start_date}
                        coursesPage
                        toggleModal={toggleModal}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
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

export default Courses;
