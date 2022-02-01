import React from 'react';
import PageWrapper from '../pageWrapper';
import PhoneVerificationModal from '../../components/modals/PhoneVerificationModal';

const SignIn = () => {
  return (
    <PageWrapper className={PageWrapper.WrapperClassNames.signin}>
      <PhoneVerificationModal />
    </PageWrapper>
  );
};

export default SignIn;
