import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PageWrapper from '../pageWrapper';
import QuickFamily from './QuickFamily';
import Calendar from './Calendar';
import ReceptionMedications from './ReceptionMedications';
import {
  getReceptionMedications,
  getReceptionMedicationsByUser,
} from './actions';
import {getFamilyList} from '../family/actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {familyList} = useSelector(({familyState}) => familyState);
  const {
    start_date,
    end_date,
    selectedUser,
    receptionMedications,
  } = useSelector(({dashboardState}) => dashboardState);
  useEffect(() => {
    dispatch(getFamilyList());
    // dispatch(getReceptionMedications(
    //   start_date,
    //   end_date,
    // ));
  }, [dispatch]);
  const selectUser = user_id => {
    if (user_id === selectedUser) {
      dispatch(getReceptionMedications(
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
    if (!selectedUser) {
      dispatch(getReceptionMedications(
        date.start_date,
        date.end_date,
      ));
    } else {
      dispatch(getReceptionMedicationsByUser(
        date.start_date,
        date.end_date,
        selectedUser,
      ));
    }
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
        />
        <ReceptionMedications
          receptionMedications={receptionMedications}
          selectedDate={start_date}
        />
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
