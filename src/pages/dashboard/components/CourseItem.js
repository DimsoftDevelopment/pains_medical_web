import React from 'react';
import classNames from 'classnames';
import CourseMedicationItem from './CourseMedicationItem';

const CourseItem = ({course}) => {
  const courseMedications = course.course_medications.data.map(courseMedication => courseMedication.attributes);
  let missedCount = 0;
  let totalCount = 0;
  let takenCount = 0;
  courseMedications.forEach(courseMedication => {
    missedCount = missedCount + courseMedication.mised_medication_count;
    totalCount = totalCount + courseMedication.reception_medications_count;
    takenCount = takenCount + courseMedication.taken_medication_count;
  });
  const receptionMissedCount = new Array(missedCount).fill(null).map((_, index) => index);
  const receptionTakenCount = new Array(takenCount).fill(null).map((_, index) => index);
  const receptionMedsCount = takenCount + missedCount - totalCount;
  const receptionCount = new Array(receptionMedsCount >= 0 ? receptionMedsCount : 1).fill(null).map((_, index) => index);
  return (
    <div className="list__item">
      {/* {courseMedications.map(courseMedication => (
        <CourseMedicationItem
          key={courseMedication.id}
          courseMedication={courseMedication}
        />
      ))} */}

      <div className="card">
        <div className="card__top">
          <div className="course__name">
            {course.title}
          </div>
          <div className="course__counter">
            {`${takenCount}/${totalCount}`}
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
    </div>
  );
};

export default CourseItem;
