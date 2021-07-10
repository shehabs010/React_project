import React, { Component } from "react";
import Wrapper from "../hoc/Wrapper";
import Header from './../components/header/Header';
import Widefields from './../components/widefields/Widefields';
import HomeBody from './../components/homeBody/HomeBody';
import Footer from './../components/footer/Footer';
import arrowDown from "../assets/img/svg/arrow-down.png";

class Home extends Component {

  render() {
    return (
      <Wrapper title="الرئيسية">

        <>
          <header>
            <div className="container">
              {/* Header (menu) compnent */}
              <Header />
              {/* <!-- start filter section --> */}
              <div className="filter__text col-md-6 mx-auto my-md-5">
                <p>دليلك نحو تخصصات التعليم فى المملكة العربية السعودية</p>
              </div>

              <Widefields />
            </div>
            <div className="scroll_down d-none d-lg-block">
              <a href="/">
                تعرف على الدليل
            <img src={arrowDown} alt="" />
                <img src={arrowDown} alt="" />
              </a>
            </div>
          </header>
          <HomeBody />
          <Footer />
        </>
      </Wrapper>
    );
  }
}

export default Home;
