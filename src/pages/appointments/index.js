import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PageWrapper from '../pageWrapper'
import Calendar from './components/Calendar'
import CreateAppointment from '../../components/modals/CreateAppointment'
import {
  addAppointment,
  getAppointments
} from './actions'
import ReceptionMedications from './components/ReceptionMedications'

const Appointments = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const { user } = useSelector(({authState}) => authState)

  const toggleModal = () => setShowModal(prev => !prev)

  const {
    start_date,
    appointments
  } = useSelector(({appointmentsState}) => appointmentsState)

  useEffect(() => {
    dispatch(getAppointments(start_date))
  }, [dispatch])
  const handleDateChange = date => {
    dispatch(getAppointments(date.start_date))
  };

  const handleCreation = data => {
    dispatch(addAppointment({
      place: data.place,
      user_id: data.user_id,
      start_date: new Date(`${data.start_date.split('T')[0]}T${data.time}`).toISOString(),
      end: () => setShowModal(false)
    }))
  }

  return (
    <PageWrapper
      className={PageWrapper.WrapperClassNames.home}
      showSideBar
    >
      <div className="content__top">
        <div className="top__content">
          <h1 className="page__title">Appointments</h1>
          <div className="top__btns">
            {user.user_type === 'doctor' && <button onClick={toggleModal} className="btns btn-userInvite btn-cta" data-toggle="class" data-target="#popups" data-classes="invite">Make an appointment</button>}
          </div>
        </div>
      </div>
      <div className="content__block">
        <Calendar
          onChangeDate={handleDateChange}
          mised_reception_dates={appointments}
        />
        <ReceptionMedications
          appointments={appointments}
          selectedDate={start_date}
          toggleModal={toggleModal}
        />
      </div>
      {showModal && (
        <CreateAppointment
          handleCloseModal={toggleModal}
          handleCreation={handleCreation}
        />
      )}
    </PageWrapper>
  );
};

export default Appointments;
