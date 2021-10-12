import React from 'react';

const MedicationCard = ({medication}) => {
  return (
    <div className="card">
      <button className="medicine__item">
        <span className="medicine__image">
          <span className="image">
            <img src={medication.img_url} alt="MEDICINENAME" />
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
