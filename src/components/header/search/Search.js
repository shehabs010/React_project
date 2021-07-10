import '../Header.css';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logger from '../../../services/logger';
import { autoCompleteSearch } from '../../../services/SearchServices';
import * as actionTypes from '../../../store/actions';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      show: false,
      autoCompleteRes: {
        specialityRanks: [],
        errors: [],
      },
      noResult: 'لايوجد نتائج',
    };
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value });

    const x = event.target.value.split(' ').join('');
    this.initAutoComplete(x);
  };

  handleAfterchooseElem = name => {
    this.setState({
      inputValue: name,
    });
  };

  handelEventByKeyPress = target => {
    const { inputValue } = this.state;
    const { GetValue } = this.props;
    // eslint-disable-next-line no-magic-numbers
    if (target.charCode === 13 && inputValue) {
      GetValue(inputValue);
      // console.log(this.props.location.pathname)
      window.location.pathname = 'search';
    }
  };

  handleAfterclick = event => {
    const { inputValue } = this.state;
    const { GetValue } = this.props;
    if (!inputValue) {
      event.preventDefault();
    } else {
      GetValue(inputValue);
      window.location.pathname = 'search';
    }
    // router.push({path:'/search'})
  };

  initAutoComplete = inputValue => {
    if (inputValue && inputValue.length + 1 > 5) {
      autoCompleteSearch(inputValue).then(
        response => {
          this.setState({
            show: true,
            autoCompleteRes: response.data,
          });
        },
        error => {
          logger.log(error);
          window.location = '/error';
        }
      );
    } else {
      this.setState({
        show: false,
      });
    }
  };

  reload = (event, code) => {
    this.setState({ show: false });
    event.preventDefault();
    window.location.replace(`/specialities/details/${code}`);
  };

  render() {
    const { autoCompleteRes, noResult, show, inputValue } = this.state;
    const { isSearchClicked } = this.props;

    let autoCompleteList;
    if (autoCompleteRes.specialityRanks) {
      autoCompleteList = autoCompleteRes.specialityRanks.map(item => (
        <li key={item.code}>
          <Link type="submit" onClick={e => this.reload(e, item.code)}>
            {item.name}
          </Link>
        </li>
      ));
    } else {
      autoCompleteList = <li className="py-3">{noResult}</li>;
    }

    return (
      <div
        className={`form-inline my-2 my-lg-0 justify-content-end pt-0 pt-lg-3 search-wrapper-input
        ${isSearchClicked ? 'd-lg-flex d-transform-top search-mobile' : 'search-mobile'} ${show ? 'autoCompleteShow' : ''}`}>
        <input
          className="form-control col-lg-12 col-10"
          type="text"
          placeholder="ابحث عن تخصص"
          value={inputValue}
          onChange={this.handleChange}
          onKeyPress={e => this.handelEventByKeyPress(e)}
        />
        <ul className={`list-unstyled auto-complete-search col-lg-12 col-10 ${show ? 'show' : ''}`}>{autoCompleteList}</ul>
        <Link to="/search" className="btn search-icon my-2 my-sm-0" onClick={this.handleAfterclick}>
          <i className="fas fa-search" />
        </Link>
      </div>
    );
  }
}

Search.propTypes = {
  GetValue: PropTypes.func,
  isSearchClicked: PropTypes.bool,
};

const mapStateToProps = state => ({
  inputValue: state.inputSearch,
});
const mapDispatchToProps = dispatch => ({
  GetValue: s =>
    dispatch({
      type: actionTypes.AUTO_COMPLETE,
      payload: {
        inputValue: s,
      },
    }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);
