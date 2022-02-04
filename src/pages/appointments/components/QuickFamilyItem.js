import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const QuickFamilyItem = ({user, selectUser, selectedUser}) => {
  return (
    <div className={classNames("list__item", {
      active: selectedUser === user.id,
    })}>
      <button className="list__link btns" onClick={selectUser}>
        <figure className="family__avatar avatar">
          <img src={user.avatar_thumb_url} alt="USERNAME" />
        </figure>
        <span className="family__name"><span>{user.first_name}</span> <span>{user.last_name}</span></span>
      </button>
    </div>
  );
};

const UserType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  avatar_thumb_url: PropTypes.string,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
});

QuickFamilyItem.UserType = UserType;
QuickFamilyItem.propsTypes = {
  user: UserType,
  selectUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.string,
};

export default QuickFamilyItem;
