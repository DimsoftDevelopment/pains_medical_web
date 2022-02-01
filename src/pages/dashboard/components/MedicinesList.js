import React from 'react';
import Reception from './Reception';

const MedicinesList = ({receptionMedications, toggleModal}) => {
  return (
    <div className="medicines__list">
      {receptionMedications.map(course => (
        <div key={course.id} className="list__item">
          {(course.receptions.data || []).map(reception => (
            <Reception
              key={reception.id}
              reception={reception.attributes}
              toggleModal={toggleModal}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default MedicinesList;
