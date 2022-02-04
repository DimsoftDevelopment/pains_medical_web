import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PageWrapper from '../pageWrapper'
import Calendar from './components/Calendar'
import CreateAppointment from '../../components/modals/CreateAppointment'
import {
  getAppointments
} from './actions'

const Appointments = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()

  const toggleModal = () => setShowModal(prev => !prev)

  const {
    start_date
  } = useSelector(({appointmentsState}) => appointmentsState)

  // useEffect(() => {
  //   dispatch(getAppointments(start_date))
  // }, [dispatch]);
  const handleDateChange = date => {
    dispatch(getAppointments(start_date))
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
        {/* <Calendar
          onChangeDate={handleDateChange}
          // mised_reception_dates={mised_reception_dates}
        /> */}
        <button onClick={toggleModal}>HOLA</button>
      </div>
      {showModal && (
        <CreateAppointment
          handleCloseModal={toggleModal}
          handleCreation={() => {}}
        />
      )}
    </PageWrapper>
  );
};

export default Appointments;
