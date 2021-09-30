import React from 'react';
import PageWrapper from '../pageWrapper';
import Calendar from './Calendar';

const Dashboard = () => {
  return (
    <PageWrapper
      className={PageWrapper.WrapperClassNames.home}
      showSideBar
    >
      <div className="breadcrumbs">
        <h1 className="page__title">HOME</h1>
      </div>
      <div className="content__block">
        <Calendar />
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
