import React from 'react';
import PropTypes from 'prop-types';

const AvatarInput = ({avatar, handleAvatar, handleClearAvatar, className, label}) => {
  return avatar ? (
    <div className="form__label--avatar-container">
      <img src={avatar} className={className ? className : "form__label form__label--avatar"} alt="avatar" />
      <button className="btn btn-close" onClick={handleClearAvatar}></button>
    </div>
  ) : (
    <label
      htmlFor="uAvatar"
      className={className ? className : "form__label form__label--avatar"}
    >
      <span className="user__abbr">{label}</span>
      <input
        className={className ? "" : "form__input--avatar"}
        accept="image/png, image/jpeg"
        id="uAvatar"
        type="file"
        name="uAvatar"
        onChange={handleAvatar}
      />
    </label>
  );
};

AvatarInput.propTypes = {
  avatar: PropTypes.string,
  handleAvatar: PropTypes.func.isRequired,
  handleClearAvatar: PropTypes.func.isRequired,
};

export default AvatarInput;
