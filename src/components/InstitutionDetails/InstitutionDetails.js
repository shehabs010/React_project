import './InstitutionDetails.css';

import PropTypes from 'prop-types';
import React from 'react';

const InstDetail = ({ data, Title, onChildClick, className, index }) => {
  const items = data.map((item, i) => (
    <li key={i} id={item.id} role="presentation" onClick={() => onChildClick(item.id, item.name)} className={item.id === index ? 'active' : ''}>
      {item.name}
    </li>
  ));
  return (
    <div className={`choose__column col-md-3 col-12 ${className}`}>
      <h5 className="choose__column-title pt-4 pb-5">{Title}</h5>
      <ul className="list-unstyled pl-0">{items}</ul>
    </div>
  );
};

InstDetail.propTypes = {
  Title: PropTypes.string,
  onChildClick: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
};

export default InstDetail;
