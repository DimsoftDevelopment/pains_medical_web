import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import clipboardIcon from '../../assets/img/icons/i-clipboard.png';
import clipboardIcon2x from '../../assets/img/icons/i-clipboard@2x.png';
import clipboardIcon3x from '../../assets/img/icons/i-clipboard@3x.png';

const ReceptionMedications = ({receptionMedications, selectedDate}) => {
  const isEmpty = receptionMedications.length === 0;
  const isToday = moment().date() === moment(selectedDate).date() ? 'Today, ' : '';
  return (
    <section className={classNames("schedule", {
      'section--fullheight': isEmpty,
    })}>
      <div className={classNames("schedule__block", {
        'block--fullheight': isEmpty,
      })}>
        {isEmpty && (
          <div className="block__title">{`${isToday}${moment(selectedDate).format('D MMM')}`}</div>
        )}
        {!isEmpty && (
          <div className="block__medicines">
            <div className="block__title">{`${isToday}${moment(selectedDate).format('D MMM')}`}</div>
              <div className="medicines__list">
    
              </div>
          </div>
        )}
        {isEmpty && (
          <div className="block__empty">
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
              <button className="btns">CREATE COURSE</button>
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
