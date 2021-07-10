import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Footer from '../components/footer/Footer';
import HeaderInner from '../components/header/HeaderInner';

class InnrePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location, children } = this.props;
    return (
      <>
        <HeaderInner location={location} />
        <div className="wrapper">
          {children}

          <div className="Wrapper-margin" />
        </div>
        <Footer />
      </>
    );
  }
}
InnrePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
  children: PropTypes.element,
};

export default InnrePage;
