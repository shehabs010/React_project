import equal from 'fast-deep-equal';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadingData from '../../components/LoadingDataDesign/Loading';
import Pagination from '../../components/pagination/Pagination';
import SpecialityItem from '../../components/specialityItems/SpecialityItem';
import TopFilter from '../../components/topFilter/TopFilter';
import logger from '../../services/logger';
import { getDetailedFields, getNarrowFields, getPublicCards, getWideFields } from '../../services/specialityServices';
import * as actionTypes from '../../store/actions';

class SpecialitiesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: [],
      selectedCardId: null,
      fieldId: 1,
      pageNumber: 1,
      pageSize: 8,
      Title: '',
      totalPages: 0,
      totalRecords: 0,
      currentPage: 1,
      filters: [{ id: '1', title: 'اختر المجال الرئيسي' }],
      fieldsData: { WideField: [], NarrowField: [], DetailedField: [] },
      fieldSelectedValue: { WideField: '1', NarrowField: '1', DetailedField: '1' },
      loadingDataFlag: false,
    };
  }

  loadDataFromServer(currentPage = 1, WideField, NarrowField, DetailedField) {
    const { pageSize, filters } = this.state;
    this.setState({ loadingDataFlag: true });

    getPublicCards(currentPage, pageSize, WideField, NarrowField, DetailedField).then(
      response => {
        this.setState({
          itemData: response.data.data,
          totalPages: response.data.totalPages,
          totalRecords: response.data.totalRecords,
          loadingDataFlag: false,
        });
        const { id } = filters[filters.length - 1];
        document.getElementById(id).disabled = false;
      },
      error => {
        logger.log(error);
        window.location = '/error';
      }
    );
  }

  handlePageChage = currentPage => {
    this.setState({ currentPage });
    const { fieldSelectedValue } = this.state;
    const WideField = fieldSelectedValue.WideField !== '1' ? fieldSelectedValue.WideField : '';
    const NarrowField = fieldSelectedValue.NarrowField !== '1' ? fieldSelectedValue.NarrowField : '';
    const DetailedField = fieldSelectedValue.DetailedField !== '1' ? fieldSelectedValue.DetailedField : '';
    this.loadDataFromServer(currentPage, WideField, NarrowField, DetailedField);
  };

  getItemTitle = title => {
    this.props.GetTitle(title);
  };

  handelFilterChange = event => {
    const { fieldsData, fieldSelectedValue, loadingDataFlag } = this.state;

    const filters = [{ id: '1', title: 'اختر المجال الرئيسي' }];

    if (event.target.id === '1') {
      fieldSelectedValue.WideField = event.target.value;
      fieldSelectedValue.NarrowField = '1';
      fieldSelectedValue.DetailedField = '1';

      event.target.value !== '1' && filters.push({ id: '2', title: 'اختر المجال الفرعي1' });
      this.setState({ filters, fieldSelectedValue });
      if (event.target.value !== '1') document.getElementById('2').disabled = true;
      getNarrowFields(fieldSelectedValue.WideField).then(
        result => {
          fieldsData.NarrowField = result.data;
          this.setState({ fieldsData });
        },
        error => {
          logger.log(error);
          window.location = '/error';
        }
      );
      this.handlePageChage(1);
    } else if (event.target.id === '2' && !loadingDataFlag) {
      fieldSelectedValue.NarrowField = event.target.value;
      fieldSelectedValue.DetailedField = '1';
      filters.push({ id: '2', title: 'اختر المجال الفرعي1' });

      event.target.value !== '1' && filters.push({ id: '3', title: 'اختر المجال الفرعي2' });
      this.setState({ filters, fieldSelectedValue });
      if (event.target.value !== '1') document.getElementById('3').disabled = true;
      const narrowItem = event.target.value !== '1' && fieldsData.NarrowField.filter(d => d.code === fieldSelectedValue.NarrowField);
      event.target.value !== '1' &&
        getDetailedFields(fieldSelectedValue.NarrowField, narrowItem[0].relationDetailCode).then(
          result => {
            fieldsData.DetailedField = result.data;
            this.setState({ fieldsData });
          },
          error => {
            logger.log(error);
            window.location = '/error';
          }
        );
      this.handlePageChage(1);
    } else if (event.target.id === '3' && !loadingDataFlag) {
      fieldSelectedValue.DetailedField = event.target.value;
      this.setState({ fieldSelectedValue });
      this.handlePageChage(1);
    }
  };

  componentDidMount() {
    const { id } = this.props.match;
    const { fieldsData, fieldSelectedValue } = this.state;

    getWideFields().then(
      response => {
        fieldsData.WideField = response.data;
        fieldSelectedValue.WideField = '1';

        this.setState({ fieldsData, fieldSelectedValue });

        if (id !== 1 && id !== undefined) {
          fieldSelectedValue.WideField = id;
          fieldSelectedValue.NarrowField = '1';
          fieldSelectedValue.DetailedField = '1';
          this.setState({
            filters: [
              { id: '1', title: 'اختر المجال الرئيسي' },
              { id: '2', title: 'اختر المجال الفرعي1' },
            ],
            fieldSelectedValue,
          });
        }
        this.loadDataFromServer();
      },
      error => {
        logger.log(error);
        window.location = '/error';
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (!equal(this.props.match.id, prevProps.match.id)) window.location.reload();
  }

  render() {
    const { itemData, filters, fieldsData, fieldSelectedValue, pageSize, totalRecords, currentPage, loadingDataFlag } = this.state;

    const items = itemData.map((item, i) => {
      let detailsData;

      if (item.coursesDegree) {
        detailsData = [
          { title: 'التخصصات الفرعية', desc: item.subSpecialitiesCount },
          { title: 'المقررات المندرجة', desc: item.coursesCount },
          { title: 'الدرجة العلمية', desc: item.coursesDegree },
        ];
      } else {
        detailsData = [
          { title: 'التخصصات الفرعية', desc: item.subSpecialitiesCount },
          { title: 'المقررات المندرجة', desc: item.coursesCount },
        ];
      }
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
          colmd="col-md-3"
          clicky={title => this.getItemTitle(title)}
        />
      );
    });

    return (
      <>
        <div className="row mx-0">
          <h3 className="pageTitle col-12">التخصصات</h3>
        </div>
        <TopFilter filters={filters} data={fieldsData} selectedValue={fieldSelectedValue} cbChange={this.handelFilterChange} />

        <div className="eduCard eduCard--result">
          <div className="row mx-0 justify-content-between mb-3 eduCard__header col-12">
            {totalRecords > 0 && <label className="eduCard__count">{`${totalRecords} تخصص`}</label>}
            {/* <div className="dropdown show eduCard__sort">
                                <a className="btn  dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    ترتيب حسب الاسم
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div> */}
          </div>
          <div className="position-relative">
            <LoadingData flag={loadingDataFlag} />
            {items}
          </div>
        </div>
        <div>
          <Pagination currentPage={currentPage} totalItems={totalRecords} itemsPerPage={pageSize} onPageChange={this.handlePageChage} />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  StoreTitle: state.title,
});

const mapDispatchToProps = dispatch => ({
  GetTitle: title =>
    dispatch({
      type: actionTypes.GOTO_DETAILS_TITLE,
      payload: {
        specialityTitle: title,
      },
    }),
});
export default connect(mapStateToProps, mapDispatchToProps)(SpecialitiesList);
