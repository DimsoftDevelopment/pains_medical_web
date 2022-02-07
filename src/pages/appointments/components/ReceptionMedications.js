import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {ROUTES} from '../../../router/routes';
import MedicinesList from './MedicinesList';
import CoursesList from './CoursesList';
import clipboardIcon from '../../../assets/img/icons/i-clipboard.png';
import clipboardIcon2x from '../../../assets/img/icons/i-clipboard@2x.png';
import clipboardIcon3x from '../../../assets/img/icons/i-clipboard@3x.png';

const ReceptionMedications = ({
  appointments,
  selectedDate,
  toggleModal,
}) => {
  const isEmpty = appointments.length === 0;
  const isToday = moment().date() === moment(selectedDate).date() ? 'Today, ' : '';
  const getSlashes = () => {
    const slashesCount = [];
    let receptionsDoneCount = 0;
    appointments.forEach(course => {
      (course?.receptions?.data || []).forEach(reception => {
        slashesCount.push(reception.attributes.status);
        receptionsDoneCount = reception.attributes.status !== 'upcoming' ? receptionsDoneCount + 1 : receptionsDoneCount;
      })
    });
    return {slashesCount, receptionsDoneCount};
  };
  const renderScheduledTitle = () => {
    const {slashesCount, receptionsDoneCount} = getSlashes();
    return (
      <div className="block__title block__title--schedule">
        <div className="date">{`${isToday}${moment(selectedDate).format('D MMM')}`}</div>
        <div className="count">{`${receptionsDoneCount}/${appointments.length}`}</div>
        <div className="slashes">
          {slashesCount.map((slash, index) => (
            <span
              key={`${slash}_${index}`}
              className={classNames("slash", {
                missed: slash === 'mised',
                taken: slash === 'taken',
              })}
            />
          ))}
        </div>
      </div>
    );
  };
  return (
    <section className="appointments">
      <div className="appointments__page">
        {(isEmpty) && (
          <div className="block__title">{`${isToday}${moment(selectedDate).format('D MMM')}`}</div>
        )}
        {!isEmpty && (
          <div className="block__medicines">
            <div className="block__title">{`${isToday}${moment(selectedDate).format('D MMM')}`}</div>
            <MedicinesList
              appointments={appointments}
              toggleModal={toggleModal}
            />
          </div>
        )}
        {(isEmpty) && (
          <div className="block__empty empty">
            <div className="empty__icon">
              <i className="icons i42x42 i-clipboard_hover"></i>
            </div>
            <div className="empty__title">No Appointments</div>
            <div className="empty__text">
              Want to create a new Appointment?
            </div>
            <div className="empty__btns">
              <button className="btns" data-toggle="class" data-target="#popups" data-classes="appointment">MAKE AN APPOINTMENT</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

ReceptionMedications.propTypes = {
  appointments: PropTypes.array,
  selectedDate: PropTypes.oneOfType([PropTypes.string, Date, PropTypes.object]),
};

export default ReceptionMedications;
