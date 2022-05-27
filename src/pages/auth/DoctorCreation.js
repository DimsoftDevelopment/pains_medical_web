import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { signUp } from './actions'
import PageWrapper from '../pageWrapper'
import TextInput from '../../components/inputs/TextInput'
import SubmitButton from '../../components/buttons/SubmitButton'
import { PHONE } from '../../constants'
import PhoneInput from 'react-phone-number-input'

const DoctorCreation = () => {
  const {handleSubmit, register, control} = useForm({
    defaultValues: {
      phone: '',
      user_type: 'doctor'
    },
    mode: 'onChange',
  })
  const dispatch = useDispatch()

  const onSubmit = formData => {
    dispatch(signUp({
      ...formData
    }))
  }
  
  return (
    <PageWrapper className={PageWrapper.WrapperClassNames.signin}>
      <form className="form form--authorization" onSubmit={handleSubmit(onSubmit)}>
        <div className="logo" />
        <div className="form__title">
          Create Account
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
        <div className="form__block">
          <div className="block__title">Personal info</div>
          <div className="form__row">
            <TextInput
              register={register}
              name="first_name"
              placeholder="Stephanus"
              type="text"
              required
              label="Name"
              defaultValue=""
            />
          </div>
          <div className="form__row">
            <TextInput
              register={register}
              name="last_name"
              placeholder="Huggins"
              type="text"
              required
              label="Surname"
              defaultValue=""
            />
          </div>
          <div className="form__row">
            <Controller
              control={control}
              name="phone"
              rules={{
                required: 'Phone is required.',
                validate: {
                  phoneNumber: value => PHONE.test(value),
                }
              }}
              render={({field}) => (
                <PhoneInput {...field} />
              )}
            />
          </div>
        </div>
        <div className="form__block">
          <div className="block__title">Hospital info</div>
          <div className="form__row">
            <TextInput
              register={register}
              name="hospital"
              placeholder="St. Stephanus"
              type="text"
              required
              label="Hospital name"
              defaultValue=""
            />
          </div>
          <div className="form__row">
            <TextInput
              register={register}
              onChange={e => { if(Number(e.target.value) < 0) e.target.value = 0}}
              name="imc_number"
              placeholder="43242233"
              type="number"
              required
              label="IMC number"
              defaultValue=""
            />
          </div>
        </div>
        <div className="form__text">
          By clicking «Continue» button you are agree with 
          <a href="/#terms" title="Temrs and Conditions">terms and conditions</a>
        </div>	
				<div className="form__row form__row--submit">
          <SubmitButton value="NEXT" />
        </div>
      </form>
    </PageWrapper>
  )
}

export default DoctorCreation