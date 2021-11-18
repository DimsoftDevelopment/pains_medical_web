import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  children,
  header,
  title,
  subtitle,
  className,
  showCloseButton,
  handleCloseModal,
  additionalClassNames,
}) => {
  return (
    <div className={`popup show ${className}`}>
      <div className="popup__overlay">
        <div className={`popup__block ${className ? `popup--${className}` : ""} ${additionalClassNames}`}>
          {showCloseButton && (
            <div className="block__top">
              <button className="btn btn-close" onClick={handleCloseModal}></button>
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
  pin: "pin",
  remove: "remove",
  invite: "invite",
  missed: "missed",
  taken: "taken",
  take: "take",
};

Modal.propTypes = {
  header: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.oneOf(Object.keys(ModalClasses)),
  showCloseButton: PropTypes.bool,
  subtitle: PropTypes.string,
  handleCloseModal: PropTypes.func,
  additionalClassNames: PropTypes.string,
};
Modal.ModalClasses = ModalClasses;
Modal.defaultProps = {
  additionalClassNames: "",
};

export default Modal;
