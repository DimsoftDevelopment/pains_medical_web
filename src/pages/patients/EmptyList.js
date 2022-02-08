import React from 'react';
import familyIcon from '../../assets/img/icons/i-family.png';
import familyIcon2x from '../../assets/img/icons/i-family@2x.png';
import familyIcon3x from '../../assets/img/icons/i-family@3x.png';

const EmptyList = ({handleInvite, type = 'Family'}) => {
  return (
    <section className="family section--fullheight">
      <div className="family__page block--fullheight">	
        <div className="block__empty empty">
          <div className="empty__icon">
            <img
              src={familyIcon}
              srcSet={`${familyIcon2x} 2x, ${familyIcon3x} 3x`} alt="familyIcon"
            />
          </div>
          <div className="empty__title">{type} Tracking</div>
          <div className="empty__text">
            Create medical courses for your patients <br/> & track their progress.
          </div>
          <div className="empty__btns">
            <button
              className="btns"
              onClick={handleInvite}
              data-toggle="class"
              data-target="#popups"
              data-classes="invite"
            >
              INVITE MEMBER
            </button>
          </div>
        </div>												
      </div>
    </section>
  );
};

export default EmptyList;
