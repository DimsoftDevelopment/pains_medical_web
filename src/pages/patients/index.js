import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PatientPage from './PatientPage'
import PatientsListPage from './PatientsListPage'
import { getPatientsList } from './actions'
import _ from 'lodash'

const Patients = ({ match }) => {
  const { patientsList, isLoading } = useSelector(({patientsState}) => patientsState)
  const [id, setId] = useState(null)
  const [searchString, setSearchString] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const { id } = match.params || {}
    setId(prev => id)
  }, [match])

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
    {isLoading ? null : id
    ?
      <PatientPage patient={patientsList.find(item => item.id === id).attributes} />
    :
      <PatientsListPage searchString={searchString} handleSearchString={handleSearchString} handleSearch={handleSearch} />
    }
    </>
  )
}

export default Patients