import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { signIn } from './actions'
import PageWrapper from '../pageWrapper'
import TextInput from '../../components/inputs/TextInput'
import SubmitButton from '../../components/buttons/SubmitButton'

const DoctorCreation = () => {
  const {handleSubmit, register} = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange',
  })
  const dispatch = useDispatch()

  const onSubmit = formData => {
    dispatch(signIn({
      ...formData
    }))
  }
  
  return (
    <form className="form form--authorization" onSubmit={handleSubmit(onSubmit)}>
      <div className="logo" />
      <div className="form__title">
        Log in to your account
        <span className="text">Welcome back! Please enter your details</span>
      </div>
      <div className="form__block">
        <div className="block__title">Account info</div>
        <div className="form__row">
          <TextInput
            register={register}
            name="email"
            placeholder="doctor@gmail.com"
            type="email"
            required
            label="Email"
            defaultValue=""
          />
        </div>
        <div className="form__row">
          <TextInput
            register={register}
            name="password"
            placeholder="password"
            type="password"
            required
            label="Password"
            defaultValue=""
          />
        </div>
      </div>
        <div className="form__row form__row--link">
          <a className="link" href="/forgot-doctor" title="Forgot password">Forgot password</a>
        </div> 
        <div className="form__row form__row--submit">
          <SubmitButton value="Log in" />
        </div>
        <div className="form__text">
          Dont’t have an account? <a href="/create-doctor" title="Sign Up">Sign up</a> for free
        </div>
    </form>
  )
}

export default DoctorCreation