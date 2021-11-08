import React from 'react';
import classNames from 'classnames';
import {config} from '../../config';

const MedicationCard = ({medication, handleMedDetails, selectedMedication}) => {
  const attachments = medication.attachments.data.map(attachment => attachment.attributes);
  const getMedication = () => {
    handleMedDetails(medication);
  };
  return (
    <div className={classNames("card", {
      active: medication.id === selectedMedication.id,
      inactive: selectedMedication.id && medication.id !== selectedMedication.id,
    })}>
      <button
        className="medicine__item"
        onClick={getMedication}
        type="button"
      >
        <span className="medicine__image">
          <span className="image">
            {attachments.length > 0 &&
              <img
                key={attachments[0].id}
                className="image"
                src={`${config.REACT_APP_IMAGE_URL}${attachments[0].file_thumb_url}`}
                alt={`attachment_${attachments[0].id}`}
              />
            }
          </span>
        </span>
        <span className="medicine__text">
          <span className="medicine__name">{medication.title}</span>
          
        </span>
        <span className="medicine__store">
          <span className="medicine__quantity">{`${medication.availability_count} ${medication.dosage_form}`}</span>
          <span className="medicine__period">{medication.notes}</span>
        </span>
      </button>
    </div>
  );
}

export default MedicationCard;
