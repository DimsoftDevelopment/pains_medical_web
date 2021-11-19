import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

const CourseItem = ({course, isPast}) => {
  const courseMedications = course.course_medications.data.map(courseMedication => courseMedication.attributes);
  let missedCount = 0;
  let totalCount = 0;
  let takenCount = 0;
  courseMedications.forEach(courseMedication => {
    missedCount = missedCount + courseMedication.mised_medication_count;
    totalCount = totalCount + courseMedication.reception_medications_count;
    takenCount = takenCount + courseMedication.taken_medication_count;
  });
  const missedPercent = `${missedCount / totalCount * 100}%`;
  const takenPercent = `${takenCount / totalCount * 100}%`;
  const totalPercent = `${totalCount > 0 ? ((missedCount + takenCount) / totalCount * 100) : 0}%`;
  return (
    <div className="list__item">
      <div className={classNames("card", {past: isPast})}>
        <div className="course__date">
          {`${moment(course.start_date).format('DD MMM')} - ${moment(course.end_date).format('DD MMM')}`}
          {missedCount > 0 && (
            <span className="notifications">{`${missedCount} MISSES`}</span>
          )}
        </div>
        <div className="card__top">
          <div className="course__name">{course.title}</div>
          <div className="course__counter">{totalPercent}</div>
        </div>
        <div className="course__slashes course__slashes--percent">
          <span className="slash taken" style={{width: takenPercent}}></span>
          <span className="slash missed" style={{width: missedPercent}}></span>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
