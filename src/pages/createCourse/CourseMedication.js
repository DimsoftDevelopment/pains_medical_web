import React, {useState} from 'react';
import classNames from 'classnames';

const CourseMedication = ({
  courseMedication,
  index,
  handleEditCourseMedicine,
  handleDeleteCourseMedicine,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleEdit = () => {
    handleEditCourseMedicine(index);
    toggleMenu();
  };
  const handleDelete = () => {
    handleDeleteCourseMedicine(index);
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const getFrequencyTitle = () => {
    switch(courseMedication.frequency) {
      case 'every_day':
        return 'Every Day';
      case 'specific_days':
        return 'Specific Days';
      case 'days_interval':
        return 'Days Interval';
      default:
        return '';
    }
  };
  return (
    <div className="column">
      <div className={classNames("card", {"show-menu": showMenu})}>
        <div className="card__top">
          <div className="medicine__icon">
          </div>
          <div className="medicine__text">
            <div className="medicine__name">{courseMedication.medication_title}</div>
            <div className="medicine__frequency">{getFrequencyTitle()}</div>
          </div>
          <div className="medicine__duration">
            {`${courseMedication.duration}d`}
          </div>
          <div className="card__menu">
            <button
              className="btns btn-menu"
              type="button"
              onClick={toggleMenu}
            >
              <i className="icons i24x24 i-dots" />
            </button>
            <div className="medicine__menu">
              <ul className="menu__list">
                <li className="list__item">
                  <button
                    className="list__link"
                    type="button"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </li>
                <li className="list__item">
                  <button
                    className="list__link delete"
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="medicine__schedule">
          <ul className="schedule__list">
            {courseMedication.time_dose.map((timeDose, index) => (
              <li className="list__item" key={index}>
                <span className="time">{timeDose.time}</span> <span className="quantity">{`${timeDose.dose} ${timeDose.dosage_form}`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseMedication;
