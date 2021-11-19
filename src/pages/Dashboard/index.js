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

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReception, setSelectedReception] = useState(null);
  const dispatch = useDispatch();
  const toggleModal = reception => {
    setSelectedReception(reception);
    setShowModal(!showModal);
  };
  const {familyList} = useSelector(({familyState}) => familyState);
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
    dispatch(getReceptionMedicationsByUser(
      start_date,
      end_date,
    ));
    dispatch(getReceptionMedications());
    dispatch(getCourses());
  }, [dispatch]);
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
          handleCloseModal={toggleModal}
          isMissed={selectedReception.isMissed}
          isTaken={selectedReception.isTaken}
        />
      )}
    </PageWrapper>
  );
};

export default Dashboard;
