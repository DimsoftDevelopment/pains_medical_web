import React from 'react';
import {useDispatch} from 'react-redux';
import Modal from './Modal';
import {takeUntakePill} from '../../pages/dashboard/actions';

const TakePill = ({medication, handleCloseModal, isMissed, isTaken}) => {
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
      id: medication.reception_id,
      status: 'taken',
    }));
    handleCloseModal();
  };
  const untakePill = () => {
    dispatch(takeUntakePill({
      id: medication.reception_id,
      status: 'mised',
    }));
    handleCloseModal();
  };
  return (
    <Modal
      className={getClassName()}
      additionalClassNames={getAdditionalClassName()}
    >
      <div className="medicine">
        <div className="medicine__gallery">
          <div className="gallery__big">
            <figure className="big">
              {/* <img className="image" src="img/temp/paracetamol_01.jpg" srcset="img/temp/paracetamol_01@2x.jpg 2x, img/temp/paracetamol_01@3x.jpg 3x" alt="MEDICINENAME" /> */}
            </figure>
          </div>
          <div className="gallery__small">
            <figure className="small active">
              {/* <img className="image" src="img/temp/paracetamol_02.jpg" srcset="img/temp/paracetamol_02@2x.jpg 2x, img/temp/paracetamol_02@2x.jpg 3x" alt="MEDICINENAME" /> */}
            </figure>
            <figure className="small">
              {/* <img className="image" src="img/temp/paracetamol_02.jpg" srcset="img/temp/paracetamol_02@2x.jpg 2x, img/temp/paracetamol_02@2x.jpg 3x" alt="MEDICINENAME" /> */}
            </figure>
            <figure className="small">
              {/* <img className="image" src="img/temp/paracetamol_02.jpg" srcset="img/temp/paracetamol_02@2x.jpg 2x, img/temp/paracetamol_02@2x.jpg 3x" alt="MEDICINENAME" /> */}
            </figure>
          </div>
        </div>
        <div className="medicine__time">11:00</div>
        <div className="medicine__name">Paracetamol</div>
        <div className="medicine__quantity">x 2 pcs</div>
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
            <button className="btns btn-takeswipe"><span>TAKE</span></button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TakePill;
