import React from 'react';
import {useSelector} from 'react-redux';
import PageWrapper from '../pageWrapper';
import EmptyList from './EmptyList';

const Courses = () => {
  const {courses} = useSelector(({coursesState}) => coursesState);
  const isEmpty = courses.length === 0;
  const handleCreateCourse = () => {};
  return (
    <PageWrapper showSideBar className={PageWrapper.WrapperClassNames.empty}>
      <div className="breadcrumbs">
        <h1 className="page__title">My Courses</h1>
      </div>
      <div className="content__block">
        {isEmpty && (
          <EmptyList handleCreateCourse={handleCreateCourse} />
        )}
      </div>
    </PageWrapper>
  );
};

export default Courses;
