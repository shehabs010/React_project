import 'animate.css';
import './HomeBody.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel-rtl';
import { WOW } from 'wowjs';

import leftArrow from '../../assets/img/icons8-double-left-50.png';
import Initiative from './Initiative';
import Statistics from './Statistics';

class HomeBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    const wow = new WOW({
      offset: 100,
      mobile: false,
      live: true,
    });

    wow.init();

    this.handleIsMobile();
    window.addEventListener('resize', this.handleIsMobile);
  }

  handleIsMobile = () => {
    // eslint-disable-next-line no-magic-numbers
    const isMobile = window.innerWidth < 768;
    this.setState({ isMobile });
  };

  render() {
    const { isMobile } = this.state;
    return (
      <>
        {/* Start initiative Section */}
        <section className="initiative">
          <div className="container">
            <div className="row mx-0">
              <div className="col-12 px-0">
                <div className="col-md-8 mx-auto">
                  <div className="initiative__head text-center">
                    <h3 className="mb-5 wow animate__animated animate__fadeInUp">عن المبادرة</h3>
                    <p className="wow animate__animated animate__fadeInUp">
                      دليل التخصصات السعودي هو نظام إلكتروني مبنى على اعتماد وتوحيد التصنيف السعودي للتخصصات والمستويات التعليمية ISCED المعتمدة على
                      التصنيف الدولي المحدث
                    </p>
                  </div>
                </div>
                <div className="initiative__goals">
                  <p>تهدف المبادرة إلى تحقيق وتعزيز الأهداف التالية:</p>
                  <div className="col-12 row mx-0 px-0">
                    {isMobile && (
                      <OwlCarousel
                        loop
                        margin={10}
                        autoWidth
                        autoplay={false}
                        rtlClass="owl-rtl"
                        nav={false}
                        rtl
                        items={1}
                        dots
                        className="owl-theme"
                        id="Initiative">
                        <Initiative />
                      </OwlCarousel>
                    )}
                    {!isMobile && <Initiative />}

                    <div className="initiative__goals mt-5 mx-auto">
                      <button className="btn btn-primary btn-primary--more  px-5 py-3" type="button">
                        المزيد عن المبادرة <img src={leftArrow} alt="arrow-img" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End initiative Section */}

        {/* Start statistics section */}
        <section className="statistics mt-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="mb-5 wow animate__animated animate__fadeInUp">إحصائيات</h3>
              </div>
              <div className="col-12 d-flex flex-wrap">
                {isMobile && (
                  <OwlCarousel
                    loop
                    margin={10}
                    autoWidth
                    autoplay={false}
                    rtlClass="owl-rtl"
                    nav={false}
                    rtl
                    items={1}
                    dots
                    className="owl-theme"
                    id="statics">
                    <Statistics />
                  </OwlCarousel>
                )}
                {!isMobile && <Statistics />}
              </div>
            </div>
          </div>
        </section>
        {/* end statistics section */}
      </>
    );
  }
}

export default HomeBody;
