import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../router/routes';
import clipboardIcon from '../../assets/img/icons/i-clipboard.png';
import clipboardIcon2x from '../../assets/img/icons/i-clipboard@2x.png';
import clipboardIcon3x from '../../assets/img/icons/i-clipboard@3x.png';

const EmptyList = () => {
  return (
    <section className="courses section--fullheight">
      <div className="courses__block block--fullheight">
        <div className="block__empty empty">
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
            <Link
              className="btns"
              to={ROUTES.CREATE_COURSE}
            >
              CREATE COURSE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmptyList;
