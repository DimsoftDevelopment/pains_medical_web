import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';
import Modal from './Modal';
import {takeUntakePill} from '../../pages/dashboard/actions';
import {config} from '../../config';
import moment from 'moment';

const TakePill = ({reception, handleCloseModal, isMissed, isTaken}) => {
  const medication = reception.medication.data.attributes || {};
  const attachments = medication.attachments.data.map(attachment => attachment.attributes);
  const firstImage = attachments.length > 0 ? attachments[0].file_url : '';
  const [bigImage, setBigImage] = useState(firstImage);
  const [btnStatus, setBtnStatus] = useState('calc(100% - 4px)')
  const dispatch = useDispatch();
  const getAdditionalClassName = () => {
    if (isMissed) return 'popup--medicine popup--missed';
    if (isTaken) return 'popup--medicine popup--taken';
    if (!isMissed && !isTaken) return 'popup--medicine popup--take';
  };
  const getClassName = () => {
    if (isMissed) return Modal.ModalClasses.missed;
    if (isTaken) return Modal.ModalClasses.taken;
    if (!isMissed && !isTaken) return Modal.ModalClasses.take;
  };
  const takePill = () => {
    dispatch(takeUntakePill({
      id: reception.id,
      status: 'taken',
    }));
    handleCloseModal();
  };
  const untakePill = () => {
    dispatch(takeUntakePill({
      id: reception.id,
      status: 'mised',
    }));
    handleCloseModal();
  };
  const handleImageClick = attachment => {
    setBigImage(attachment.file_url);
  };
  return (
    <Modal
      className={getClassName()}
      additionalClassNames={getAdditionalClassName()}
      handleCloseModal={handleCloseModal}
      showCloseButton
    >
      <div className="medicine">
        <div className="medicine__gallery">
          {bigImage && (
            <div className="gallery__big">
              <figure className="big">
                <img
                  src={`${config.REACT_APP_IMAGE_URL}${bigImage}`}
                  width='100%'
                  alt={medication.title}
                  className="image"
                />
              </figure>
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
                  width={52}
                  height={52}
                  className="image"
                  alt={attachment.id}
                />
              </figure>
            ))}
          </div>
        </div>
        <div className="medicine__time">{moment(reception.taking_date).format('HH:mm')}</div>
        <div className="medicine__name">{medication.title}</div>
        <div className="medicine__quantity">{`x ${reception.dose} ${reception.dosage_form}`}</div>
        {isMissed && (
          <div className="medicine__btns tac">
            <button
              className="btns btn-close"
              onClick={handleCloseModal}
            >
              CLOSE
            </button>
            <button
              className="btn btn-take"
              onClick={takePill}
            >
              TAKE
            </button>
          </div>
        )}
        {isTaken && (
          <div className="medicine__btns tac">
            <button
              className="btns btn-close"
              onClick={handleCloseModal}
            >
              CLOSE
            </button>
            <button
              className="btn btn-untake"
              onClick={untakePill}
            >
              UNTAKE
            </button>
          </div>
        )}
        {!isMissed && !isTaken && (
          <div className="medicine__btns tac">
            <button
              className="btns btn-takeswipe"
              onClick={takePill}
            >
              <span style={{left: btnStatus}}>TAKE</span>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TakePill;
