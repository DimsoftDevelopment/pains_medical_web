import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PatientPage from './PatientPage'
import PatientsListPage from './PatientsListPage'
import { getPatient, getPatientsList } from './actions'
import _ from 'lodash'

const Patients = ({ match }) => {
  const { patient, isLoading } = useSelector(({patientsState}) => patientsState)
  const [id, setId] = useState(null)
  const [searchString, setSearchString] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const { id } = match.params || {}
    setId(prev => id)
  }, [match])

  useEffect(() => {
    if(id) dispatch(getPatient(id))
  }, [id])

  const handleSearchString = _.debounce(e => {
    setSearchString(e.target.value)
  }, 250)


  const handleSearch = e => {
    e.preventDefault()
    dispatch(getPatientsList(searchString))
  }


  useEffect(() => dispatch(getPatientsList(searchString)), [searchString])

  return (
    <>
    {id ?
      <PatientPage patient={patient.attributes} isLoading={isLoading} />
    :
      <PatientsListPage searchString={searchString} handleSearchString={handleSearchString} handleSearch={handleSearch} />
    }
    </>
  )
}

export default Patients