import React, {useState, useEffect} from "react";
import classNames from "classnames";
import {config} from '../../config';
import { useHistory } from "react-router-dom";
import {ROUTES} from '../../router/routes';

const MedicationDetails = ({medication, handleEdit}) => {
  const history = useHistory()
  const attachments = medication.attachments.data.map(attachment => attachment.attributes);
  const firstImage = attachments.length > 0 ? attachments[0].file_url : '';
  const [bigImage, setBigImage] = useState(firstImage);
  const handleImageClick = attachment => {
    setBigImage(attachment.file_url);
  };
  useEffect(() => {
    setBigImage(firstImage);
  }, [medication]);
  return (
    <div className="medicines__details">
      <div className="form">
        <div className="medicine__gallery">
          {bigImage && (
            <div className="gallery__big">
              <figure className="big">
                <img
                  src={`${config.REACT_APP_IMAGE_URL}${bigImage}`}
                  width='100%'
                  alt={medication.title}
                />
              </figure>
              <button
                className="btns btn-delete"
                onClick={handleEdit}
              />
            </div>
          )}
          <div className="gallery__small">
            {attachments.length > 0 && attachments.map(attachment => (
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
            <div className="form">
              <button
                className="form__label--gallery"
                onClick={handleEdit}
              />
            </div>
          </div>
        </div>
        <div className="medicine__text">
          <div className="medicine__name">
            {medication.title}
          </div>
          <div className="medicine__description">
            {medication.notes}
          </div>
          <div className="medicine__schedule">
            <span><strong>LAST:</strong>FEB 08, 12:00</span>
            <span><strong>NEXT:</strong>FEB 12, 07:00</span>
          </div>
        </div>
        <div className="medicine__stock">
          <div
            className={classNames("card", {
              alarm: medication.availability_count < 10
            })}
          >
            <div className="card__icon">
            </div>
            <div className="card__text">
              <div className="stock__quantity">
                {`${medication.availability_count} ${medication.dosage_form}`}
              </div>
              <div className="stock__status">in stock</div>
            </div>
            <div className="card__btns">
              <button
                className="btns btn-edit"
                onClick={handleEdit}
              >
                EDIT
              </button>
            </div>
          </div>
          <div className="reminder">
            <div className="switch__wrapper">
              <div className="switch__text">
                <strong>Stock Reminder</strong>
                Notify if less than 10 pcs. left
              </div>
              <div className="switch">
                <input
                  className="switch__input"
                  type="checkbox"
                  defaultChecked={medication.is_reminder_enabled}
                  readOnly
                  name="uMisses"
                  onChange={handleEdit}
                  id="uMisses"
                />
                <label className="switch__label" htmlFor="uMisses" />
              </div>
            </div>	
          </div>
        </div>
        {/* <div className="medicine__forecast">
          <div className="block__title">Usage Forecast</div>
          <div className="forecast__summary">
            <div className="card">
              <div className="card__icon">
              </div>
              <div className="card__text">
                <div className="summary__count">-1 pc.</div>
                <div className="summary__duration">in two days</div>
              </div>
              <div className="card__status">
                <div className="summary__status">
                  Availability covers current courses
                </div>
              </div>
            </div> */}
            {/* <!-- IF ALARM FOR EXAMPLE --> */}
            {/* <div className="card alarm">
              <div className="card__icon">
              </div>
              <div className="card__text">
                <div className="summary__count">-1 pc.</div>
                <div className="summary__duration">in two days</div>
              </div>
              <div className="card__status">
                <div className="summary__status">
                  <strong>155 MISSING</strong> <br /> to cover course
                </div>
              </div>
            </div> */}
            {/* <!-- IF /ALARM FOR EXAMPLE --> */}
          {/* </div>
          <div className="forecast__courses">
            <div className="courses__list">
              <div className="list__item">
                <div className="card">
                  <div className="card__left">
                    <div className="course__date">12 JUN - 23 OCT</div>
                    <div className="course__name">Meningitis</div>
                  </div>
                  <div className="card__right">
                    <div className="course__duration">in two days</div>
                    <div className="course__consumption">-1 pcs.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="details__btns details__btns--bottom">
          <button
            className="btns btn-edit"
            onClick={handleEdit}
          >
            EDIT MEDICINE
          </button>
          <button
          onClick={() => history.push(ROUTES.CREATE_COURSE)}
            className="btns btn-create"
          >
            CREATE COURSE
          </button>
        </div>
      {/* </div> */}
      </div>
    </div>
  );
};

export default MedicationDetails;
