import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from '../pageWrapper'
import { config } from '../../config'
import defaultAvatar from '../../assets/img/temp/avatar2.png'
import moment from 'moment'
import Modal from '../../components/modals/Modal';
import { deletePatient } from './actions'
import { useParams } from 'react-router-dom'

const PatientPage = ({ patient, isLoading }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const toggleOpen = () => setOpen(prev => !prev)
    const { id } = useParams()
    const handleRemove = () => {
        dispatch(deletePatient(id))
        toggleOpen()
    }
  return (
    <PageWrapper showSideBar className={PageWrapper.WrapperClassNames.family}>
    {!isLoading && <>
      <div className="content__top">
        <div className="top__content">
            <div className="top__link">
                <button className="btns btn-back" onClick={history.goBack}>
                    <i className="icons i24x24 i-chevron_left"></i>
                </button>
            </div>
            <div className="top__title">
                {patient?.last_name} {patient?.first_name}
            </div>
        </div>
      </div>
      <div className="content__block">
        <section className="patient">
            <div className="patient__page">
                <div className="patient__info">
                    <figure className="patient__avatar avatar">
                        <img className="image" src={patient?.avatar_url ? `${config.REACT_APP_IMAGE_URL}${patient?.avatar_url}` : defaultAvatar} alt={patient?.email} />
                    </figure>
                    <div className="info__text">
                        <div className="patient__stats">
                            <div className="patient__courses">
                                <i className="icons i24x24 i-clipboard"></i> {patient?.courses_count} Courses
                            </div>
                            <div className="patient__meds">
                                <i className="icons i24x24 i-medicine"></i> {patient?.medications_count} Meds
                            </div>
                        </div>
                        <div className="patient___links">
                            <a className="patient__course link" href="patients.html">View a course</a>
                        </div>
                    </div>
                    <div className="info__btns">				
                    <button className="btns btn-userRemove btn-red" onClick={toggleOpen}>Remove</button>
                    </div>
                </div>
                <div className="patient__data">
                    <div className="form">
                        <div className="form__row form__row--columns">
                            <div className="row__column row__column--2">
                                <label className="form__label">Name</label>
                                <div className="form__text--input">
                                    {patient?.first_name} {patient?.last_name}
                                </div>
                            </div>
                            <div className="row__column row__column--2">
                                <label className="form__label">Email</label>
                                <div className="form__text--input">
                                    {patient?.email}
                                </div>
                            </div>
                        </div>
                        
                        <div className="form__row form__row--columns">
                            <div className="row__column row__column--2">
                                <label className="form__label">Phone Number</label>
                                <div className="form__text--input">
                                    {patient?.phone}
                                </div>
                            </div>
                            <div className="form__row form__row--columns  row__column--2">
                                <div className="row__column row__column--2">
                                    <label className="form__label">Gender</label>
                                    <div className="form__text--input" style={{textTransform: 'capitalize'}}>
                                        {patient?.gender}
                                    </div>
                                </div>
                                <div className="row__column row__column--2">
                                    <label className="form__label">Birth Day</label>
                                    <div className="form__text--input">
                                        {moment(patient?.birthday).format('DD MMM YYYY')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </>}
    {open && 
        <Modal
        header='Delete Account?'
        className={Modal.ModalClasses.pin}
        additionalClassNames="tac"
        >
            <p>Are you sure?</p>    
            <div className='block__btns'>
                <button className='btns btn-cancel' onClick={toggleOpen}>No</button>
                <button className='btns btn-remove' onClick={handleRemove}>Yes</button>
            </div>
        </Modal>
    }
    </PageWrapper>
  )
}

export default PatientPage