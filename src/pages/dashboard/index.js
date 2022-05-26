import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PageWrapper from '../pageWrapper';
import QuickFamily from './components/QuickFamily';
import Calendar from './components/Calendar';
import ReceptionMedications from './components/ReceptionMedications';
import TakePill from '../../components/modals/TakePill';
import {
  getReceptionMedications,
  getReceptionMedicationsByUser,
} from './actions';
import {getFamilyList} from '../family/actions';
import {getCourses} from '../courses/actions';
import { getPatientsList } from '../patients/actions';
import { config } from '../../config'
import defaultAvatar from '../../assets/img/temp/avatar2.png'

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReception, setSelectedReception] = useState(null);
  const dispatch = useDispatch();
  const toggleModal = reception => {
    if(user.user_type !== 'doctor') {
      setSelectedReception(reception);
      setShowModal(!showModal);
    }
  };
  const {familyList} = useSelector(({familyState}) => familyState)
  const { patientsList } = useSelector(({patientsState}) => patientsState)
  const { user } = useSelector(({authState}) => authState)
  const [selectedPatient, setSelectedUser] = useState(null)
  const {
    start_date,
    end_date,
    selectedUser,
    receptionMedications,
    all_reception_dates,
    mised_reception_dates,
  } = useSelector(({dashboardState}) => dashboardState);
  const {courses} = useSelector(({coursesState}) => coursesState);
  useEffect(() => {
    dispatch(getFamilyList());
    dispatch(getPatientsList());
    dispatch(getReceptionMedicationsByUser(
      start_date,
      end_date,
      selectedPatient
    ));
    dispatch(getReceptionMedications());
    dispatch(getCourses(selectedPatient));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getReceptionMedicationsByUser(
      start_date,
      end_date,
      selectedPatient
    ))
    dispatch(getReceptionMedications())
    dispatch(getCourses(selectedPatient))
  }, [selectedPatient])
  useEffect(() => user.user_type === 'doctor' && patientsList.length > 0 && setSelectedUser(patientsList[0].id), [patientsList])
  const selectUser = user_id => {
    if (user_id === selectedUser) {
      dispatch(getReceptionMedicationsByUser(
        start_date,
        end_date,
      ));
    } else {
      dispatch(getReceptionMedicationsByUser(
        start_date,
        end_date,
        user_id
      ));
    }
  };
  const handleDateChange = date => {
    dispatch(getReceptionMedicationsByUser(
      date.start_date,
      date.end_date,
      selectedUser,
    ));
  };
  return (
    <PageWrapper
      className={PageWrapper.WrapperClassNames.home}
      showSideBar
    >
      <div className="breadcrumbs">
        <h1 className="page__title">HOME</h1>
      </div>
      <div className="content__block">
        {familyList.length > 0 && (
          <QuickFamily
            users={familyList}
            selectUser={selectUser}
            selectedUser={selectedUser}
          />
        )}
        {user.user_type === 'doctor' && <section className="patients">
          <div className="patients__block">
            <ul className="patients__list">
              {patientsList.map(item => 
                <li className={`list__item ${item.id === selectedPatient ? 'active' : ''}`} key={item.id} onClick={() => setSelectedUser(item.id)}>
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
        <Calendar
          onChangeDate={handleDateChange}
          courses={all_reception_dates}
          mised_reception_dates={mised_reception_dates}
        />
        <ReceptionMedications
          receptionMedications={receptionMedications}
          selectedDate={start_date}
          courses={courses}
          toggleModal={toggleModal}
        />
      </div>
      {showModal && (
        <TakePill
          reception={selectedReception}
          handleCloseModal={() => setShowModal(prev => false)}
          isMissed={selectedReception.isMissed}
          isTaken={selectedReception.isTaken}
        />
      )}
    </PageWrapper>
  );
};

export default Dashboard;
