import React from 'react';
import ListItem from './ListItem';

const List = ({meds, handleMedDetails, selectedMedication}) => {
  return (
    <div className="search__results">
      <div className="medicines__list">
        {meds.map(medication => (
          <ListItem
            key={medication.id}
            medication={medication}
            handleMedDetails={handleMedDetails}
            selectedMedication={selectedMedication}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
