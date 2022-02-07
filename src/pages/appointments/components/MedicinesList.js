import React from 'react';
import Reception from './Reception';

const MedicinesList = ({appointments, toggleModal}) => {
  console.log('SOME INFO: ', appointments)
  return (
    <div className="appointments__list">
      {appointments.map(item => (
        <div key={item.id} className="list__item">
          <Reception
            key={item.id}
            appointment={item.attributes}
            toggleModal={toggleModal}
          />
        </div>
      ))}
    </div>
  );
}

export default MedicinesList;
