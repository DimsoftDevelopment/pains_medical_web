import React, {useEffect, useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import PageWrapper from '../pageWrapper';
import {updateCourseProp} from './actions';
import {getMeds, getMedication} from '../meds/actions';
import {ROUTES} from '../../router/routes';
import TextInput from '../../components/inputs/TextInput';
import DatePickerInput from '../../components/inputs/DatePicker';
import MedicationCard from './MedicationCard';
import medsIcon from '../../assets/img/icons/i-arrow_down.png';
import medsIcon2x from '../../assets/img/icons/i-arrow_down@2x.png';
import medsIcon3x from '../../assets/img/icons/i-arrow_down@3x.png';

const CreateCourse = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const {course} = useSelector(({createCourseState}) => createCourseState);
  const {meds} = useSelector(({medsState}) => medsState);
  // const isMedsEmpty = meds.length === 0;
  const {register, control, handleSubmit} = useForm({
    defaultValues: {
      title: course.title,
    },
  });
  const handleUpdateCourse = course => {
    dispatch(updateCourseProp(course));
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
  const handleMedDetails = medication => {
    dispatch(getMedication(medication.id));
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
            <div className="courses__add">
              <div className="add__top">
                <Link
                  className="btns btn-back"
                  to={ROUTES.COURSES}
                >
                  <i className="icons i24x24 i-arrow_left"></i>
                </Link>
                <button className="btns btn-save">CREATE COURSE</button>
              </div>
              <form className="add__form" onSubmit={handleSubmit(handleUpdateCourse)}>
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
                    <Controller
                      control={control}
                      id="start_date"
                      name="start_date"
                      rules={{required: 'Start date reuired'}}
                      render={({field}) => (
                        <DatePickerInput
                          name={field.name}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                          value={field.value}
                          label="Starts"
                          containerClassName="columns__column columns__column--start"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      id="end_date"
                      name="end_date"
                      rules={{required: 'Start date reuired'}}
                      render={({field}) => (
                        <DatePickerInput
                          name={field.name}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                          value={field.value}
                          label="End"
                          containerClassName="columns__column columns__column--end"
                        />
                      )}
                    />
                  </div>
                  <div className="courses__medicines">
                    <div className="medicines__columns">
                      <div className="column">
                        <button className="btns btn-add">ADD MEDICINE</button>
                      </div>
                    </div>
                  </div>
                </div>
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
                            {meds.map(medication => (
                              <MedicationCard
                                key={medication.id}
                                medication={medication}
                                handleMedDetails={handleMedDetails}
                              />
                            ))}
													</div>
												</div>
											</div>
											<div className="search__noresults">
												<p>
													There is no such medicine in your library. Create it first.<br/>
													<img
                            src={medsIcon}
                            srcSet={`${medsIcon2x} 2x, ${medsIcon3x} 3x`}
                            alt="MedsIcon"
                          />
												</p>
												<button className="btns btn-add">CREATE NEW MEDICINE</button>
											</div>
										</div>
									</div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default CreateCourse;
