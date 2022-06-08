import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import {config} from '../../../config';
import { Link } from 'react-router-dom'

const Appointment = ({appointment, toggleModal}) => {
  const isMissed = appointment.status === 'mised'
  const isTaken = appointment.status === 'taken'
  const openModal = () => {
    toggleModal({
      ...appointment,
      isMissed,
      isTaken,
    });
  };
  return (
    <div
      className={classNames("card", {
        missed: isMissed,
        taken: isTaken,
      })}>
      <div className="appointment__time">{moment(appointment.start_date).format('HH:MM')}</div>
      <span className="appointment__text">
        {appointment.user ?
        <Link className="appointment__patient" to={`/patients/${appointment.user.data.id}`}>{appointment.user.data.attributes.first_name} {appointment.user.data.attributes.last_name}</Link>
        :
        <Link className="appointment__patient" to={`/doctors/${appointment.doctor.data.id}`}>{appointment.doctor.data.attributes.first_name} {appointment.doctor.data.attributes.last_name}</Link>
        }
        <span className="appointment__location">{appointment.place}</span>
      </span>
      <span className="appointment__icon">
        <span className="icon">
        </span>
      </span>
    </div>
  );
};

export default Appointment;
