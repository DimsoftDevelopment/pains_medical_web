import React from 'react';
import PropTypes from 'prop-types';

const AvatarInput = ({avatar, handleAvatar, handleClearAvatar}) => {
  return avatar ? (
    <div className="form__label--avatar-container">
      <button className="btn btn-close" onClick={handleClearAvatar}></button>
      <img src={avatar} className="form__label form__label--avatar" alt="avatar" />
    </div>
  ) : (
    <label htmlFor="uAvatar" className="form__label form__label--avatar">
      <input
        className="form__input--avatar"
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
