import React from 'react';
import clipboardIcon from '../../assets/img/icons/i-clipboard.png';
import clipboardIcon2x from '../../assets/img/icons/i-clipboard@2x.png';
import clipboardIcon3x from '../../assets/img/icons/i-clipboard@3x.png';

const EmptyList = ({handleCreateCourse}) => {
  return (
    <section className="courses section--fullheight">
      <div className="courses__block block--fullheight">
        <div className="block__empty">
          <div className="empty__icon">
            <img
              src={clipboardIcon}
              srcSet={`${clipboardIcon2x} 2x, ${clipboardIcon3x} 3x`} alt="clipBoardIcon"
            />
          </div>
          <div className="empty__title">No Plans</div>
          <div className="empty__text">
            Want to create a medical course for this day?
          </div>
          <div className="empty__btns">
            <button className="btns" onClick={handleCreateCourse}>CREATE COURSE</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmptyList;
