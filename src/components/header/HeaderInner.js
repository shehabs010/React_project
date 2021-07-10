import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/svg/logoBlack.svg';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import MenuItems from './menuItems/MenuItems';
import Search from './search/Search';

class HeaderInner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavCollapsed: true,
      isSearchClicked: true,
      // autoCompleteRes: [],
    };
  }

  componentDidMount() {
    // autoCompleteSearch().then(response => {
    //   this.setState({
    //     autoCompleteRes: response.data,
    //   })
    // })
    // //error => { logger.log(error); window.location = "/error" })
  }

  handleNavCollapse = () => {
    const { isNavCollapsed } = this.state;
    this.setState({ isNavCollapsed: !isNavCollapsed });
  };

  SearchClick = () => {
    const { isSearchClicked } = this.state;
    this.setState({ isSearchClicked: !isSearchClicked });
  };

  render() {
    const { isNavCollapsed, isSearchClicked } = this.state;
    const { location } = this.props;
    return (
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light align-items-lg-start align-items-center">
            <Link to="/" className="navbar-brand ml-0">
              <img src={logo} alt="SG" />
            </Link>
            <button className="btn dark-mobile-search-icon d-lg-none" type="button" onClick={this.SearchClick}>
              <i className="fas fa-search" />
            </button>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample09"
              aria-controls="navbarsExample09"
              aria-expanded={!isNavCollapsed}
              aria-label="Toggle navigation"
              onClick={this.handleNavCollapse}>
              <span className="navbar-toggler-icon" />
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : 'collapse show'} navbar-collapse pt-0 pt-lg-4`} id="navbarSupportedContent">
              <MenuItems />
            </div>
            <div
              className={`${isNavCollapsed ? 'd-lg-none remove-shadow' : 'd-lg-none'} navbar-shadow `}
              onClick={this.handleNavCollapse}
              role="presentation"
            />
            <Search isSearchClicked={isSearchClicked} location={location} />
            <div
              className={`${isSearchClicked ? 'd-lg-none remove-shadow' : 'd-lg-none'} navbar-shadow `}
              onClick={this.SearchClick}
              role="presentation"
            />
          </nav>
        </div>
        <Breadcrumb />
      </header>
    );
  }
}

HeaderInner.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
};
export default HeaderInner;
