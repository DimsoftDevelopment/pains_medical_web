import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import {config} from '../../../config';

const Reception = ({reception}) => {
  const medication = reception.medication.data.attributes || {};
  const medicationAttachment = medication.attachments.data[0];
  return (
    <div
      className={classNames("card", {
        missed: reception.status === 'mised',
      })}>
      <div className="medicine__time">{moment(reception.taking_date).format('h:mm')}</div>
      <div className="medicine__block">
        <button className="medicine__item missed btns" data-toggle="class" data-target="#popups" data-classes="missed">
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
