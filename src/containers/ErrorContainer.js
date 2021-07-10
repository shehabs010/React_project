import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NotFoundImg from '../assets/img/svg/404.svg';
import ErrorImg from '../assets/img/svg/Error.svg';
import InnrePage from './InnrePage';

class ErrorContainer extends Component {
  render() {
    const { type } = this.props;
    const pageTitle = type === '404' ? 'خطأ 404' : 'خطأ في النظام';
    const img = type === '404' ? NotFoundImg : ErrorImg;
    const descreption = type === '404' ? 'عذرا..الصفحة المطلوبة غير موجودة' : 'عذرا..حدث خطأ بالنظام';
    const homeLink = (
      <Link to="/" className="btn btn-primary m-2 col-12 col-md-3">
        {' '}
        الرجوع للصفحة الرئيسية{' '}
      </Link>
    );
    const supportLink = (
      <Link to="/support" className="btn btn-light col-12 m-2 col-md-3">
        {' '}
        طلب المساعدة{' '}
      </Link>
    );
    return (
      <InnrePage>
        <div className="container py-5 mb-5">
          <p className="pageTitle pb-5"> {pageTitle} </p>
          <div className="error__card bg-white  mb-5 my-3 pl-5">
            <img src={img} alt="" className="mr-2 col-12 error__img" />
            <div className="pt-4 error__des d-flex justify-content-center"> {descreption} </div>
            <div className="p-md-5 p-4 row d-flex justify-content-center">
              {homeLink}
              {type === 'error' && supportLink}
            </div>
          </div>
        </div>
      </InnrePage>
    );
  }
}

ErrorContainer.propTypes = {
  type: PropTypes.string,
};

export default ErrorContainer;
