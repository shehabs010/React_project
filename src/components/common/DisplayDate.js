import PropTypes from 'prop-types';
import React from 'react';

import calendar from '../../assets/img/spiciality/calendar-folded-page.png';
import { displayDate } from '../../utilities';

function DisplayDate({ name, type, date }) {
  return (
    <div className="col dateInfo d-flex align-items-center">
      <span className="circle flex-column mx-2">
        <img src={calendar} alt={name} /> <span className="dateInfo__title mt-1">{name}</span>{' '}
      </span>
      <span className="flex-column d-flex">
        <span className="daymonth">{`${displayDate(date, type).day}  ${displayDate(date, type).month}`}</span>
        <span className="year">{displayDate(date, type).year}</span>
      </span>
    </div>
  );
}

DisplayDate.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  date: PropTypes.string,
};

export default DisplayDate;
