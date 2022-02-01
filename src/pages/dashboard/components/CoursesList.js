import React from 'react';
import CourseItem from './CourseItem';

const CoursesList = ({courses}) => {
  return (
    <div className="courses__list">
      {courses.map(course => (
        <CourseItem
          key={course.id}
          course={course}
        />
      ))}
    </div>
  );
};

export default CoursesList;
