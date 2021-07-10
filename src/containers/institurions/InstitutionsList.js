/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/sort-comp */
/* eslint-disable no-magic-numbers */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import filterImg from '../../assets/img/svg/filter.svg';
import Filter from '../../components/filter/Filter';
import LoadingData from '../../components/LoadingDataDesign/Loading';
import Pagination from '../../components/pagination/Pagination';
import SpecialityItem from '../../components/specialityItems/SpecialityItem';
import RadioFilter from '../../components/topFilter/RadioFilter';
import { getCities, getDegrees, getFilterResults, getGender, getInstitutes, getUniversitiesType } from '../../services/InstituteServices';
import logger from '../../services/logger';

class InstitutionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: { cityItem: [0], degreeItem: [0], genderItem: [0], eduTypeItem: [0], supervisory: 0 },
      filtersData: { cityData: [], eduTypeData: [], genderData: [], degreeData: [], supervisory: [] },
      institutionsData: [],
      // pageNumber: 1,
      pageSize: 8,
      totalPages: 0,
      totalRecords: 0,
      item: [],
      currentPage: 1,
      isFilterShow: false,
      loadingDataFlag: false,
    };
  }

  loadResultDataFromServer() {
    const { currentPage, pageSize, selectedItems } = this.state;
    let { totalPages } = this.state;
    const { specialityId } = this.props;

    const cityItem = selectedItems.cityItem.some(item => item === 0) ? [] : selectedItems.cityItem;
    const degreeItem = selectedItems.degreeItem.some(item => item === 0) ? [] : selectedItems.degreeItem;
    const genderItem = selectedItems.genderItem.some(item => item === 0) ? [] : selectedItems.genderItem;
    const eduTypeItem = specialityId
      ? selectedItems.eduTypeItem.some(item => item === 0)
        ? []
        : selectedItems.eduTypeItem
      : selectedItems.eduTypeItem[selectedItems.eduTypeItem.length - 1];

    specialityId &&
      getFilterResults(specialityId, currentPage, pageSize, cityItem, degreeItem, genderItem, eduTypeItem).then(result => {
        totalPages = result.data && result.data.totalPages;
        result.data &&
          this.setState({
            institutionsData: result.data.data,
            totalPages,
            totalRecords: result.data.totalRecords,
          });
      });
    !specialityId &&
      getInstitutes(currentPage, pageSize, cityItem, degreeItem, genderItem, eduTypeItem).then(result => {
        result.data &&
          this.setState({
            institutionsData: result.data.data,
            totalPages: result.data.totalPages,
            totalRecords: result.data.totalRecords,
          });
      });
  }

  loadFilterDataFromServer() {
    const { filtersData } = this.state;
    this.setState({ loadingDataFlag: true });
    getCities().then(
      result => {
        if (result.data !== '') {
          filtersData.cityData = result.data;
          filtersData.cityData.unshift({ code: '0', id: 0, name: 'الكل' });
          this.setState({ filtersData });
        }
        this.setState({ loadingDataFlag: false });
      },
      error => {
        logger.log(error);
        window.location = '/error';
      }
    );

    getDegrees().then(
      result => {
        if (result.data !== '') {
          filtersData.degreeData = result.data;
          filtersData.degreeData.unshift({ code: '0', id: 0, name: 'الكل' });
          this.setState({ filtersData });
        }
      },
      error => {
        logger.log(error);
        window.location = '/error';
      }
    );

    getGender().then(
      result => {
        if (result.data !== '') {
          filtersData.genderData = result.data;
          filtersData.genderData.unshift({ code: '0', id: 0, name: 'الكل' });
          this.setState({ filtersData });
        }
      },
      error => {
        logger.log(error);
        window.location = '/error';
      }
    );

    getUniversitiesType().then(
      result => {
        if (result.data !== '') {
          filtersData.eduTypeData = result.data;
          filtersData.eduTypeData.unshift({ code: '0', id: 0, name: 'الكل' });
          this.setState({ filtersData });
        }
      },
      error => {
        logger.log(error);
        window.location = '/error';
      }
    );
  }

  handlePageChage = currentPage => {
    this.setState({ currentPage });
    this.loadResultDataFromServer();
  };

  handleSelectedItem = ({ target }) => {
    const { name } = target;
    let { selectedItems, item } = this.state;
    item = selectedItems[name];
    const index = item.indexOf(parseInt(target.value));

    // Toggel all item checked
    if (item.indexOf(0) > -1) {
      item.splice(item.indexOf(0), 1);
    } else if (parseInt(target.value) === 0) {
      item.splice(0, item.length);
    }

    // Toggle Item in selected value array
    index > -1 ? item.splice(index, 1) : item.push(parseInt(target.value));

    // no check any item reset to 0
    if (item.length === 0) {
      item.push(0);
    }

    this.setState({ item });
    this.loadResultDataFromServer();
  };

  componentDidMount() {
    this.loadFilterDataFromServer();
    this.loadResultDataFromServer();
  }

  handleToggleFilter = event => {
    event.preventDefault();
    const { isFilterShow } = this.state;
    this.setState({ isFilterShow: !isFilterShow });
  };

  supervisory = [{ value: '2', name: 'وزارة التعليم' }];

  instituteTypes = [
    { value: '2', name: 'الجامعات الحكومية' },
    { value: '3', name: 'الجامعات الأهلية' },
  ];

  render() {
    const { filtersData, isFilterShow, institutionsData, pageSize, totalRecords, currentPage, selectedItems, loadingDataFlag } = this.state;
    const { specialityId } = this.props;
    const items = institutionsData.map((item, i) => {
      const detailsData = [
        {
          title: 'النوع',
          desc: item.educationAuthorityType,
        },
        {
          title: 'الجهة المشرفة عليها',
          desc: item.supervisionAuthorityName,
        },
      ];
      specialityId &&
        detailsData.push({
          title: 'المدينة',
          desc: item.locationName,
        });
      !specialityId &&
        detailsData.push({
          title: 'التخصصات',
          desc: item.specialitiesCount,
        });
      const link = specialityId
        ? `/institutions/${item.instituteId}-${item.locationId}/specialities/${specialityId}`
        : `/institutions/${item.instituteId}`;
      return (
        <SpecialityItem
          key={i}
          title={item.instituteName}
          desc={item.educationAuthorityDescription}
          details={detailsData}
          link={link}
          clicked={() => this.cardSelected(item.code)}
          colStyle="col-md-12"
          marginbutton="mb-3"
          colmd="col-md-4"
        />
      );
    });

    return (
      <>
        <div className="filter row my-4">
          {!specialityId && (
            <div className="mt-3">
              {/* <RadioFilter data={this.supervisory} valuePropery="value" valueText="name" name="supervisory" selectedValue={this.state.selectedValue.supervisory} onSelect={this.handleSelectedItem} /> */}
              <RadioFilter
                data={filtersData.eduTypeData}
                valuePropery="id"
                valueText="name"
                name="eduTypeItem"
                selectedValue={selectedItems.eduTypeItem[selectedItems.eduTypeItem.length - 1]}
                onSelect={this.handleSelectedItem}
              />
            </div>
          )}
          <div className="row mx-0 justify-content-between mb-3 eduCard__header col-12 px-0 px-lg-3">
            <div className="dropdown  eduCard__sort d-lg-none">
              <a className="btn  dropdown-toggle" href="/" role="button" onClick={this.handleToggleFilter} aria-haspopup="true" aria-expanded="true">
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
                title="المدينة / المحافظة"
                name="cityItem"
                isSearchable
                searchPlaceHolder="ابحث المدينة.."
                data={filtersData.cityData}
                selectItem={this.handleSelectedItem}
                selectedValue={selectedItems.cityItem}
                type="checkbox"
              />
              {specialityId && (
                <Filter
                  title="نوع الجهة التعليمية"
                  name="eduTypeItem"
                  data={filtersData.eduTypeData}
                  selectItem={this.handleSelectedItem}
                  type="checkbox"
                  selectedValue={selectedItems.eduTypeItem}
                />
              )}
              <Filter
                title="الجنس"
                name="genderItem"
                data={filtersData.genderData}
                selectItem={this.handleSelectedItem}
                type="checkbox"
                selectedValue={selectedItems.genderItem}
              />
              <Filter
                title="الدرجة العلمية"
                name="degreeItem"
                data={filtersData.degreeData}
                selectItem={this.handleSelectedItem}
                type="checkbox"
                selectedValue={selectedItems.degreeItem}
              />
              <p className="py-5 px-4 d-lg-none">
                <button type="button" className="btn btn-primary w-100" onClick={this.handleToggleFilter}>
                  إظهار النتائج
                </button>
              </p>
            </div>
          </div>
          <div className="eduCard eduCard--result col-12 col-lg-9 pl-lg-5 px-0">
            <div className="row">
              <div className="row mx-0 justify-content-between my-2 eduCard__header col-12">
                {totalRecords > 0 && <label className="eduCard__count">{`${totalRecords} جهة تعليمية`}</label>}
              </div>
              <div className="position-relative w-100">
                <LoadingData flag={loadingDataFlag} />
                {items}
              </div>
            </div>
          </div>
        </div>
        <div>
          {totalRecords > 8 && (
            <Pagination currentPage={currentPage} totalItems={totalRecords} itemsPerPage={pageSize} onPageChange={this.handlePageChage} />
          )}
        </div>
      </>
    );
  }
}

InstitutionsList.propTypes = {
  specialityId: PropTypes.string,
};

export default InstitutionsList;
