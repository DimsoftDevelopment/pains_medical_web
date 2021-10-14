import React from 'react';
import {config} from '../../config';

const ListItem = ({medication}) => {
  const attachments = medication.attachments.data.map(attachment => attachment.attributes);
  return (
    <div className="list__item">
      <div className="card">
        <a className="medicine__item" href="meds_details.html">
          <span className="medicine__image">
            <span className="image">
              {attachments.length > 0 &&
                attachments.map(attachment => (
                  <img
                    key={attachment.id}
                    className="image"
                    src={`${config.REACT_APP_IMAGE_URL}${attachment.file_thumb_url}`}
                    alt={`attachment_${attachment.id}`}
                  />
                )
              )}
            </span>
          </span>
          <span className="medicine__text">
            <span className="medicine__name">{medication.title}</span>
            
          </span>
          <span className="medicine__store">
            <span className="medicine__quantity">
              {`${medication.availability_count} ${medication.dosage_form}`}
            </span>
            <span className="medicine__period">in stock</span>
          </span>
        </a>
      </div>
    </div>
  );
}

export default ListItem;
