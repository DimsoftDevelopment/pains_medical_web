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

const Courses = () => {
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
  const {courses} = useSelector(({coursesState}) => coursesState);
  const isEmpty = courses.length === 0;
  const filteredCourses = getCurrentPastCourses(courses);
  const isPast = selectedTab === TABS[1].name
  useEffect(() => {
    dispatch(getReceptionMedicationsByUser(
      start_date,
      end_date,
    ));
    dispatch(getReceptionMedications());
    dispatch(getCourses());
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
      <div className="breadcrumbs">
        <h1 className="page__title">My Courses</h1>
      </div>
      <div className="content__block">
        {isEmpty && (
          <EmptyList />
        )}
        {!isEmpty && (
          <section className="courses">
            <div className="courses__page">
              <Link
                className="btns btn-create"
                to={ROUTES.CREATE_COURSE}
              >
                Create new course
              </Link>
              <div className="tabs__wrapper" id="tabs">
                <div className="tabs__menu">
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
                </div>
								<div className="tabs__content">
									<div className="tab">
                    <CoursesList
                      courses={isPast ? filteredCourses.past : filteredCourses.current}
                      isPast={isPast}
                    />
                    <Calendar
                      onChangeDate={handleDateChange}
                      courses={all_reception_dates}
                      mised_reception_dates={mised_reception_dates}
                    />
                    <ReceptionMedications
                      receptionMedications={receptionMedications}
                      selectedDate={start_date}
                      coursesPage
                      toggleModal={toggleModal}
                    />
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
