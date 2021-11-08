import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import PageWrapper from '../pageWrapper';
import EmptyList from './EmptyList';
import {getCourses} from './actions';
import {getCurrentPastCourses} from './helpers';
import {TABS} from './constants';
import {ROUTES} from '../../router/routes';

const Courses = () => {
  const [selectedTab, setSelectedTab] = useState(TABS[0].name);
  const dispatch = useDispatch();
  const {courses} = useSelector(({coursesState}) => coursesState);
  const isEmpty = courses.length === 0;
  const filteredCourses = getCurrentPastCourses(courses);
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <PageWrapper showSideBar className={PageWrapper.WrapperClassNames.empty}>
      <div className="breadcrumbs">
        <h1 className="page__title">My Courses</h1>
      </div>
      <div className="content__block">
        {isEmpty && (
          <EmptyList />
        )}
        {!isEmpty && (
          <section className="courses">
            <div className="courses__page">
              <Link
                className="btns btn-create"
                to={ROUTES.CREATE_COURSE}
              >
                Create new course
              </Link>
              <div className="tabs__wrapper"  id="tabs">
                <div className="tabs__menu">
                  <ul className="menu__list">
                    {TABS.map(tab => (
                      <li
                        key={tab.name}
                        className={classNames("list__item", {
                          'ui-state-active': tab.name === selectedTab
                        })}
                      >
                        <button
                          className="list__link btns"
                          onClick={() => setSelectedTab(tab.name)}
                        >
                          {`${filteredCourses[tab.name].length} ${tab.title}`}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </PageWrapper>
  );
};

export default Courses;
