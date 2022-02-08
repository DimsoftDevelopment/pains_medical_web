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
  receptionMedications,
  selectedDate,
  courses,
  coursesPage,
  toggleModal,
}) => {
  const isEmpty = receptionMedications.length === 0;
  const isToday = moment().date() === moment(selectedDate).date() ? 'Today, ' : '';
  const getSlashes = () => {
    const slashesCount = [];
    let receptionsDoneCount = 0;
    receptionMedications.forEach(course => {
      (course.receptions.data || []).forEach(reception => {
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
        <div className="count">{`${receptionsDoneCount}/${receptionMedications.length}`}</div>
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
    <section className={classNames("schedule", {
      'section--fullheight': isEmpty,
    })}>
      <div className={classNames("schedule__block", {
        'block--fullheight': isEmpty,
      })}>
        {(isEmpty && !coursesPage) && (
          <div className="block__title">{`${isToday}${moment(selectedDate).format('D MMM')}`}</div>
        )}
        {!isEmpty && (
          <div className="block__medicines">
            {coursesPage ? (
              renderScheduledTitle()
            ) : (
              <div className="block__title">{`${isToday}${moment(selectedDate).format('D MMM')}`}</div>
            )}
            <MedicinesList
              receptionMedications={receptionMedications}
              toggleModal={toggleModal}
            />
          </div>
        )}
        {(!isEmpty && !coursesPage) && (
          <div className="block__courses">
            <div className="block__title">Courses</div>
            <CoursesList
              courses={courses}
            />
          </div>
        )}
        {(isEmpty && !coursesPage) && (
          <div className="block__empty empty">
            <div className="empty__icon">
              <img
                src={clipboardIcon}
                srcSet={`${clipboardIcon2x} 2x, ${clipboardIcon3x} 3x`}
                alt="clipboardIcon"
              />
            </div>
            <div className="empty__title">No Plans</div>
            <div className="empty__text">
              Want to create a medical course for this day?
            </div>
            <div className="empty__btns">
              <Link
                className="btns"
                to={ROUTES.CREATE_COURSE}
              >
                CREATE COURSE
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

ReceptionMedications.propTypes = {
  receptionMedications: PropTypes.array,
  selectedDate: PropTypes.oneOfType([PropTypes.string, Date, PropTypes.object]),
};

export default ReceptionMedications;
