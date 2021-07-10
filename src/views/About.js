import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import InnrePage from '../containers/InnrePage';
import Wrapper from '../hoc/Wrapper';

class About extends Component {
  render() {
    return (
      <Wrapper title="عن المبادرة" bodyClass="inner">
        <InnrePage>
          <div className="container py-5">
            <div className="row mx-0">
              <h3 className="pageTitle col-12">عن المبادرة</h3>
            </div>

            <NavLink to="/" className="btn btn-primary my-5">
              الصفحة الرئيسية{' '}
            </NavLink>
          </div>
        </InnrePage>
      </Wrapper>
    );
  }
}

export default About;
