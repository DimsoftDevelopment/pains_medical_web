import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactNotification, {store} from 'react-notifications-component';
import {toggleNotification} from './actions';
import {logout} from '../auth/actions';
import {ROUTES} from '../../router/routes';
import PinModal from '../../components/modals/PinModal';
import PinChanged from '../../components/modals/PinChanged';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css';

const PageWrapper = ({children, className, showSideBar}) => {
  const dispatch = useDispatch();
  const {
    isPinModalOpen,
    notification,
    isPinChangedOpen,
  } = useSelector(({pageWrapperState}) => pageWrapperState);
  const currentPage = window.location.pathname;
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleCloseNotification = () => {
    dispatch(toggleNotification(null));
  };
  useEffect(() => {
    if(notification) {
      store.addNotification({
        title: notification?.title || '',
        message: notification?.message || '',
        type: notification?.type || 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true
        },
        onRemoval: handleCloseNotification
      });
    }
  }, [notification]);

  return (
    <div className={className}>
      <ReactNotification />
      <div className="page__wrapper">
        <div className="content__wrapper">
          <main className="content">
            {children}
          </main>
          {showSideBar && (
            <aside className="sidebar">
              <div className="sidebar__header">
                Pains
              </div>
              <nav className="sidebar__nav">
                <ul className="menu__list menu__list--main">
                  <li className="menu__item">
                    <Link
                      className={
                        classnames("menu__link btns", {
                          active: ROUTES.DASHBOARD === currentPage
                        })
                      }
                      to={ROUTES.DASHBOARD}
                      title="Home"
                    >
                      <i className="icons i32x32 i-home"></i> Home	
                    </Link>
                  </li>
                  <li className="menu__item">
                    <Link
                      className={
                        classnames("menu__link btns", {
                          active: ROUTES.COURSES === currentPage
                        })
                      }
                      to={ROUTES.COURSES}
                      title="Courses"
                    >
                      <i className="icons i32x32 i-clipboard"></i> Courses
                    </Link>
                  </li>
                  <li className="menu__item">
                    <Link
                      className={
                        classnames("menu__link btns", {
                          active: ROUTES.MEDS === currentPage
                        })
                      }
                      to={ROUTES.MEDS}
                      title="Medicines"
                    >
                      <i className="icons i32x32 i-medicine"></i> Meds			
                    </Link>
                  </li>
                  <li className="menu__item @@nclass @@notification">
                    <Link
                      className={
                        classnames("menu__link btns", {
                          active: ROUTES.FAMILY === currentPage
                        })
                      }
                      to={ROUTES.FAMILY}
                      title="Family"
                    >
                      <i className="icons i32x32 i-users"></i> Family			
                    </Link>
                    <i className="notification family"></i>
                  </li>
                </ul>
                <ul className="menu__list menu__list--main">
                  <li className="menu__item">
                    <Link
                      className={
                        classnames("menu__link btns", {
                          active: ROUTES.SETTINGS === currentPage
                        })
                      }
                      to={ROUTES.SETTINGS}
                      title="Setting"
                    >
                      <i className="icons i32x32 i-gear"></i> Setting			
                    </Link>
                  </li>
                </ul>
                <ul className="menu__list menu__list--last">
                  <li className="menu__item">
                    <span className="menu__link btns" onClick={handleLogout} title="Logout">
                      Log out			
                    </span>
                  </li>
                </ul>
              </nav>
            </aside>
          )}
        </div>
        <footer className="footer">
          <div className="footer__content">
            <div className="footer__menu">
              <ul className="menu__list">
                <li className="menu__item"><button className="menu__link">Therms of services</button></li>
                <li className="menu__item"><button className="menu__link">Privacy policy</button></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
      {isPinModalOpen && (
        <PinModal />
      )}
      {isPinChangedOpen && (
        <PinChanged />
      )}
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
  showSideBar: PropTypes.bool,
};

PageWrapper.WrapperClassNames = WrapperClassNames;

export default PageWrapper;
