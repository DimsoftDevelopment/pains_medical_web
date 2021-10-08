import React from 'react';
import {useSelector} from 'react-redux';
import PageWrapper from '../pageWrapper';
import EmptyList from './EmptyList';

const Meds = () => {
  const {meds} = useSelector(({medsState}) => medsState);
  const isEmpty = meds.length === 0;
  const handleCreateMedication = () => {};
  return (
    <PageWrapper showSideBar className={PageWrapper.WrapperClassNames.empty}>
      <div className="breadcrumbs">
        <h1 className="page__title">My Medication</h1>
      </div>
      <div className="content__block">
        {isEmpty && (
          <EmptyList handleCreateMedication={handleCreateMedication} />
        )}
      </div>
    </PageWrapper>
  );
};

export default Meds;
