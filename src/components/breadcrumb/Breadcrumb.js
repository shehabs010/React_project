/* eslint-disable no-magic-numbers */
import './Breadcrumb.css';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import router from '../../routes/router';

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    this.handleIsMobile();
    window.addEventListener('resize', () => this.handleIsMobile);
  }

  handleIsMobile = () => {
    const isMobile = window.innerWidth < 991;
    this.setState({ isMobile });
  };

  render() {
    const { isMobile } = this.state;
    const pathnames = window.location.pathname.split('/');
    pathnames.shift();
    // this code for check if path (specialities/details)
    // or institutions/1 before specialities/details
    // to remove the duplicated title
    if (window.location.pathname.includes('specialities/details')) {
      pathnames.splice(1, 1);
    }
    if (window.location.pathname.includes('specialities/fields')) {
      pathnames.splice(1, 2);
    }

    const bread = pathnames.map((pathItem, i) => {
      const routItem = router.find(f => f.path === `/${pathItem}`);
      const { institutionTitle, specialityTitle } = this.props;
      return routItem !== undefined
        ? routItem
        : {
            label: pathnames[i - 1] === 'institutions' ? institutionTitle : specialityTitle,
            path: decodeURIComponent(window.location.pathname.substring(0, window.location.pathname.indexOf(pathItem) + pathItem.length)),
          };
    });
    let mobileView;
    if (isMobile && bread[bread.length - 2] !== undefined) {
      mobileView = (
        <ol className="breadcrumb bg-transparent position-relative align-items-center z-index-2 is-mobile">
          <i className="fas fa-chevron-right" />
          <li className="breadcrumb-item active" aria-current="page">
            <a href={bread[bread.length - 2].path}>{bread[bread.length - 2].label}</a>
          </li>
        </ol>
      );
    } else {
      mobileView = (
        <ol className="breadcrumb bg-transparent position-relative z-index-2 align-items-center is-mobile">
          {' '}
          <i className="fas fa-chevron-right" />{' '}
          <li className="breadcrumb-item">
            <a href="/">الرئيسية</a>
          </li>
        </ol>
      );
    }
    return (
      <div className="breadcrumb-container bg-white d-flex align-items-center">
        <div className="container">
          <nav aria-label="breadcrumb">
            {isMobile ? (
              mobileView
            ) : (
              <ol className="breadcrumb bg-transparent position-relative z-index-2">
                <li className="breadcrumb-item">
                  <a href="/">الرئيسية</a>
                </li>

                {bread.length &&
                  bread.map((b, i) =>
                    bread.length - 1 === i ? (
                      <li key={i} className="breadcrumb-item active" aria-current="page">
                        {b.label}
                      </li>
                    ) : (
                      <li key={i} className="breadcrumb-item" aria-current="page">
                        <a href={b.path}>{b.label}</a>
                      </li>
                    )
                  )}
              </ol>
            )}
          </nav>
        </div>
      </div>
    );
  }
}

Breadcrumb.propTypes = {
  institutionTitle: PropTypes.string,
  specialityTitle: PropTypes.string,
};

const mapStateToProps = state => ({
  specialityTitle: state.specialityTitle,
  // institution:state.institution,
  institutionTitle: state.institutionTitle,
});
export default connect(mapStateToProps)(Breadcrumb);
