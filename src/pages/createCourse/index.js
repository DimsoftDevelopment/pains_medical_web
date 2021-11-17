import React, {useEffect, useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import PageWrapper from '../pageWrapper';
import {updateCourseProp} from './actions';
import {getMeds} from '../meds/actions';
import {ROUTES} from '../../router/routes';
import TextInput from '../../components/inputs/TextInput';
import DatePickerInput from '../../components/inputs/DatePicker';
import MedicationCard from './MedicationCard';
import SelectedMedication from './SelectedMedication';
import CourseMedication from './CourseMedication';
import medsIcon from '../../assets/img/icons/i-arrow_down.png';
import medsIcon2x from '../../assets/img/icons/i-arrow_down@2x.png';
import medsIcon3x from '../../assets/img/icons/i-arrow_down@3x.png';
import moment from 'moment';

const CreateCourse = () => {
  const {user} = useSelector(({authState}) => authState);
  const {course} = useSelector(({createCourseState}) => createCourseState);
  const {meds, medication} = useSelector(({medsState}) => medsState);
  const [selectedMedication, setMedication] = useState(medication);
  const [selectedMedicationIndex, setSelectedMedicationIndex] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: course.title || '',
    start_date: new Date(),
    end_date: new Date(),
    course_medications_attributes: [],
    user_id: user.id,
  });
  const [searchValue, setSearchValue] = useState('');
  const [showMedications, setShowMedications] = useState(false);
  const dispatch = useDispatch();
  // const isMedsEmpty = meds.length === 0;
  const {register, handleSubmit} = useForm({
    defaultValues: {
      title: course.title,
    },
  });
  const handleUpdateCourse = courseData => {
    const newCourseData = {
      ...newCourse,
      title: courseData.title,
    };
    dispatch(updateCourseProp(newCourseData));
  };
  const debounce = _.debounce(
    query => dispatch(getMeds({page: 1, per_page: 10, query})),
    500,
  );
  const handleSearch = useCallback(debounce, []);
  const handleChange = event => {
    const {value} = event.target;
    setSearchValue(value);
    handleSearch(value);
  };
  const handleMedDetails = medicationItem => {
    setMedication(medicationItem);
    // dispatch(getMedication(medication.id));
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
    dispatch(getMeds({
      page: 1,
      per_page: 10,
      query: '',
    }));
  }, [dispatch]);
  return (
    <PageWrapper
      className={PageWrapper.WrapperClassNames.empty}
      showSideBar
    >
      <div className="breadcrumbs">
        <h1 className="page__title">New Course</h1>
      </div>
      <div className="content__block">
        <section className="courses">
          <div className="courses__page">
            <form className="courses__add" onSubmit={handleSubmit(handleUpdateCourse)}>
              <div className="add__top">
                <Link
                  className="btns btn-back"
                  to={ROUTES.COURSES}
                >
                  <i className="icons i24x24 i-arrow_left"></i>
                </Link>
                <button
                  className="btns btn-save"
                  type="submit"
                >
                  CREATE COURSE
                </button>
              </div>
              <div className="add__form">
                <div className="form__top">
                  <div className="form__row form__row--columns">
                    <TextInput
                      register={register}
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
                  <div className="courses__medicines">
                    <div className="medicines__columns">
                      <div className="column">
                        <button
                          className="btns btn-add"
                          type="button"
                          onClick={handleShowMeds}
                          disabled={showMedications}
                        >
                          ADD MEDICINE
                        </button>
                      </div>
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
                {showMedications && (
                  <div className="form__bottom">
                    <div className="medicines__search">
                      <div className="search__form">
                        <label className="search__label" htmlFor="mSearch">Select medicine</label>
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
                      <div className="search__results">
                        <div className="medicines__list">
                          <div className="list__item">
                            {meds.map(medicationItem => (
                              <MedicationCard
                                key={medicationItem.id}
                                medication={medicationItem}
                                selectedMedication={selectedMedication}
                                handleMedDetails={handleMedDetails}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      {meds.length === 0 && (
                        <div className="search__noresults">
                          <p>
                            There is no such medicine in your library. Create it first.<br/>
                            <img
                              src={medsIcon}
                              srcSet={`${medsIcon2x} 2x, ${medsIcon3x} 3x`}
                              alt="MedsIcon"
                            />
                          </p>
                          <Link
                            className="btns btn-add"
                            to={ROUTES.CREATE_MEDICATION}
                          >
                            CREATE NEW MEDICINE
                          </Link>
                        </div>
                      )}
                    </div>
                    {(selectedMedication.id || selectedMedication.medication_id) && (
                      <SelectedMedication
                        medication={selectedMedication}
                        start_date={newCourse.start_date}
                        handleSelectedMedicines={handleSelectedMedicines}
                      />
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default CreateCourse;
