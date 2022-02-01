import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../router/routes';
import medicineIcon from '../../assets/img/icons/i-medicine_2.png';
import medicineIcon2x from '../../assets/img/icons/i-medicine_2@2x.png';
import medicineIcon3x from '../../assets/img/icons/i-medicine_2@3x.png';

const EmptyList = () => {
  return (
    <section className="medicines section--fullheight">
      <div className="medicines__block block--fullheight">
        <div className="block__empty">
          <div className="empty__icon">
            <img
              src={medicineIcon}
              srcSet={`${medicineIcon2x} 2x, ${medicineIcon3x} 3x`} alt="medicineIcon"
            />
          </div>
          <div className="empty__title">Medications</div>
          <div className="empty__text">
            Control your medications presence, manage stock alerts, add notes and more
          </div>
          <div className="empty__btns">
            <Link
              className="btns"
              to={ROUTES.CREATE_MEDICATION}
            >
              CREATE MEDICATION
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmptyList;
