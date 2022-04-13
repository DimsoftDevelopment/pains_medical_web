import React, {useEffect, useState, useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash'
import PageWrapper from '../pageWrapper';
import { updateCourseProp, setMedicationAction, setSelectedMedicationIndexAction } from './actions';
import {getMeds} from '../meds/actions';
import {createCourse} from '../courses/actions';
import {ROUTES} from '../../router/routes';
import TextInput from '../../components/inputs/TextInput';
import DatePickerInput from '../../components/inputs/DatePicker';
import MedicationCard from './MedicationCard';
import SelectedMedication from './SelectedMedication';
import CourseMedication from './CourseMedication';
import medsIcon from '../../assets/img/icons/i-arrow_down.png';
import medsIcon2x from '../../assets/img/icons/i-arrow_down@2x.png';
import medsIcon3x from '../../assets/img/icons/i-arrow_down@3x.png';
import defaultAvatar from '../../assets/img/temp/avatar2.png'
import { config } from '../../config'
import { getPatientsList } from '../patients/actions'
import moment from 'moment'

const CreateCourse = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const {user} = useSelector(({authState}) => authState);
  const { patientsList } = useSelector(({patientsState}) => patientsState);
  const {course, selectedMedication, selectedMedicationIndex} = useSelector(({createCourseState}) => createCourseState)
  const setMedication = medication => dispatch(setMedicationAction(medication))
  const setSelectedMedicationIndex = index => dispatch(setSelectedMedicationIndexAction(index))
  const {meds, medication} = useSelector(({medsState}) => medsState);
  // const [selectedMedication, setMedication] = useState(medication);
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchString, setSearchString] = useState('')
  const [showUserSelect, setShowUserSelect] = useState(false)
  // const [selectedMedicationIndex, setSelectedMedicationIndex] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: course.title || '',
    start_date: course.start_date || new Date(),
    end_date: course.end_date || new Date(),
    course_medications_attributes: course.course_medications_attributes || [],
    user_id: course.user_id ? course.user_id : user.user_type === 'doctor' ? null : user.id,
  });
  useEffect(() => {
    dispatch(updateCourseProp(newCourse))
  }, [newCourse])
  const [searchValue, setSearchValue] = useState('');
  const [showMedications, setShowMedications] = useState(false);
  const {register, handleSubmit} = useForm({
    defaultValues: {
      title: course.title,
    },
  });

  const handleSearchString = _.debounce(e => {
    setSearchString(e.target.value)
  }, 250)

  useEffect(() => dispatch(getPatientsList(searchString)), [searchString])

  useEffect(() => {
    if(patientsList.length > 0 && course.user_id) setSelectedUser(patientsList.find(item => item.id === course.user_id).attributes)
  }, [course, patientsList])

  const handleUpdateCourse = courseData => {
    const newCourseData = {
      ...newCourse,
      title: courseData.title,
    };
    dispatch(createCourse(newCourseData));
  };
  const selectUser = id => {
    setSelectedUser(patientsList.find(item => item.id === id).attributes)
    setNewCourse(prev => ({
      ...prev,
      user_id: id
    }))
    setShowUserSelect(false)
  }

  const disSelectUser = () => {
    setSelectedUser(null)
    setNewCourse(prev => ({
      ...prev,
      user_id: null
    }))
  }

  const debounce = _.debounce(
    query => dispatch(getMeds({page: 1, per_page: 10, query, user_id: selectedUser.id || ''})),
    500,
  );
  const handleSearch = useCallback(debounce, []);
  const handleChange = event => {
    const {value} = event.target;
    setSearchValue(value);
    handleSearch(value);
  };
  const handleMedDetails = medicationItem => {
    setMedication(medicationItem)
    setShowMedications(false)
    history.push(ROUTES.CREATE_COURSE_MEDICATION)
  };
  const handleShowMeds = () => {
    setShowMedications(true);
  };
  const handleStartDate = start_date => {
    setNewCourse({
      ...newCourse,
      start_date,
    });
  };
  const handleSelectedMedicines = medicine => {
    const medicines = [...newCourse.course_medications_attributes];
    if (selectedMedicationIndex || selectedMedicationIndex === 0) {
      medicines[selectedMedicationIndex] = {
        ...medicines[selectedMedicationIndex],
        ...medicine,
      };
      setSelectedMedicationIndex(null);
    } else {
      medicines.push(medicine);
    }
    setNewCourse({
      ...newCourse,
      end_date: moment(newCourse.end_date).isBefore(medicine.end_date) ? medicine.end_date : newCourse.end_date,
      course_medications_attributes: medicines,
    });
    setMedication({});
    setShowMedications(false);
  };
  const handleEditCourseMedicine = index => {
    const selectedMedicine = newCourse.course_medications_attributes[index];
    setMedication(selectedMedicine);
    setSelectedMedicationIndex(index);
    setShowMedications(true);
  };
  const handleDeleteCourseMedicine = index => {
    const medicines = [...newCourse.course_medications_attributes];
    medicines.splice(index, 1);
    setNewCourse({
      ...newCourse,
      course_medications_attributes: medicines,
    });
    setMedication({});
    setSelectedMedicationIndex(null);
    setShowMedications(false);
  };
  useEffect(() => {
    if(user.user_type === 'doctor') selectedUser && dispatch(getMeds({
      page: 1,
      per_page: 10,
      query: '',
      user_id: selectedUser.id
    }))
    else dispatch(getMeds({
      page: 1,
      per_page: 10,
      query: ''
    }))
  }, [selectedUser]);

  return (
    <PageWrapper
      className={PageWrapper.WrapperClassNames.courseAdd}
      showSideBar
    >
      <div className="content__top">
					<div className="top__content">
						<div className="top__link">
							<button onClick={history.goBack} className="btns btn-back" data-toggle="class" data-target="#popups" data-classes="leave">
								<i className="icons i24x24 i-chevron_left"></i>
							</button>
						</div>
						<div className="top__title">
							Create Courses
						</div>
            <button
              className="btns btn-save btn-cta"
              type="submit"
              onClick={e => document.getElementById('formToSubmit').submit()}
            >
              CREATE COURSE
            </button>
					</div>
				</div>
      <div className="content__block">
        <section className="courses">
          <div className="course__form">
            <form className="courses__add" id="formToSubmit" onSubmit={handleSubmit(handleUpdateCourse)}>
              <div className="course__form">
                {user.user_type === 'doctor' &&
                <div className="from__block form__block--patient">
                  <div className="form__row form__row--columns">
                    <div className="row__column row__column--2">
                      <button className="course__patient btns" onClick={() => selectedUser ? disSelectUser() : setShowUserSelect(true)} disabled={showUserSelect}>
                        <figure className="patient__avatar">
                          {selectedUser && <img style={{borderRadius: '50%'}} className="image" src={selectedUser.avatar_url ? `${config.REACT_APP_IMAGE_URL}${selectedUser.avatar_url}` : defaultAvatar} alt={selectedUser.email} />}
                        </figure>
                        <span className="patient__name">{selectedUser ? `${selectedUser.first_name} ${selectedUser.last_name}` : 'Choose patient'}</span>
                        <i className={`icons i24x24 i-${selectedUser ? 'close_red' : 'plus_hover'}`}></i>
                      </button>
                    </div>
                  </div>
                </div>}
                <div className="form__top">
                  <div className="form__row form__row--columns">
                    <TextInput
                      value={newCourse.title}
                      onChange={e => setNewCourse(prev => ({...prev, title: e.target.value}))}
                      required
                      name="title"
                      placeholder="Course"
                      type="text"
                      label="Course"
                      containerClassName="columns__column columns__column--course"
                    />
                    <DatePickerInput
                      onChange={handleStartDate}
                      value={newCourse.start_date}
                      id="start_date"
                      name="start_date"
                      label="Starts"
                      containerClassName="columns__column columns__column--start"
                    />
                    <DatePickerInput
                      id="end_date"
                      name="end_date"
                      value={newCourse.end_date}
                      label="End"
                      disabled
                      containerClassName="columns__column columns__column--end"
                    />
                  </div>
                  <div className="form__block form__block--medicines">
                    <div className="block__title">Medicine</div>
                    <div className="form__row form__row--columns">
                      <div className="row__column row__column--2">
                        <button className="btns btn-add" data-toggle="class" data-target="#popups" data-classes="medicine" onClick={handleShowMeds} disabled={showMedications || (!selectedUser ? user.user_type === 'doctor' ? true : false : false)}>
                          <i className="icons i24x24 i-medicine_circle"></i>
                          <span className="text">Choose medicine</span>
                          <i className="icons i24x24 i-plus_hover"></i>
                        </button>
                      </div>
                    </div>
                    <div className="course__schedule">
                      <div className='schedule__list'>
                        {newCourse.course_medications_attributes.map((courseMedication, index) => (
                          <CourseMedication
                            key={`${index}_${courseMedication.medication_id}`}
                            index={index}
                            courseMedication={courseMedication}
                            handleEditCourseMedicine={handleEditCourseMedicine}
                            handleDeleteCourseMedicine={handleDeleteCourseMedicine}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <section id="popups" className={`popup ${showUserSelect ? 'patient show' : ''} ${showMedications ? 'medicine show' : ''}`}>
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
                      <div className="popup__block popup--medicine medicines__popup">
                        <div className="block__top">
                          <button className="btns btn-close" onClick={() => setShowMedications(false)} data-toggle="class" data-target="#popups" data-classes="medicine">
                            <i className="icons i24x24 i-close"></i>
                          </button>
                        </div>
                        <div className="block__title tac">Select Medicine</div>
                        <div className="block__content">
                          <div className="medicines__search">
                            <form className="form--search">
                              <div className="search__row">
                                <input className="search__input" type="text" name="uName" />
                              </div>
                            </form>
                          </div>
                          <div className="medicines__results">
                            <ul className="medicines__list">
                              {meds.map(medicationItem => (
                                <MedicationCard
                                  key={medicationItem.id}
                                  medication={medicationItem}
                                  selectedMedication={selectedMedication}
                                  handleMedDetails={handleMedDetails}
                                />
                              ))}
                            </ul>
                          </div>
                          {meds.length === 0 && <div className="medicines__noresults">
                            <p>
                              There is no such medicine in your library. Create it first.
                            </p>
                            <p>
                              <i className="icons i32x32 i-arrow_down"></i>
                            </p>
                            <div className="noresults__btns">
                              <Link
                                className="btns btn-add"
                                to={ROUTES.CREATE_MEDICATION}
                              >
                                <i className="icons i24x24 i-medicine_circle"></i>
                                <span className="text">CREATE NEW MEDICINE</span>
                                <i className="icons i24x24 i-plus"></i>
                              </Link>
                            </div>
                          </div>}
                        </div>
                      </div>		
                    </div>
                  </div>
                </section>
              </div>
            </form>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

{/* <SelectedMedication
medication={selectedMedication}
start_date={newCourse.start_date}
handleSelectedMedicines={handleSelectedMedicines}
/> */}

export default CreateCourse;
