import React from 'react';
import {useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import TextInput from '../../components/inputs/TextInput';
// import SubmitButton from '../../components/buttons/SubmitButton';
import {PHONE} from '../../constants';
import clipboardIcon from '../../assets/img/icons/i-clipboard_3.png';
import clipboardIcon2x from '../../assets/img/icons/i-clipboard_3@2x.png';
import clipboardIcon3x from '../../assets/img/icons/i-clipboard_3@3x.png';
import medicineIcon from '../../assets/img/icons/i-medicine_3.png';
import medicineIcon2x from '../../assets/img/icons/i-medicine_3@2x.png';
import medicineIcon3x from '../../assets/img/icons/i-medicine_3@3x.png';
import notificationsIcon from '../../assets/img/icons/i-bell.png';
import notificationsIcon2x from '../../assets/img/icons/i-bell@2x.png';
import notificationsIcon3x from '../../assets/img/icons/i-bell@3x.png';
import pinIcon from '../../assets/img/icons/i-lock.png';
import pinIcon2x from '../../assets/img/icons/i-lock@2x.png';
import pinIcon3x from '../../assets/img/icons/i-lock@3x.png';
import familyIcon from '../../assets/img/icons/i-users.png';
import familyIcon2x from '../../assets/img/icons/i-users@2x.png';
import familyIcon3x from '../../assets/img/icons/i-users@3x.png';
import 'react-phone-number-input/style.css';

const ProfileForm = () => {
  const {user} = useSelector(({authState}) => authState);
  const {
    handleSubmit,
    register,
    formState: {
      errors,
      // isDirty,
      // isValid,
    },
    control,
  } = useForm({
    defaultValues: {
      first_name: user.first_name || "",
      phone: user.phone || "",
      last_name: user.last_name || "",
      email: user.email || "",
    },
  });
  const onSubmit = formData => {
    console.log(formData);
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="settings__row settings__row--top">
        <div className="block__title">Account</div>
        <button className="btns btn-logout">LOG OUT</button>
      </div>
      <div className="settings__row settings__row--first">
        <label className="user__avatar">
          <span className="user__abbr">SH</span>
          <input type="file" name="uAvatar" />
        </label>
        <div className="user__meds">
          <div className="courses">
            <img
              src={clipboardIcon}
              srcSet={`${clipboardIcon2x} 2x, ${clipboardIcon3x} 3x`}
              alt="Courses"
            />
            {`${user.courses_count} Courses`}
          </div>
          <div className="medicines">
            <img
              src={medicineIcon}
              srcSet={`${medicineIcon2x} 2x, ${medicineIcon3x} 3x`}
              alt="Meds"
            />
            {`${user.medications_count} Meds`}
          </div>
        </div>
      </div>
      <div className="settings__row settings__row--form">
        <div className="form__column--2">
          <TextInput
            register={register}
            name="first_name"
            label="First Name"
            required
            type="text"
            id="uFName"
          />
          <div className="form__row">
            <label className="form__label" for="uPhone">Phone Number</label>

            <Controller
              control={control}
              id="uPhone"
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
            {errors.phone && errors.phone.type === 'phoneNumber' && (
              <p className="input-error-message">Phone number is invalid.</p>
            )}
            {errors.phone && errors.phone.type !== 'phoneNumber' && (
              <p className="input-error-message">{errors.phone}</p>
            )}
          </div>
          <div className="form__row form__row--columns">
            <div className="columns__column--2 custom-select">
              <label className="form__label" for="uGender">Gender</label>
              <select className="form__select" id="uGender" name="uGender">
                <option value="" disabled="disabled">Select Gender</option>
                <option value="" selected="selected">Male</option>
                <option value="">Female</option>
                <option value="">Other</option>
              </select>
            </div>
            <div className="columns__column--2">
              <label className="form__label" for="uBday">Birth day</label>
              <input className="form__input datepicker-here" id="uBday" name="uBday" type="text" placeholder="dd/mm/yyyy" value="" />
            </div>
          </div>
        </div>
        <div className="form__column--2">
          <TextInput
            register={register}
            name="last_name"
            label="Last Name"
            required
            type="text"
            id="uLName"
          />
          <TextInput
            register={register}
            name="email"
            label="Email"
            required
            type="email"
            id="uEmail"
          />
        </div>
      </div>
      <div className="settings__row settings__row--form settings__row--notifications">
        <div className="form__column--2">
          <div className="block__title">
            <img
              src={notificationsIcon}
              srcSet={`${notificationsIcon2x} 2x, ${notificationsIcon3x} 3x`}
              alt="NotificationIcon"
            />
            Notification
          </div>
          <div className="switch__wrapper">
            <div className="switch__text">Misses</div>
            <div className="switch">
              <input className="switch__input" type="checkbox" name="uMisses" id="uMisses" />
              <label className="switch__label" for="uMisses">	</label>
            </div>
          </div>
          <div className="switch__wrapper">
            <div className="switch__text">Stock shortages</div>
            <div className="switch">
              <input className="switch__input" type="checkbox" name="uStock" id="uStock" />
              <label className="switch__label" for="uStock">	</label>
            </div>
          </div>
          <button className="btns btn-pin" data-toggle="class" data-target="#popups" data-classes="pin">
            <img
              src={pinIcon}
              srcSet={`${pinIcon2x} 2x, ${pinIcon3x} 3x`}
              alt="CodeIcon"
            />
            Change PIN Code
          </button>
        </div>
        <div className="form__column--2">
          <div className="block__title switch__wrapper">
            <div className="switch__text">
              <img
                src={familyIcon}
                srcSet={`${familyIcon2x} 2x, ${familyIcon3x} 3x`}
                alt="FamilyIcon"
              />
              Family Track	
            </div> 
            <div className="switch">
              <input className="switch__input" type="checkbox" name="uFamily" id="uFamily" />
              <label className="switch__label" for="uFamily">	</label>
            </div>
            <div className="switch__hint">
              Create medical courses for your family members. Control medications presence, track their progress & more.
            </div>
          </div>
        </div>
      </div>
      <div className="settings__btns">
        <button className="btn btn-delete" data-toggle="class" data-target="#popups" data-classes="remove">DELETE ACCOUNT</button>
      </div>
    </form>
  );
};

export default ProfileForm;
