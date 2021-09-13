import React from 'react';
import PropTypes from 'prop-types';

const PageWrapper = ({children, className}) => {
  return (
    <div className={className}>
      <div className="page__wrapper">
        <div className="content__wrapper">
          <main className="content">
            {children}
          </main>
        </div>
        <footer className="footer">
          <div className="footer__content">
            <div className="footer__menu">
              <ul className="menu__list">
                <li className="menu__item"><a href="#" className="menu__link">Therms of services</a></li>
                <li className="menu__item"><a href="#" className="menu__link">Privacy policy</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const WrapperClassNames = {
  empty: '',
  home: 'home',
  signin: 'signin',
  family: 'family',
  settings: 'settings',
};

PageWrapper.propTypes = {
  className: PropTypes.oneOf(Object.keys(WrapperClassNames)).isRequired,
};

PageWrapper.WrapperClassNames = WrapperClassNames;

export default PageWrapper;
