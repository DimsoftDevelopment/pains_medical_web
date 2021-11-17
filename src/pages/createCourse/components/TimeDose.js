import React, {useState} from 'react';
import classNames from 'classnames';

const TimeDose = ({timeDose, index, editTimeDose, deleteTimeDose}) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleEdit = () => {
    toggleMenu();
    editTimeDose(index);
  };
  const handleDelete = () => {
    toggleMenu();
    deleteTimeDose(index);
  };
  return (
    <div
      className={classNames("medicine__timeAdoze", {
        'show-menu': showMenu,
      })}
    >
      <span className="time">{timeDose.time}</span>
      <span className="doze">{`${timeDose.dose} ${timeDose.dosage_form}`}</span>
      <button className="btns btn-menu" onClick={toggleMenu} type="button">
        <i className="icons i24x24 i-dots"></i>
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
  );
};

export default TimeDose;
