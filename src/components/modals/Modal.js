import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({children, header, title, subtitle, className, showCloseButton}) => {
  return (
    <div className={`popup show ${className}`}>
      <div className="popup__overlay">
        <div className={`popup__block popup--${className}`}>
          {showCloseButton && (
            <div className="block__top">
              <button className="btn btn-close"></button>
            </div>
          )}
          <div className="block__title tac">
            {header} <br /> {title}
          </div>
          {subtitle && (
            <div className="form__row form__row--text tac">{subtitle}</div>
          )}
          <div className="block__content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalClasses = {
  phone: "phone",
  sms: "sms",
};

Modal.propTypes = {
  children: PropTypes.element,
  header: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.oneOf(Object.keys(ModalClasses)),
  showCloseButton: PropTypes.bool,
  subtitle: PropTypes.string,
};
Modal.ModalClasses = ModalClasses;

export default Modal;
