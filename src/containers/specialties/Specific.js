import React, { Component } from 'react';
import { connect } from 'react-redux';

import checklist from '../../assets/img/spiciality/checklist/checklist.png';
import document from '../../assets/img/spiciality/document/document.png';
import target from '../../assets/img/spiciality/target/target.png';
import ListBlock from '../../components/common/ListBlock';
import LoadingData from '../../components/LoadingDataDesign/Loading';
import AccordionDetails from '../../components/tabDetails/AccordionDetails';
import TabDetails from '../../components/tabDetails/TabDetails';
import RadioFilter from '../../components/topFilter/RadioFilter';
import { getApplication } from '../../services/InstituteServices';
import logger from '../../services/logger';
import * as actionTypes from '../../store/actions';

class Specific extends Component {
  state = {
    appData: [],
    educationInstituteName: '',
    columnSort: { path: 'courseCode', order: 'asc' },
    selectedValue: '1',
    loadingDataFlag: false,
  };

  componentDidMount() {
    const { match } = this.props;

    const params = {
      InstituteId: match.id.split('-', 1).pop(),
      LocationId: match.id.split('-', 2).pop(),
      RankCode: match.code,
    };
    this.setState({ loadingDataFlag: true });
    getApplication({ ...params }).then(
      response => {
        this.setState({ appData: response.data.specializations, educationInstituteName: response.data.educationInstituteName });
        this.props.GetTitle(response.data.specializations[0].application.speciality.specialityName, response.data.educationInstituteName);
        this.setState({ loadingDataFlag: false });
      },
      error => {
        logger.log(error);
        window.location = '/error';
      }
    );
  }

  selectHandler = ({ target }) => {
    let { selectedValue, appData, educationInstituteName } = this.state;
    selectedValue = target.value;
    this.setState({ selectedValue });
    const applicationDocument = appData && appData.find((item, i) => (i + 1).toString() === selectedValue);
    this.props.GetTitle(applicationDocument.application.speciality.specialityName, educationInstituteName);
  };

  handleSort = columnSort => {
    this.setState({ columnSort });
  };

  render() {
    const { appData, educationInstituteName, selectedValue } = this.state;

    const collegeNames = appData && appData.map((item, i) => ({ value: (i + 1).toString(), name: item.collegeName }));

    const applicationDocument = appData && appData.find((item, i) => (i + 1).toString() === selectedValue);

    return (
      <>
        <div className="row mx-0 mb-5">
          <h3 className="pageTitle col-12">{applicationDocument && applicationDocument.application.speciality.specialityName} </h3>
        </div>
        <div className="mt-3">
          {collegeNames && collegeNames.length > 1 && (
            <RadioFilter
              data={collegeNames && collegeNames}
              valuePropery="value"
              valueText="name"
              name="college"
              selectedValue={selectedValue && selectedValue}
              onSelect={this.selectHandler}
            />
          )}
        </div>

        <div className="content">
          <div className="row mx-0">
            <div className="eduCard eduCard--specific col-12 mb-3 px-sm-3 px-0">
              <div className="eduCard__card  bg-white">
                <div className="eduCard__wrapper--item">
                  <div className="">
                    <div className="d-flex align-items-center mb-2">
                      <img src={document} className="eduCard__icon" alt="" width="23" height="23" />

                      <h6 className="eduCard__title mb-0">وصف التخصص</h6>
                    </div>
                    <p className="eduCard__desc">{applicationDocument && applicationDocument.application.speciality.description}</p>
                  </div>
                </div>

                <div className="row mx-0 align-items-baseline eduCard__details justify-content-center mb-md-4">
                  <div className="col pl-md-0 px-0">
                    <div className="eduCard__wrapper--item">
                      <div className="">
                        <ListBlock
                          padRight="pl-0"
                          title="أهداف التخصص"
                          imgsrc={target}
                          data={applicationDocument && applicationDocument.application.program.requirementsForEnrolment}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col  position-relative px-0">
                    <div className="eduCard__wrapper--item">
                      <div className="">
                        <ListBlock
                          padRight="pl-0"
                          title="شروط القبول في التخصص"
                          imgsrc={checklist}
                          data={applicationDocument && applicationDocument.application.program.programOutcomes}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row   eduCard__items   justify-content-center">
                  <div className="col text-center pl-0  align-items-center d-flex flex-column  justify-content-center mb-3 mb-md-0">
                    <h6 className="eduCard__title">الدرجة العلمية</h6>
                    <label>{applicationDocument && applicationDocument.application.speciality.educationalDegreeName}</label>
                  </div>
                  <div className="col text-center position-relative align-items-center d-flex flex-column  justify-content-center mb-3 mb-md-0">
                    <h6 className="eduCard__title">نوع التخصص</h6>
                    <label className="">{applicationDocument && applicationDocument.application.speciality.specialityTypeName}</label>
                  </div>
                  <div className="col text-center position-relative  align-items-center d-flex flex-column justify-content-center  mb-3 mb-md-0">
                    <h6 className="eduCard__title">المؤسسة التعليمية</h6>
                    <label>{educationInstituteName}</label>
                  </div>
                  <div className="col text-center position-relative  align-items-center d-flex flex-column justify-content-center mb-3 mb-md-0 ">
                    <h6 className="eduCard__title">المدينة</h6>
                    <label>{applicationDocument && applicationDocument.locationName}</label>
                  </div>
                  <div className="col text-center position-relative  align-items-center d-flex flex-column justify-content-center mb-3 mb-md-0 ">
                    <h6 className="eduCard__title">الكلية</h6>
                    <label>{applicationDocument && applicationDocument.collegeName}</label>
                  </div>
                </div>
              </div>
              <LoadingData flag={this.state.loadingDataFlag} />
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <TabDetails data={applicationDocument && applicationDocument.application} columnSort={this.state.columnSort} onSort={this.handleSort} />
          <AccordionDetails data={applicationDocument && applicationDocument.application} />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  specialityTitle: state.specialityTitle,
});
const mapDispatchToProps = dispatch => ({
  GetTitle: (title, name) =>
    dispatch({
      type: actionTypes.GOTO_DETAILS_TITLE,
      payload: {
        specialityTitle: title,
        institutionTitle: name,
      },
    }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Specific);
