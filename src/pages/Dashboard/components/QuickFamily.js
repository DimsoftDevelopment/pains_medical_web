import React from 'react';
import PropTypes from 'prop-types';
import QuickFamilyItem from './QuickFamilyItem';

const QuickFamily = ({users, selectUser, selectedUser}) => {
  return (
    <section className="family">
      <div className="family__block">
        <div className="block__title">Quick access / Family Members</div>
        <div className="family__list">
          {users.map(user => (
            <QuickFamilyItem
              user={user}
              selectUser={selectUser}
              selectedUser={selectedUser}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

QuickFamily.propTypes = {
  users: PropTypes.arrayOf(QuickFamilyItem.UserType).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.string,
};

export default QuickFamily;
