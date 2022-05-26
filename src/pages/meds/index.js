import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {push} from 'connected-react-router';
import _ from 'lodash';
import PageWrapper from '../pageWrapper';
import EmptyList from './EmptyList';
import List from './List';
import MedicationDetails from './MedicationDetails';
import {getMeds, getMedication} from './actions';
import {ROUTES} from '../../router/routes';
import defaultAvatar from '../../assets/img/temp/avatar2.png'
import {config} from '../../config'

const Meds = () => {
  const { patientsList } = useSelector(({patientsState}) => patientsState)
  const { user } = useSelector(({authState}) => authState)
  const [searchValue, setSearchValue] = useState('');
  const [selectedUser, setSelectedUser] = useState(user.user_type === 'doctor' ? patientsList[0]?.id : user.id)
  const dispatch = useDispatch();
  const {meds, meta, medication} = useSelector(({medsState}) => medsState);
  const isEmpty = meds.length === 0;
  const handleSearch = useCallback(_.debounce(
    query => dispatch(getMeds({page: 1, per_page: 10, query, user_id: selectedUser})),
    500,
  ), []);
  const handleChange = event => {
    const {value} = event.target;
    setSearchValue(value);
    handleSearch(value);
  };
  const handleMedDetails = medication => {
    dispatch(getMedication(medication.id));
  };
  const handleEdit = () => {
    dispatch(push(`/edit-medication/${medication.id}`));
  };
  useEffect(() => {
    dispatch(getMeds({...meta, user_id: selectedUser}));
  }, [selectedUser]);
  useEffect(() => {
    if(meds.length) dispatch(getMedication(meds[0].id))
  }, [meds])
  return (
    <PageWrapper showSideBar className={PageWrapper.WrapperClassNames.meds}>
      <div className="content__top">
        <div className="top__content">
          <h1 className="page__title">{user.user_type === 'doctor' ? 'Meds' : 'My Medication'}</h1>
          <div className="x">
            <Link
              className="btns btn-courseAdd btn-cta"
              to={ROUTES.CREATE_MEDICATION}
            >
              Add new medicine
            </Link>
          </div>
        </div>
      </div>
      <div className="content__block">
        {user.user_type === 'doctor' && <section className="patients">
          <div className="patients__block">
            <ul className="patients__list">
              {patientsList.map(item => 
                <li className={`list__item ${item.id === selectedUser ? 'active' : ''}`} key={item.id} onClick={() => setSelectedUser(item.id)}>
                  <div className="list__link btns">
                    <figure className="patient__avatar avatar">
                      <img className="image" src={item.attributes.avatar_url ? `${config.REACT_APP_IMAGE_URL}${item.attributes.avatar_url}` : defaultAvatar} alt={item.attributes.email} />
                    </figure>
                    <span className="patient__name"><span>{item.attributes.first_name}</span> <span>{item.attributes.last_name}</span></span>
										{!!item.attributes.medications_count && <span className="patient__notification">{item.attributes.medications_count}</span>}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </section>}
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
                <List
                  meds={meds}
                  handleMedDetails={handleMedDetails}
                  selectedMedication={medication}
                />
              </div>
							<div className="medicines__details">
                {medication.id && (
                  <MedicationDetails
                    medication={medication}
                    handleEdit={handleEdit}
                  />
                )}
							</div>
            </div>
          </section>
        )}
      </div>
    </PageWrapper>
  );
};

export default Meds;
