import React from 'react';
import {useSelector} from 'react-redux';
import PhoneModal from './PhoneModal';
import CodeModal from './CodeModal';
import 'react-phone-number-input/style.css';

const PhoneVerificationModal = () => {
  const {phone} = useSelector(({authState}) => authState);
  return phone ? (
    <CodeModal />
  ) : (
    <PhoneModal />
  );
};

export default PhoneVerificationModal;
