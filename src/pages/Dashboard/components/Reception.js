import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import {config} from '../../../config';

const Reception = ({reception, toggleModal}) => {
  const medication = reception.medication.data.attributes || {};
  const medicationAttachment = medication.attachments.data[0];
  const isMissed = reception.status === 'mised';
  const isTaken = reception.status === 'taken';
  const openModal = () => {
    toggleModal({
      ...reception,
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
      <div className="medicine__time">{moment(reception.taking_date).format('HH:mm')}</div>
      <div className="medicine__block">
        <button
          className={classNames("medicine__item", {
            missed: isMissed,
            taken: isTaken,
            btns: true,
          })}
          onClick={openModal}
        >
          <span className="medicine__text">
            <span className="medicine__name">{medication.title}</span>
            <span className="medicine__quantity">
              {`x ${reception.dose} ${reception.dosage_form}`}
            </span>
          </span>
          <span className="medicine__image">
            <span className="image">
              {medicationAttachment && (
                <img
                  src={`${config.REACT_APP_IMAGE_URL}${medicationAttachment.attributes.file_thumb_url}`}
                  width={52}
                  height={52}
                  alt={medication.title}
                />
              )}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Reception;
