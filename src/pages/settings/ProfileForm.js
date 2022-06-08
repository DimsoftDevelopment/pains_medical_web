import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import {updateProfile, changeAvatar, changePass} from './actions';
import {logout} from '../auth/actions';
import PinModal from '../../components/modals/PinModal';
import DeleteAccount from '../../components/modals/DeleteAccount';
import TextInput from '../../components/inputs/TextInput';
import AvatarInput from '../../components/inputs/AvatarInput';
import DatePickerInput from '../../components/inputs/DatePicker';
import Switch from '../../components/inputs/Switch';
import GenderInput from '../../components/inputs/GenderInput';
import {PHONE} from '../../constants';
import {config} from '../../config';
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
import CustomSelect from '../../components/inputs/CustomSelect'
import 'react-phone-number-input/style.css';
import Modal from '../../components/modals/Modal';

const ProfileForm = () => {
  const {user} = useSelector(({authState}) => authState);
  const [isAvatarChanged, setAvatarChanged] = useState(false);
  const [avatarData, setAvatar] = useState({
    url: user.avatar_url ? `${config.REACT_APP_IMAGE_URL}${user.avatar_url}` : '',
  });
  const [isPinModalOpened, setPinModalOpened] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false)
  const [passData, setPassData] = useState({
    old_password: '',
	  password: '',
	  password_confirmation: ''
  })
  const selectArr = [
    {value: 'male', text: 'Male'},
    {value: 'female', text: 'Female'},
    {value: 'other', text: 'Other'},
  ]
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    setValue,
    formState: {
      errors,
      dirtyFields,
      // isValid,
    },
    control,
  } = useForm({
    defaultValues: {
      gender: user.gender || '',
      first_name: user.first_name || "",
      phone: user.phone || "",
      last_name: user.last_name || "",
      email: user.email || "",
      birthday: user.birthday || new Date().toISOString(),
      mises_notifications: user.mises_notifications || false,
      stock_notifications: user.stock_notifications || false,
      family_track: user.family_track || false,
    },
  });
  const isDirty = Object.keys(dirtyFields).length > 0
  const onSubmit = formData => {
    console.log(formData)
    dispatch(updateProfile({
      ...formData,
      id: user.id,
    }));
    if (avatarData.file) {
      dispatch(changeAvatar({
        id: user.id,
        avatar: avatarData.file,
      }));
    } else if (!avatarData.url) {
      dispatch(changeAvatar({
        id: user.id,
        avatar: null,
      }));
    }
  };
  const toggleChangePass = () => setShowChangePass(prev => !prev)
  const handlePinModal = () => {
    setPinModalOpened(!isPinModalOpened);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const handleAvatar = event => {
    const file = event.currentTarget.files[0];
    const url = URL.createObjectURL(file);
    setAvatar({file, url});
    setAvatarChanged(true);
  };
  const handleClearAvatar = () => {
    setAvatar({});
    setAvatarChanged(true);
  };
  const handlePassChange = e => setPassData(prev => ({...prev, [e.target.name]: e.target.value}))
  const handlePassChangeSubmit = () => {
    dispatch(changePass(passData))
    toggleChangePass()
    setPassData(prev => ({
      old_password: '',
      password: '',
      password_confirmation: ''
    }))
  }
  return (
    <>
      {(isDirty || isAvatarChanged) && (
        <button className="btns btn-blue fixedbuttoncustom" form='profileform' type="submit" >Save</button>
      )}
      <form className="form" id='profileform' onSubmit={handleSubmit(onSubmit)}>
        <div className="settings__row settings__row--top">
          <div className="block__title">Account</div>
          <div className="settings__btns">
            <button
              className="btn btn-delete"
              type="button"
              onClick={toggleDeleteModal}
            >
              DELETE ACCOUNT
            </button>
            <button
              className="btns btn-blue"
              type="button"
              onClick={handleLogout}
            >
              LOG OUT
            </button>
          </div>
        </div>
        <div className="settings__row settings__row--first">
          <AvatarInput
            handleAvatar={handleAvatar}
            avatar={avatarData.url}
            handleClearAvatar={handleClearAvatar}
            className="user__avatar"
            label={`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}
          />
          <div className="user__meds">
            <div className="courses">
              {`${user.courses_count} Courses`}
            </div>
            <div className="medicines">
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
              <label className="form__label" htmlFor="uPhone">Phone Number</label>

              <Controller
                control={control}
                id="uPhone"
                name="phone"
                rules={{
                  required: 'Phone is required.',
                  validate: {
                    phoneNumber: value => PHONE.test(String(value)),
                  }
                }}
                render={({field}) => (
                  <TextInput value={user.phone} disabled />
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
              <CustomSelect id='gender' defaultValue={user.gender} label='Gender' className='form__column--2' defaultName='Gender' name='gender' required={true} register={register} setValue={setValue} data={selectArr} />
              <Controller
                control={control}
                id="birthday"
                name="birthday"
                render={({field}) => (
                  <DatePickerInput
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
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
            <Switch
              name="mises_notifications"
              id="uMisses"
              defaultChecked={user.mises_notifications}
              label="Misses"
              register={register}
            />
            <Switch
              name="stock_notifications"
              id="uStock"
              defaultChecked={user.stock_notifications}
              label="Stock shortages"
              register={register}
            />
            <button
              className="btns btn-pin"
              onClick={user.user_type === 'user' ? handlePinModal : toggleChangePass}
              type="button"
            >
              <img
                src={pinIcon}
                srcSet={`${pinIcon2x} 2x, ${pinIcon3x} 3x`}
                alt="CodeIcon"
              />
              Change {user.user_type === 'user' ? 'PIN Code' : 'Password'}
            </button>
          </div>
          {user.user_type === 'user' && <div className="form__column--2">
            <div className="block__title switch__wrapper">
              <div className="switch__text">
                Family Track	
              </div>
              <Switch
                name="family_track"
                id="uFamily"
                defaultChecked={user.family_track}
                register={register}
                label=""
                simpleSwitch
              />
              <div className="switch__hint">
                Create medical courses for your family members. Control medications presence, track their progress & more.
              </div>
            </div>
          </div>}
        </div>
      </form>
      {isPinModalOpened && (
        <PinModal isEdit handlePinModal={handlePinModal} />
      )}
      {showDeleteModal && (
        <DeleteAccount toggleDeleteModal={toggleDeleteModal} />
      )}
      {showChangePass && <Modal
      header='Password Change'
      className={Modal.ModalClasses.pin}
      additionalClassNames="tac">
        <div className='block__inputs'>
          <TextInput type='password' name='old_password' value={passData.old_password} label='Old Password' onChange={handlePassChange} />
          <TextInput type='password' name='password' value={passData.password} label='New Password' onChange={handlePassChange} />
          <TextInput type='password' name='password_confirmation' value={passData.password_confirmation} label='Confirm Password' onChange={handlePassChange} />
        </div>
        <div className="block__btns">
          <button className="btns btn-cancel" onClick={toggleChangePass}>Cancel</button>
          <button className="btns btn-remove" onClick={handlePassChangeSubmit}>Change</button>
        </div>
      </Modal>}
    </>
  );
};

export default ProfileForm;
