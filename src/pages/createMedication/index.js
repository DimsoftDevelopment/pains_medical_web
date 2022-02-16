import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {goBack, push} from 'connected-react-router';
import { getPatientsList } from '../patients/actions'
import PageWrapper from '../pageWrapper';
import TextInput from '../../components/inputs/TextInput';
import {saveMedicationTitle} from '../meds/actions';
import arrowIcon from '../../assets/img/icons/i-arrow_left.png';
import arrowIcon2x from '../../assets/img/icons/i-arrow_left@2x.png';
import arrowIcon3x from '../../assets/img/icons/i-arrow_left@3x.png';
import _ from 'lodash'
import { config } from '../../config'
import defaultAvatar from '../../assets/img/temp/avatar2.png'

const CreateMedication = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({authState}) => authState)
  const { patientsList } = useSelector(({patientsState}) => patientsState)
  const [showUserSelect, setShowUserSelect] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchString, setSearchString] = useState('')
  const {handleSubmit, register} = useForm();
  const handleCreateMedication = data => {
    dispatch(saveMedicationTitle({...data, user_id: selectedUser?.id}));
    dispatch(push('/edit-medication'));
  };
  const handleBack = () => {
    dispatch(goBack());
  };


  const selectUser = id => {
    register('user_id', {value: id})
    setSelectedUser(patientsList.find(item => item.id === id).attributes)
    setShowUserSelect(false)
  }

  const disSelectUser = () => {
    setSelectedUser(null)
  }

  const handleSearchString = _.debounce(e => {
    setSearchString(e.target.value)
  }, 250)

  useEffect(() => dispatch(getPatientsList(searchString)), [searchString])

  return (
    <PageWrapper
      className={PageWrapper.WrapperClassNames.addMed}
      showSideBar
    >
      <div className="content__top">
        <div className="top__content">
          <div className="top__link">
            <button className="btns btn-back" onClick={handleBack}>
              <i className="icons i24x24 i-chevron_left"></i>
            </button>
          </div>
          <div className="top__title">
            Create Medication
          </div>
        </div>
      </div>
      <div className="content__block">
        <form className="medicines section--fullheight courses__add" onSubmit={handleSubmit(handleCreateMedication)}>
          <div className="medicines__create page--fullheight">
            <div className="create__content create__content--center">
              <div className="name">
                <TextInput
                  register={register}
                  name="title"
                  required
                  label="Name"
                  id="medicationTitle"
                  placeholder="Medicine name"
                />
                {user.user_type === 'doctor' &&
                  <div className="course__form">
                    <div className="from__block form__block--patient">
                      <div className="form__row form__row--columns">
                        <button className="course__patient btns" onClick={() => selectedUser ? disSelectUser() : setShowUserSelect(true)} disabled={showUserSelect}>
                          <figure className="patient__avatar">
                            {selectedUser && <img style={{borderRadius: '50%'}} className="image" src={selectedUser.avatar_url ? `${config.REACT_APP_IMAGE_URL}${selectedUser.avatar_url}` : defaultAvatar} alt={selectedUser.email} />}
                          </figure>
                          <span className="patient__name">{selectedUser ? `${selectedUser.first_name} ${selectedUser.last_name}` : 'Choose patient'}</span>
                          <i className={`icons i24x24 i-${selectedUser ? 'close_red' : 'plus_hover'}`}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                }
                <div className="name__btns">
                  <button disabled={user.user_type === 'doctor' ? selectedUser ? false : true : false} className="btns btn-continue">CONTINUE</button>
                </div>
              </div>
            </div>
          </div>
          <section id="popups" className={`popup ${showUserSelect ? 'patient show' : ''}`}>
            <div className="popup__overlay" onClick={() => setShowUserSelect(false)}>
              <div onClick={e => e.stopPropagation()}>
                <div className="popup__block popup--leave">
                  <div className="block__title tac">Leave this page</div>
                  <div className="block__content tac">
                    <p>
                      If you leave this page, all changes made will be lost
                    </p>
                  </div>
                  <div className="block__btns">
                    <button className="btns btn-cancel" data-toggle="class" data-target="#popups" data-classes="leave">CANCEL</button>
                    <a className="btns btn-remove" href="courses.html">Yes, leave</a>
                  </div>
                </div>
                <div className="popup__block popup--patient patients__popup">
                  <div className="block__top">
                    <button className="btns btn-close" onClick={() => setShowUserSelect(false)}>
                      <i className="icons i24x24 i-close"></i>
                    </button>
                  </div>
                  <div className="block__title tac">Choose a patient</div>
                  <div className="block__content">
                    <div className="patients__search">
                      <form className="form--search">
                        <div className="search__row">
                          <input className="search__input" onChange={handleSearchString} defaultValue={searchString} type="text" name="uName" />
                        </div>
                      </form>
                    </div>
                    <div className="patients__results">
                      <ul className="patients__list">
                        {patientsList.map(item => 
                          <li className="list__item" key={item.id} id={item.id} onClick={() => selectUser(item.id)}>
                            <div className="card">
                              <figure className="patient__avatar avatar">
                                <img className="image" src={item.attributes.avatar_url ? `${config.REACT_APP_IMAGE_URL}${item.attributes.avatar_url}` : defaultAvatar} alt={item.attributes.email} />
                              </figure>
                              <div className="patient__info">
                                <span className="patient__name">{item.attributes.first_name} {item.attributes.last_name}</span>
                              </div>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </PageWrapper>
  );
};

export default CreateMedication;
