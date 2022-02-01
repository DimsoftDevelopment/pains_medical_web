import React from 'react';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {goBack, push} from 'connected-react-router';
import PageWrapper from '../pageWrapper';
import TextInput from '../../components/inputs/TextInput';
import {saveMedicationTitle} from '../meds/actions';
import arrowIcon from '../../assets/img/icons/i-arrow_left.png';
import arrowIcon2x from '../../assets/img/icons/i-arrow_left@2x.png';
import arrowIcon3x from '../../assets/img/icons/i-arrow_left@3x.png';

const CreateMedication = () => {
  const dispatch = useDispatch();
  const {handleSubmit, register} = useForm();
  const handleCreateMedication = data => {
    dispatch(saveMedicationTitle(data));
    dispatch(push('/edit-medication'));
  };
  const handleBack = () => {
    dispatch(goBack());
  };
  return (
    <PageWrapper
      className={PageWrapper.WrapperClassNames.empty}
      showSideBar
    >
      <div className="breadcrumbs">
        <h1 className="page__title">Create Medication</h1>
      </div>
      <div className="content__block">
        <form className="medicines section--fullheight" onSubmit={handleSubmit(handleCreateMedication)}>
          <div className="medicines__create page--fullheight">
            <div className="create__top">
              <div className="top__btns">
                <button
                  className="btns btn-back"
                  onClick={handleBack}
                  type="button"
                >
                  <img
                    src={arrowIcon}
                    srcSet={`${arrowIcon2x} 2x, ${arrowIcon3x} 3x`}
                    alt="Back"
                  />
                  </button>
                <button className="btns btn-complete">COMPLETTE</button>
              </div>
            </div>
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
                <div className="name__btns">
                  <button className="btns btn-continue">CONTINUE</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default CreateMedication;
