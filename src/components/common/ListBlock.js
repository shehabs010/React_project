import PropTypes from 'prop-types';
import React from 'react';

const ListBlock = ({ title, imgsrc, data, text, padRight }) => (
  <>
    <div className="d-flex align-items-center mb-2 ">
      {imgsrc && <img src={imgsrc} className="eduCard__icon" alt="" width="23" height="23" />}
      {title && <h6 className={`eduCard__title mb-0 ${padRight}`}>{title}</h6>}
    </div>

    {data && data.length ? (
      <ul className={`eduCard__list pl-0 ${imgsrc ? 'pr-4' : ''}`}>
        {data.map((dt, i) => (
          <li key={i}>{typeof dt === 'object' ? dt[Object.keys(dt)[0]] : dt}</li>
        ))}
      </ul>
    ) : (
      <p className="col-12">{text}</p>
    )}
  </>
);
ListBlock.propTypes = {
  title: PropTypes.string,
  imgsrc: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any,
  text: PropTypes.string,
  padRight: PropTypes.string,
};

export default ListBlock;
