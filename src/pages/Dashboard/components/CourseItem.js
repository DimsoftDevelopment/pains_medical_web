import React from 'react';
import CourseMedicationItem from './CourseMedicationItem';

const CourseItem = ({course}) => {
  const courseMedications = course.course_medications.data.map(courseMedication => courseMedication.attributes);
  return (
    <div className="list__item">
      {courseMedications.map(courseMedication => (
        <CourseMedicationItem
          key={courseMedication.id}
          courseMedication={courseMedication}
        />
      ))}
    </div>
  );
};

export default CourseItem;
