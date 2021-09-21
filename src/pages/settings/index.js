import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import ProfileForm from './ProfileForm';

const Settings = () => {
  return (
    <PageWrapper
      className={PageWrapper.WrapperClassNames.settings}
      showSideBar
    >
      <div className="breadcrumbs">
        <h1 className="page__title">Settings</h1>
      </div>
      <div className="content__block">
        <section className="settings__page">
          <ProfileForm />
        </section>
      </div>
    </PageWrapper>
  );
};

export default Settings;
