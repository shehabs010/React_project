import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/svg/logo.svg';
import MenuItems from './menuItems/MenuItems';
import Search from './search/Search';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavCollapsed: true,
      isSearchClicked: true,
      // autoCompleteRes: [],
      show: false,
    };
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
    const { isNavCollapsed, isSearchClicked, show } = this.state;
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark align-items-lg-start align-items-center">
          <Link className="navbar-brand ml-0" to="/">
            <img src={logo} alt="SG" />
          </Link>
          <button className="btn light-mobile-search-icon d-lg-none" type="button" onClick={this.SearchClick}>
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
          <div className={`${isNavCollapsed ? 'collapse ' : 'collapse show'} navbar-collapse pt-0 pt-lg-4`} id="navbarSupportedContent">
            <MenuItems />

            {/* <div
            className={`${
              (!isNavCollapsed && isSearchClicked) ||
              (isNavCollapsed && !isSearchClicked)
                ? "d-lg-none"
                : "d-lg-none d-none"
            } navbar-shadow `}
            onClick={
              !isNavCollapsed && isSearchClicked ? handleNavCollapse : SearchClick
            }> */}
          </div>
          <div
            className={`${isNavCollapsed ? 'd-lg-none remove-shadow' : 'd-lg-none'} navbar-shadow `}
            onClick={this.handleNavCollapse}
            role="presentation"
          />
          <Search isAutoComplete={show} isSearchClicked={isSearchClicked} />
          <div
            className={`${isSearchClicked ? 'd-lg-none remove-shadow' : 'd-lg-none'} navbar-shadow `}
            onClick={this.SearchClick}
            role="presentation"
          />
        </nav>
      </>
    );
  }
}

export default Header;
