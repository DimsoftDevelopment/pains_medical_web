import React from 'react';
import PageWrapper from '../pageWrapper';
import PhoneVerificationModal from '../../components/modals/PhoneVerificationModal';
import DoctorSignIn from './DoctorSignIn'

const SignIn = ({
  type = 'user'
}) => {
  return (
    <PageWrapper className={PageWrapper.WrapperClassNames.signin}>
      {type === 'doctor'
      ? <DoctorSignIn />
      : <PhoneVerificationModal />
      }
    </PageWrapper>
  );
};

export default SignIn;
