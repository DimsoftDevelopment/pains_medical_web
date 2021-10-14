import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import PageWrapper from '../pageWrapper';
import EmptyList from './EmptyList';
import List from './List';
import {getMeds} from './actions';
import {ROUTES} from '../../router/routes';

const Meds = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const {meds, meta} = useSelector(({medsState}) => medsState);
  const isEmpty = meds.length === 0;
  const handleSearch = useCallback(_.debounce(
    query => dispatch(getMeds({page: 1, per_page: 10, query})),
    500,
  ), []);
  const handleChange = event => {
    const {value} = event.target;
    setSearchValue(value);
    handleSearch(value);
  }
  useEffect(() => {
    dispatch(getMeds(meta));
  }, []);
  return (
    <PageWrapper showSideBar className={PageWrapper.WrapperClassNames.empty}>
      <div className="breadcrumbs">
        <h1 className="page__title">My Medication</h1>
      </div>
      <div className="content__block">
        {isEmpty && !searchValue ? (
          <EmptyList />
        ) : (
					<section className="medicines">
						<div className="medicines__page">
							<div className="medicines__search">
								<div className="search__form">
									<input
                    className="search__input"
                    name="mSearch"
                    id="mSearch"
                    type="text"
                    placeholder=""
                    value={searchValue}
                    onChange={handleChange}
                  />
								</div>
                <List meds={meds} />
              </div>
							<div className="medicines__details">
								<div className="details__btns details__btns--top">
									<Link
                    className="btns btn-add"
                    to={ROUTES.CREATE_MEDICATION}
                  >
                    ADD NEW MEDICINE
                  </Link>
								</div>
							</div>
            </div>
          </section>
        )}
      </div>
    </PageWrapper>
  );
};

export default Meds;
