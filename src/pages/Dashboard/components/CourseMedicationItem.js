import React from 'react';
import classNames from 'classnames';

const CourseMedicationItem = ({courseMedication}) => {
  const {
    medication_title,
    taken_medication_count,
    reception_medications_count,
    mised_medication_count,
  } = courseMedication;
  const receptionCount = new Array(reception_medications_count).fill(null).map((_, index) => index);
  receptionCount.forEach(index => receptionCount[index] = {
    taken: index < taken_medication_count,
    missed: index < mised_medication_count,
  });
  return (
    <div className="card">
      <div className="card__top">
        <div className="course__name">
          {medication_title}
        </div>
        <div className="course__counter">
          {`${taken_medication_count}/${reception_medications_count}`}
        </div>
      </div>
      <div className="course__slashes">
        {receptionCount.map(({taken, missed}, index) => (
          <span key={index} className={classNames("slash", {taken, missed})}></span>
        ))}
      </div>
    </div>
  );
}

export default CourseMedicationItem;
