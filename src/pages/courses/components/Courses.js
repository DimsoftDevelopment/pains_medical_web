import React from 'react';
import CourseItem from './CourseItem';

const CoursesList = ({courses, isPast}) => {
  return (
    <div className="block__courses">
      <div className="courses__list courses__list--horizontal">
        {courses.map(course => (
          <CourseItem
            key={course.id}
            course={course}
            isPast={isPast}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
