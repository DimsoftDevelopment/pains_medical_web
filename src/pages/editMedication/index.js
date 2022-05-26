import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import classNames from 'classnames';
import {useForm} from 'react-hook-form';
import PageWrapper from '../pageWrapper';
import TextInput from '../../components/inputs/TextInput';
import Switch from '../../components/inputs/Switch';
import RadioGroup from '../../components/inputs/RadioGroup';
import DeleteMedication from '../../components/modals/DeleteMedication';
import backIcon from '../../assets/img/icons/i-arrow_left.png';
import backIcon2x from '../../assets/img/icons/i-arrow_left@2x.png';
import backIcon3x from '../../assets/img/icons/i-arrow_left@3x.png';
import {
  getMedication,
  createMedication,
  updateMedication,
} from '../meds/actions';
import {config} from '../../config';

const EditMedication = ({match, history}) => {
  const dispatch = useDispatch();
  const {medication} = useSelector(({medsState}) => medsState);
  const attachments = medication.attachments ? medication.attachments.data.map(attachment => attachment.attributes) : [];
  const firstImage = attachments.length > 0 ? attachments[0].file_url : '';
  const [images, setImages] = useState([]);
  const [bigImage, setBigImage] = useState(firstImage);
  const [selectedImageID, setSelectedImageID] = useState(attachments[0]?.id || '');
  const [imagesForRemove, setImagesForRemove] = useState([]);
  const [showConfirmDelete, setConfirmDelete] = useState(false);
  const options = [{
    id: 'pieces',
    name: 'dosage_form',
    value: 'pieces',
    label: 'Pieces',
  }, {
    id: 'miligrams',
    name: 'dosage_form',
    value: 'miligrams',
    label: 'Miligrams',

  }];
  const {handleSubmit, register} = useForm({
    defaultValues: {
      title: medication.title || '',
      notes: medication.notes || '',
      availability_count: medication.availability_count || 0,
      dosage_form: medication.dosage_form || '',
      is_reminder_enabled: medication.is_reminder_enabled || false,
    },
  });
  const handleBack = () => {
    history.goBack();
  };
  const handleImageClick = attachment => {
    if (attachment.id) {
      setBigImage(attachment.file_url);
      setSelectedImageID(attachment.id);
    } else {
      setBigImage(attachment.url);
      setSelectedImageID('');
    }
  };
  const submitMedication = formData => {
    if (medication.id) {
      dispatch(updateMedication({
        ...medication,
        ...formData,
        imagesForRemove,
        images,
      }));
    } else {
      dispatch(createMedication({
        ...medication,
        ...formData,
        images,
      }));
    }
    setImages([]);
    setSelectedImageID('');
    setImagesForRemove([]);
  };
  const handleRemoveImage = () => {
    const allImages = [...imagesForRemove];
    allImages.push(selectedImageID);
    setImagesForRemove(allImages);
  };
  const handlePicture = event => {
    const file = event.currentTarget.files[0];
    const url = URL.createObjectURL(file);
    const newImages = [...images];
    newImages.push({file, url});
    setImages(newImages);
  };
  const toggleDeleteModal = () => {
    setConfirmDelete(!showConfirmDelete);
  };
  useEffect(() => {
    setBigImage(firstImage);
    setSelectedImageID(attachments[0]?.id || '');
  }, [medication]);
  useEffect(() => {
    const {id} = match.params || {};
    if (!medication.id && id) {
      dispatch(getMedication(id));
    }
  }, []);
  return (
    <PageWrapper
      showSideBar
      className={PageWrapper.WrapperClassNames.editMed}
    >
      <div className="content__top">
        <div className="top__content">
          <div className="top__link">
            <button className="btns btn-back" onClick={handleBack}>
              <i className="icons i24x24 i-chevron_left"></i>
            </button>
          </div>
          <div className="top__title">
            {medication.id ? 'Edit Medication' : 'Create Medication'}
          </div>
          <div className="top__btns">
            {medication.id && <button className="btns btn-medsRemove" onClick={toggleDeleteModal}>Remove</button>}
          </div>
        </div>
      </div>
      <div className="content__block">
        <section className="medicines">
          <form
            className="medicines__create"
            onSubmit={handleSubmit(submitMedication)}
          >
            <div className="create__content">
              <div className="form">
                <div className="create__gallery">
                  <div className="medicine__gallery">
                    {bigImage && imagesForRemove.indexOf(selectedImageID) < 0 && (
                      <div className="gallery__big">
                        <figure className="big">
                          <img
                            src={selectedImageID ?
                              `${config.REACT_APP_IMAGE_URL}${bigImage}` :
                              bigImage
                            }
                            width='100%'
                            alt="MEDICINENAME"
                          />
                        </figure>
                        <button
                          className="btns btn-delete"
                          type="button"
                          onClick={handleRemoveImage}
                        />
                      </div>
                    )}
                    <div className="gallery__small">
                      {attachments.length > 0 && attachments.map(attachment => imagesForRemove.indexOf(attachment.id) >= 0 ? null : (
                        <figure
                          className={classNames("small", {
                            active: attachment.file_url === bigImage,
                          })}
                          key={attachment.id}
                          onClick={() => handleImageClick(attachment)}
                        >
                          <img
                            src={`${config.REACT_APP_IMAGE_URL}${attachment.file_thumb_url}`}
                            width={85}
                            height={85}
                            alt={attachment.id}
                          />
                        </figure>
                      ))}
                      {images.length > 0 && images.map(image => (
                        <figure
                          className={classNames("small", {
                            active: image.url === bigImage,
                          })}
                          key={image.url}
                          onClick={() => handleImageClick(image)}
                          >
                          <img
                            src={image.url}
                            width={85}
                            height={85}
                            alt={image.url}
                          />
                        </figure>
                      ))}
                      <div className="form">
                        <label className="form__label--gallery">
                          <input type="file" name="mImage" onChange={handlePicture} accept="image/png, image/jpeg" />
                          <span>Add Medicine Photo</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="create__measurement">
                  <TextInput
                    name="title"
                    id="title"
                    label="Medicine"
                    register={register}
                    required
                    type="text"
                  />
                  <RadioGroup
                    register={register}
                    options={options}
                  />
                  {/* <div className="form__row form__row--radiobox">
                    <input className="form__input--radio" type="radio" name="mMeasurement" id="mPeeces" value="Pieces" checked/>
                    <label className="form__label--radio" for="mPeeces">Pieces</label>
                    <input className="form__input--radio" type="radio" name="mMeasurement" id="mMiligrams" value="Miligrams" />
                    <label className="form__label--radio" for="mMiligrams">Miligrams</label>
                  </div> */}
                </div>
                <div className="create__notes">
                  <TextInput
                    name="notes"
                    id="notes"
                    label=""
                    register={register}
                    multyline
                  />
                </div>
                <div className="create__stock">
                  <TextInput
                    name="availability_count"
                    id="availability_count"
                    label=""
                    register={register}
                    type="number"
                    onChange={e => { if(Number(e.target.value) < 0) e.target.value = 0}}
                  />
                  <div className="reminder">
                    <div className="reminder__text">
                      <div className="reminder__title">Stock Reminder</div>
                      <div className="reminder__info">Notify if less than 10 pcs. left</div>
                    </div>
                    <div className="reminder__btns">
                      <div className="form">
                        <Switch
                          simpleSwitch
                          name="is_reminder_enabled"
                          id="is_reminder_enabled"
                          register={register}
                        />
                        {/* <div className="switch">
                          <input className="switch__input" type="checkbox" name="mRemind" id="mRemind" />
                          <label className="switch__label" htmlFor="mRemind"></label>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="create__btns create__btns-flex">
                  {medication.id ?
                    <button className="btns btn-course">EDIT</button>
                  :
                    <>
                    <button className='btns btn-medsRemove'>cancel</button>
                    <button className='btns btn-course'>SAVE</button>
                    </>
                  }
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
      {showConfirmDelete && (
        <DeleteMedication
          toggleDeleteModal={toggleDeleteModal}
        />
      )}
    </PageWrapper>
  );
};

export default EditMedication;
