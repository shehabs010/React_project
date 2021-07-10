/* eslint-disable no-magic-numbers */
import './Pagination.css';

import $ from 'jquery';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 8,
      upperPageBound: 4,
      lowerPageBound: 0,
      pageBound: 2,
      totalItems: 0,
    };
  }

  // Math.ceil(props.allPaging.length / state.itemsPerPage)
  static getDerivedStateFromProps(props, state) {
    return { pages: Math.ceil(props.totalItems / state.itemsPerPage), currentPage: props.currentPage };
  }

  handleClick = event => {
    const currentPage = Number(event.target.id);
    event.preventDefault();
    this.setState({ currentPage });
    // this.props.handleClicks(hello){
    //   this.setState(P)
    // }
    // emit currentpage

    if (currentPage === 1) {
      const upperPageBound = 4;
      const lowerPageBound = 0;
      this.setState({ upperPageBound, lowerPageBound });
    } else if (currentPage === this.state.pages) {
      const upperPageBound = currentPage;
      const lowerPageBound = currentPage - 4;
      this.setState({ upperPageBound, lowerPageBound });
    } else {
      if (currentPage === this.state.upperPageBound) {
        const upperPageBound = this.state.upperPageBound + this.state.pageBound;
        const lowerPageBound = this.state.lowerPageBound + this.state.pageBound;
        this.setState({ upperPageBound, lowerPageBound });
      }
      if (currentPage === this.state.lowerPageBound + 1) {
        const upperPageBound = this.state.upperPageBound - this.state.pageBound;
        const lowerPageBound = this.state.lowerPageBound - this.state.pageBound;
        this.setState({ upperPageBound, lowerPageBound });
      }
    }

    this.props.onPageChange(currentPage);

    this.scrollTop();
  };

  handlePreviusPage = event => {
    event.preventDefault();
    let { currentPage, lowerPageBound, upperPageBound, pageBound } = this.state;
    const { onPageChange } = this.props;
    currentPage = currentPage > 1 ? currentPage - 1 : currentPage;
    if (currentPage === lowerPageBound) {
      upperPageBound -= pageBound;
      lowerPageBound -= pageBound;
      this.setState({ upperPageBound, lowerPageBound });
    }
    this.setState({ currentPage });
    onPageChange(currentPage);
    this.scrollTop();
  };

  handleNextPage = event => {
    event.preventDefault();
    let { currentPage, upperPageBound, lowerPageBound, pageBound } = this.state;
    const { pages } = this.state;
    const { onPageChange } = this.props;
    currentPage = currentPage < pages ? currentPage + 1 : currentPage;
    if (currentPage > upperPageBound && currentPage !== pages) {
      upperPageBound += pageBound;
      lowerPageBound += pageBound;
      this.setState({ upperPageBound, lowerPageBound });
    }
    this.setState({ currentPage });
    onPageChange(currentPage);
    this.scrollTop();
  };

  handleIncrement = event => {
    event.preventDefault();
    let { currentPage, upperPageBound, lowerPageBound, pageBound } = this.state;
    const { onPageChange } = this.props;
    upperPageBound += pageBound;
    lowerPageBound += pageBound;
    this.setState({ upperPageBound, lowerPageBound });
    currentPage = lowerPageBound + 1;
    this.setState({ currentPage });
    onPageChange(currentPage);
  };

  handleDecrement = event => {
    event.preventDefault();
    let { currentPage, upperPageBound, lowerPageBound, pageBound } = this.state;
    const { onPageChange } = this.props;
    upperPageBound -= pageBound;
    lowerPageBound -= pageBound;
    currentPage = lowerPageBound > 1 ? lowerPageBound + 1 : 1;
    this.setState({ upperPageBound, lowerPageBound });

    this.setState({ currentPage });
    onPageChange(currentPage);
  };

  // reset
  componentDidUpdate(prevProps, prevState) {
    const { pages } = this.state;
    if (pages !== prevState.pages) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        upperPageBound: 4,
        lowerPageBound: 0,
      });
    }
  }

  scrollTop = () => {
    $('#root').animate({ scrollTop: 0 }, 2000);
  };

  render() {
    const { currentPage, upperPageBound, lowerPageBound, pages } = this.state;

    const pageNumbers = _.range(1, pages);

    const renderPageNumbers = pageNumbers.map(
      number =>
        number < upperPageBound + 1 &&
        number > lowerPageBound &&
        number > 1 &&
        number < pages && (
          <li className={currentPage === number ? 'page-item active' : 'page-item'} key={number}>
            <a className="page-link" href="/" id={number} onClick={this.handleClick.bind(this)}>
              {number}
            </a>
          </li>
        )
    );
    return (
      <div aria-label="Page navigation " className="my-3">
        {/* { renderCard} */}
        {pages !== 1 || pages > 1 ? (
          <ul className="pagination justify-content-center pl-0" id="page-numbers">
            <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
              <a className="page-link" href="/" onClick={this.handlePreviusPage}>
                &lt;
              </a>
            </li>

            <li className={currentPage === 1 ? 'page-item active' : 'page-item'}>
              <a className="page-link" href="/" id={1} onClick={this.handleClick}>
                1
              </a>
            </li>

            {lowerPageBound > 0 && (
              <li className="page-item">
                <a href="/" onClick={this.handleDecrement}>
                  {' '}
                  &hellip;{' '}
                </a>
              </li>
            )}

            {renderPageNumbers}

            {pages > upperPageBound + 1 && (
              <li className="page-item">
                <a href="/" onClick={this.handleIncrement}>
                  {' '}
                  &hellip;{' '}
                </a>
              </li>
            )}

            <li className={currentPage === pages ? 'page-item active' : 'page-item'}>
              <a className="page-link" href="/" id={pages} onClick={this.handleClick}>
                {pages}
              </a>
            </li>

            <li className={currentPage === pages ? 'page-item disabled' : 'page-item'}>
              <a className="page-link" href="/" onClick={this.handleNextPage}>
                &gt;{' '}
              </a>
            </li>
          </ul>
        ) : (
          ''
        )}
      </div>
    );
  }
}
Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalItems: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Pagination;
