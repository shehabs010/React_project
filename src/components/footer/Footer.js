import './Footer.css';

import React from 'react';
import { Link } from 'react-router-dom';

import logo1 from '../../assets/img/logos/edu-mini.png';
import logo2 from '../../assets/img/logos/uni.png';
import router from '../../routes/router';

const Footer = () => (
  <div>
    <footer>
      <div className="container">
        <div className="row mx-0">
          <div className="row col-12 mx-0 px-0  justify-content-between align-items-center py-4">
            <div className="col-md-4 col-12 px-0">
              <div className="footer__img d-flex align-items-center">
                <div className="col-6">
                  <img className="img-fluid" src={logo1} alt="" />
                </div>
                <div className="col-6">
                  <img className="img-fluid" src={logo2} alt="" />
                </div>
              </div>
            </div>
            <div className="col-md-8 col-12 d-none d-md-block">
              <div className="footer__menu">
                <ul className="list-unstyled flex-wrap d-flex flex-md-row align-items-center pt-4 justify-content-end">
                  {router.map(
                    (r, k) =>
                      r.ismenuItem && (
                        <li key={k}>
                          <Link to={r.path}>{r.label}</Link>
                        </li>
                      )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-12 row mx-0 px-0  mx-0 justify-content-between footer__copy-right">
            <div className="col-md-7 col-6 d-md-flex d-block">
              <p className="mb-0 d-none d-md-inline-block">جميع الحقوق محفوظة لوزارة التعليم @ ٢٠٢٠</p>
              <p className="mb-lg-0">سياسة الخصوصية</p>
              <p className="mb-0">شروط الاستخدام</p>
            </div>
            <div className="col-md-3 col-6  text-center text-md-left">
              <div className="footer__social mb-md-0 mb-3">
                <a href="/">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="/">
                  <i className="fab fa-twitter" />
                </a>
                <a href="/" className="mr-0">
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>

            <div className="col-12 border-top d-block d-md-none mt-3 pt-2">
              <p className="mb-0 ">جميع الحقوق محفوظة لوزارة التعليم @ ٢٠٢٠</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
