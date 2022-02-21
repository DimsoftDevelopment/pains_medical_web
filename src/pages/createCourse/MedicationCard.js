import React from 'react';
import {config} from '../../config';

const MedicationCard = ({medication, handleMedDetails, selectedMedication}) => {
  const attachments = medication.attachments.data.map(attachment => attachment.attributes);
  const getMedication = () => {
    handleMedDetails(medication);
  };
  return (
    <li className="list__item">
      <button className="card btns" onClick={getMedication} >
        <figure className="medicine__image">
          <img
            className="image"
            src={`${config.REACT_APP_IMAGE_URL}${attachments[0]?.file_thumb_url}`}
            alt={`attachment`}
          />
        </figure>
        <div className="medicine__info">
          <span className="medicine__name">{medication.title}</span>
        </div>
      </button>
    </li>
  );
}

export default MedicationCard;
