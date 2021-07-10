/* eslint-disable no-magic-numbers */
import './Filter.css';

import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import FilterItem from './FilterItem';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      search: '',
    };
  }

  showMore = event => {
    event.preventDefault();
    const { current } = this.state;
    this.setState({ current: current + 1 });
  };

  handleChange = ({ target }) => {
    const search = target.value;
    this.setState({ search, current: 1 });
  };

  render() {
    const { title, isSearchable, searchPlaceHolder, data, selectItem, valueProperty, valueText } = this.props;
    const { current, search } = this.state;
    const endIndex = current * 5;
    let { filterItem, filter } = '';

    filter = search !== '' ? data.filter(d => d[valueText].includes(search)) : data;
    filterItem = _(filter)
      .slice(0)
      .take(endIndex)
      .value()
      // eslint-disable-next-line react/jsx-props-no-spreading
      .map((item, i) => <FilterItem value={item[valueProperty]} label={item[valueText]} key={i} onSelect={selectItem} {...this.props} />);

    return (
      <div className="filter__group">
        <h6 className="filter__title">{title}</h6>
        {isSearchable && <input type="text" placeholder={searchPlaceHolder} className="filter__input" name="search" onChange={this.handleChange} />}
        <div className="filter__items">
          {filterItem}
          {filter.length > 5 && endIndex < filter.length && (
            <a href="/" onClick={this.showMore} className="filter__more">
              المزيد <i className="fa fa-chevron-down" />
            </a>
          )}
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  title: PropTypes.string,
  isSearchable: PropTypes.bool,
  searchPlaceHolder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  selectItem: PropTypes.func,
  valueProperty: PropTypes.string,
  valueText: PropTypes.string,
};

Filter.defaultProps = {
  valueProperty: 'id',
  valueText: 'name',
};

export default Filter;
