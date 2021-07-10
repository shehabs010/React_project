/* eslint-disable no-magic-numbers */
/* eslint-disable complexity */
import '../../components/header/Header.css';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import noDataImg from '../../assets/img/search.png';
import filterImg from '../../assets/img/svg/filter.svg';
import Filter from '../../components/filter/Filter';
import Pagination from '../../components/pagination/Pagination';
import SpecialityItem from '../../components/specialityItems/SpecialityItem';
import logger from '../../services/logger';
import { getSearchResult } from '../../services/SearchServices';
import { getDetailedFields, getNarrowFields, getWideFields } from '../../services/specialityServices';
import * as actionTypes from '../../store/actions';

class SearchResultsList extends Component {
  constructor(props) {
    super(props);
    const { InputSearch } = props;
    this.state = {
      selectedItems: { WideFieldItem: '1', NarrowFieldItem: '1', DetailedFieldItem: '1' },
      filtersData: { WideField: [], NarrowField: [], DetailedField: [] },
      searchResultData: [],
      totalPages: 0,
      totalRecords: 0,
      pageSize: 8,
      currentPage: 1,
      isFilterShow: false,
      isItemSelected: false,
      isServiceCalled: false,
      InputSearch: InputSearch || '',
    };
  }

  componentDidMount() {
    const { filtersData } = this.state;

    getWideFields().then(
      response => {
        filtersData.WideField = response.data;
        filtersData.WideField.unshift({ nameAr: 'الكل', code: '1' });
        this.setState({ filtersData });
      },
      error => {
        logger.log(error);
        window.location = '/error';
      }
    );

    this.loadDataFromServer();
  }

  handlePageChage = currentPage => {
    this.setState({ currentPage });
    const { selectedItems } = this.state;
    const WideField = selectedItems.WideFieldItem !== '1' ? selectedItems.WideFieldItem : '';
    const NarrowField = selectedItems.NarrowFieldItem !== '1' ? selectedItems.NarrowFieldItem : '';
    const DetailedField = selectedItems.DetailedFieldItem !== '1' ? selectedItems.DetailedFieldItem : '';
    this.loadDataFromServer(currentPage, WideField, NarrowField, DetailedField);
  };

  handleWideFieldItem = ({ target }) => {
    const { selectedItems, filtersData } = this.state;
    selectedItems.WideFieldItem = target.value;
    selectedItems.NarrowFieldItem = '1';
    selectedItems.DetailedFieldItem = '1';
    this.setState({ selectedItems, isItemSelected: true });

    getNarrowFields(selectedItems.WideFieldItem).then(
      result => {
        filtersData.NarrowField = result.data;
        filtersData.NarrowField.unshift({ nameAr: 'الكل', code: '1' });
        this.setState({ filtersData });
      },
      error => {
        logger.log(error);
        window.location = '/error';
      }
    );

    this.handlePageChage(1);
  };

  handleNarrowFieldItem = ({ target }) => {
    const { selectedItems, filtersData } = this.state;
    selectedItems.NarrowFieldItem = target.value;
    selectedItems.DetailedFieldItem = '1';
    this.setState({ selectedItems, isItemSelected: true });

    const narrowItem = filtersData.NarrowField.filter(d => d.code === selectedItems.NarrowFieldItem);
    getDetailedFields(selectedItems.NarrowFieldItem, narrowItem[0].relationDetailCode).then(
      result => {
        filtersData.DetailedField = result.data;
        filtersData.DetailedField.unshift({ nameAr: 'الكل', code: '1' });
        this.setState({ filtersData });
      },
      error => {
        logger.log(error);
        window.location = '/error';
      }
    );
    this.handlePageChage(1);
  };

  handleDetailedFieldItem = ({ target }) => {
    const { selectedItems } = this.state;
    selectedItems.DetailedFieldItem = target.value;
    this.setState({ selectedItems, isItemSelected: true });
    this.handlePageChage(1);
  };

  getItemTitle = title => {
    const { GetTitle } = this.props;
    GetTitle(title);
  };

  handleToggleFilter = event => {
    event.preventDefault();
    const { isFilterShow } = this.state;
    this.setState({ isFilterShow: !isFilterShow });
  };

  handleChange = event => {
    this.setState({ InputSearch: event.target.value });
  };

  handelEventByKeyPress = target => {
    const { InputSearch } = this.state;
    const { GetValue } = this.props;
    if (target.charCode === 13 && InputSearch && InputSearch !== '') {
      GetValue(InputSearch);
      window.location.reload();
    }
  };

  handleAfterclick = () => {
    const { InputSearch } = this.state;
    const { GetValue } = this.props;
    if (InputSearch && InputSearch !== undefined) {
      GetValue(InputSearch);
      window.location.reload();
    }
  };

  loadDataFromServer(currentPage = 1, WideField, NarrowField, DetailedField) {
    let { pageSize, InputSearch, totalPages } = this.state;

    getSearchResult(InputSearch, currentPage, pageSize, WideField, NarrowField, DetailedField).then(response => {
      totalPages = response.data.totalPages;
      this.setState({
        searchResultData: response.data.data,
        totalPages,
        totalRecords: response.data.totalRecords,
        isServiceCalled: true,
      });
      localStorage.removeItem('inputValue');
    });
  }

  render() {
    const {
      isFilterShow,
      selectedItems,
      filtersData,
      totalRecords,
      currentPage,
      pageSize,
      searchResultData,
      isItemSelected,
      isServiceCalled,
      InputSearch,
    } = this.state;

    const items =
      isServiceCalled && searchResultData.length === 0 && isItemSelected ? (
        <div className="col-12 eduCard__card bg-white mb-3">لاتوجد تخصصات</div>
      ) : (
        searchResultData.map((item, i) => {
          let detailsData;
          detailsData = [
            { title: 'التخصصات المندرجة', desc: item.subSpecialitiesCount },
            { title: 'أهم المقررات', desc: item.coursesCount },
            { title: 'المجال الرئيسي', desc: item.coursesDegree },
          ];
          const link = `/specialities/details/${item.code}`;
          return (
            <SpecialityItem
              key={i}
              title={item.name}
              desc={item.description}
              subSpCount={item.subSpecialitiesCount}
              details={detailsData}
              link={link}
              clicked={() => this.cardSelected(item.code)}
              colStyle="col-md-12"
              marginbutton="mb-3"
              colmd="col-md-4"
              clicky={title => this.getItemTitle(title)}
            />
          );
        })
      );

    const search = (
      <div
        className={`form-inline my-2 my-lg-0 justify-content-end pt-lg-2 pl-0 ${
          isServiceCalled && searchResultData.length === 0 && !isItemSelected ? 'col-12 col-md-8' : ''
        }`}>
        <input
          placeholder="ابحث عن تخصص"
          className="form-control col-lg-12 col-12 search-input"
          type="text"
          value={InputSearch}
          onChange={this.handleChange}
          onKeyPress={e => this.handelEventByKeyPress(e)}
        />
        <Link
          to="/search"
          className={`btn my-md-0 searchPage-icon mr-2 pt-2  ${
            isServiceCalled && searchResultData.length === 0 && !isItemSelected ? 'my-0' : 'my-2'
          }`}
          onClick={this.handleAfterclick}>
          <i className="fas fa-search" />
        </Link>
      </div>
    );

    return (
      <>
        <div className="col-12 my-5">
          {items.length !== 0 && (
            <div className="eduCard eduCard--result  col-12 my-3">
              <div className="filter row my-4">
                <div className="row mx-0 justify-content-between mb-3 eduCard__header col-12 px-0 px-lg-3">
                  <div className="dropdown  eduCard__sort d-lg-none">
                    <a
                      className="btn  dropdown-toggle"
                      href="/"
                      role="button"
                      onClick={this.handleToggleFilter}
                      aria-haspopup="true"
                      aria-expanded="true">
                      <img src={filterImg} alt="" className="mr-2" />
                      الفلترة
                    </a>
                  </div>
                </div>

                <div className={isFilterShow ? 'filter__card col-12 col-lg-3 px-0 d-block' : 'filter__card col-12 col-lg-3 px-0 d-lg-block d-none'}>
                  <div className="filter__container">
                    <div className="filter__header d-lg-none d-flex justify-content-between align-items-center">
                      <h4>الفلترة</h4>
                      <a className="filter__close" href="/" onClick={this.handleToggleFilter}>
                        close
                      </a>
                    </div>

                    <Filter
                      title="المجال الرئيسي"
                      isSearchable
                      searchPlaceHolder="ابحث المجال الرئيسي.."
                      data={filtersData.WideField}
                      selectItem={this.handleWideFieldItem}
                      type="radio"
                      name="1"
                      selectedValue={selectedItems.WideFieldItem}
                      valueProperty="code"
                      valueText="nameAr"
                    />
                    {selectedItems.WideFieldItem !== '1' && filtersData.NarrowField.length !== 0 && (
                      <Filter
                        title="المجال الفرعي 1"
                        isSearchable
                        searchPlaceHolder="ابحث المجال الفرعي 1.."
                        data={filtersData.NarrowField}
                        selectItem={this.handleNarrowFieldItem}
                        type="radio"
                        name="2"
                        selectedValue={selectedItems.NarrowFieldItem}
                        valueProperty="code"
                        valueText="nameAr"
                      />
                    )}
                    {selectedItems.NarrowFieldItem !== '1' && filtersData.DetailedField.length !== 0 && (
                      <Filter
                        title="المجال الفرعي 2"
                        isSearchable
                        searchPlaceHolder="ابحث المجال الفرعي 2.."
                        data={filtersData.DetailedField}
                        selectItem={this.handleDetailedFieldItem}
                        type="radio"
                        name="3"
                        selectedValue={selectedItems.DetailedFieldItem}
                        valueProperty="code"
                        valueText="nameAr"
                      />
                    )}
                    <p className="py-5 px-4 d-lg-none">
                      <button type="button" className="btn btn-primary w-100" onClick={this.handleToggleFilter}>
                        إظهار النتائج
                      </button>
                    </p>
                  </div>
                </div>

                <div className="eduCard eduCard--result col-12 col-lg-9 pl-lg-5 px-0 search-wrapper-input">
                  {search}
                  <div className="row">
                    <div className="row mx-0  my-4 mt-5 searchResult__header col-12">
                      <label htmlFor="spciality" className="searchResult__subTitle">
                        التخصصات
                      </label>
                    </div>
                    <div className="row mx-0 justify-content-between my-3 eduCard__header col-12">
                      {totalRecords > 0 && <label className="eduCard__count">{`${totalRecords} تخصص`}</label>}
                    </div>
                    {items}
                  </div>
                  <div className="clearfix" />
                  {totalRecords > 8 && (
                    <Pagination currentPage={currentPage} totalItems={totalRecords} itemsPerPage={pageSize} onPageChange={this.handlePageChage} />
                  )}
                  <div className="clearfix" />
                </div>
              </div>
            </div>
          )}
          {isServiceCalled && searchResultData.length === 0 && !isItemSelected && (
            <div>
              {search}
              <div className="col-12 noResult__card bg-white my-3 pl-3 pl-md-5">
                <img src={noDataImg} alt="" className="mr-2" />
                عذرا..لا يوجد نتائج لبحثك في التخصصات
                <div className="p-md-5 p-3">
                  <Link to="/specialities" className="btn btn-primary col-8 col-md-3">
                    تصفح التخصصات
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
SearchResultsList.propTypes = {
  GetValue: PropTypes.func,
  GetTitle: PropTypes.func,
  InputSearch: PropTypes.string,
};

const mapStateToProps = state => ({
  InputSearch: state.inputSearch,
});

const mapDispatchToProps = dispatch => ({
  GetValue: value =>
    dispatch({
      type: actionTypes.AUTO_COMPLETE,
      payload: {
        inputValue: value,
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsList);
