import './SpecialityItem.css';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// { title, desc, details, link, col8, marginbutton, colmd },
const SpecialityItem = ({ colStyle, key, details, title, desc, link, marginbutton, colmd }) => (
  <div className={colStyle} key={key}>
    <div className={`eduCard__card bg-white ${marginbutton}`}>
      <h6 className="eduCard__title pl-md-3 pb-md-0 pb-3">{title}</h6>
      <p className="eduCard__desc">{desc}</p>
      <div className="row mx-0 align-items-center eduCard__items justify-content-center">
        <div className="row col-12 col-md-9 pl-0 pr-0">
          {details &&
            details.map((d, i) => (
              <div key={i} className={`col-4 ${colmd} text-center pl-1 pr-1`}>
                <h6 className="eduCard__title">{d.title}</h6>
                <label>{d.desc}</label>
              </div>
            ))}
        </div>
        <div className="col-12 col-md-3 pl-0 pr-0">
          {link && (
            <div className="eduCard__btn text-center position-relative position-relative pr-md-0">
              <Link to={link} className="btn btn-primary">
                التفاصيل
              </Link>
              {/* <link href="" className="btn btn-primary">التفاصيل</a> */}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  specialityTitle: state.specialityTitle,
});
SpecialityItem.propTypes = {
  colStyle: PropTypes.string,
  key: PropTypes.number,
  details: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  desc: PropTypes.string,
  link: PropTypes.string,
  marginbutton: PropTypes.string,
  colmd: PropTypes.string,
};

export default connect(mapStateToProps)(SpecialityItem);
