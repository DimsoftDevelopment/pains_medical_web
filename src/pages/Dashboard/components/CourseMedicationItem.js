import React from 'react';
import classNames from 'classnames';

const CourseMedicationItem = ({courseMedication}) => {
  const {
    medication_title,
    taken_medication_count,
    reception_medications_count,
    mised_medication_count,
  } = courseMedication;
  const receptionMissedCount = new Array(mised_medication_count).fill(null).map((_, index) => index);
  const receptionTakenCount = new Array(taken_medication_count).fill(null).map((_, index) => index);
  const receptionMedsCount = taken_medication_count + mised_medication_count - reception_medications_count;
  const receptionCount = new Array(receptionMedsCount >= 0 ? receptionMedsCount : 0).fill(null).map((_, index) => index);
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
        {receptionMissedCount.map(index => (
          <span key={index} className={classNames("slash", {missed: true})}></span>
        ))}
        {receptionTakenCount.map(index => (
          <span key={index} className={classNames("slash", {taken: true})}></span>
        ))}
        {receptionCount.map(index => (
          <span key={index} className={classNames("slash")}></span>
        ))}
      </div>
    </div>
  );
}

export default CourseMedicationItem;
