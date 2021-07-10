/* eslint-disable no-magic-numbers */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import arrowDown from '../../assets/img/svg/arrow-down-wh.svg';
import InstDetail from '../../components/InstitutionDetails/InstitutionDetails';
import {
  getInstitutesApplication,
  getInstitutesColleges,
  getInstitutesDegrees,
  getInstitutesDepartments,
  getInstitutesMajors,
  getInstitutesTopPart,
} from '../../services/InstituteServices';
import * as actionTypes from '../../store/actions';

class InstitutionDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InstitutionDetailsPart: {},
      CollegesId: 0,
      DepartmentId: 0,
      MajorsId: 0,
      DegreeId: 0,
      Colleges: [],
      Departments: [],
      Majors: [],
      Degrees: [],
      ArrayOfName: [],
      active: false,
    };
  }

  componentDidMount() {
    this.getInstitutesTopPart();
  }

  getInstitutesTopPart = () => {
    const { match, GetTitle } = this.props;
    getInstitutesTopPart(match.id).then(response => {
      this.setState({
        InstitutionDetailsPart: response.data,
      });
      GetTitle(response.data.instituteName);
    });
    this.getInstituteCollages(match);
  };

  getInstituteCollages = match => {
    // const match = this.props.match;
    getInstitutesColleges(match.id).then(response => {
      this.setState({
        Colleges: response.data,
        InstitutionId: match.id,
      });
    });
  };

  getDepartments = (CollegesId, CollegesName) => {
    const { InstitutionId, ArrayOfName } = this.state;
    let { active } = this.state;

    getInstitutesDepartments(InstitutionId, CollegesId).then(response => {
      ArrayOfName.push(CollegesName);
      active = true;
      this.setState({
        Degrees: [],
        Majors: [],
        Departments: response.data,
        CollegesId,
        active,
      });
    });
  };

  getMajors = (DepartmentsId, DepartmentsName) => {
    const { InstitutionId, ArrayOfName, CollegesId } = this.state;
    getInstitutesMajors(InstitutionId, CollegesId, DepartmentsId).then(response => {
      ArrayOfName.push(DepartmentsName);
      this.setState({
        Degrees: [],
        // Majors: [],
        Majors: response.data,
        DepartmentId: DepartmentsId,
      });
    });
  };

  getDegrees = (MajorId, MajorName) => {
    const { ArrayOfName } = this.state;
    getInstitutesDegrees().then(response => {
      ArrayOfName.push(MajorName);
      this.setState({
        DegreeId: 0,
        // Degrees:[],
        Degrees: response.data,
        MajorsId: MajorId,
      });
    });
  };

  getbuttonApplication = DegreeId => {
    this.getApplicationDetails(DegreeId);
  };

  getApplicationDetails = DegreeId => {
    const { InstitutionId, CollegesId, DepartmentId, MajorsId } = this.state;
    getInstitutesApplication(InstitutionId, CollegesId, DepartmentId, MajorsId, DegreeId).then(response => {
      this.setState({ InstitutesApplicationData: response.data });
      console.log(response.data);
    });
  };

  getColumn = (event, index) => {
    event.preventDefault();
    const { ArrayOfName } = this.state;
    if (index === ArrayOfName.indexOf(ArrayOfName[0])) {
      this.setState({
        ArrayOfName: [],
        Departments: [],
      });
    } else if (index === ArrayOfName.indexOf(ArrayOfName[1])) {
      const array = ArrayOfName.slice(index - 1, 1);
      this.setState({
        ArrayOfName: array,
        Majors: [],
        Degrees: [],
      });
      // this.getDepartments;
    } else if (index === ArrayOfName.indexOf(ArrayOfName[2])) {
      const array = ArrayOfName.slice(index - 2, 2);
      this.setState({
        ArrayOfName: array,
        Degrees: [],
      });
      // this.getDepartments;
    }
  };

  // eslint-disable-next-line complexity
  render() {
    const {
      Colleges,
      Departments,
      Majors,
      Degrees,
      DegreeId,
      CollegesId,
      DepartmentId,
      MajorsId,
      InstitutesApplicationData,
      ArrayOfName,
      InstitutionDetailsPart,
    } = this.state;
    const { institutionTitle } = this.props;

    const ArrayName = ArrayOfName.map((name, i) => (
      <a href="/" key={i} onClick={event => this.getColumn(event, i)}>
        <i className="fas fa-chevron-right" />
        {name}
      </a>
    ));

    return (
      <div className="Institution__Detail">
        <div className="row mx-0 mb-4 ">
          <h3 className="pageTitle col-12">{institutionTitle} </h3>{' '}
        </div>
        <div className="container">
          <div className="row mx-0">
            <div className="eduCard__items d-flex  justify-content-center col-md-7 col-12 ">
              <div className="col text-center pl-0  align-items-center d-flex flex-column justify-content-center">
                <h6 className="eduCard__title mb-2">النوع</h6>
                {InstitutionDetailsPart.educationAuthorityType !== null ? (
                  <label>{InstitutionDetailsPart.educationAuthorityType}</label>
                ) : (
                  <label htmlFor>لايوجد</label>
                )}
              </div>
              <div className="col text-center position-relative align-items-center d-flex flex-column  justify-content-center">
                <h6 className="eduCard__title mb-2">الجهة المشرفة عليه</h6>
                {InstitutionDetailsPart.supervisionAuthorityName !== null ? (
                  <label>{InstitutionDetailsPart.supervisionAuthorityName}</label>
                ) : (
                  <label htmlFor>لايوجد</label>
                )}
              </div>
              <div className="col text-center position-relative  align-items-center d-flex flex-column justify-content-center ">
                <h6 className="eduCard__title mb-2">التخصصات</h6>
                {InstitutionDetailsPart.specialitiesCount !== null ? <label>{InstitutionDetailsPart.specialitiesCount}</label> : <label>0</label>}
              </div>
            </div>
          </div>
          <div className="row mx-0">
            <h3 className=" col-12 mb-4"> {`التخصصات في ${InstitutionDetailsPart.instituteName}`} </h3>
            {ArrayName.length > 0 && <div className="column__breadcrumb">{ArrayName}</div>}
          </div>
          <div className="choose__column-wrapper col-12 d-flex pl-0">
            {Colleges && (
              <InstDetail
                className={Colleges ? 'active' : ''}
                data={Colleges}
                Title="اختر الكلية"
                onChildClick={this.getDepartments}
                index={CollegesId}
              />
            )}

            {Colleges.length > 0 && Departments.length > 0 && (
              <InstDetail
                className={Colleges && Departments ? 'active' : ''}
                data={Departments}
                Title="اختر القسم"
                onChildClick={this.getMajors}
                index={DepartmentId}
              />
            )}
            {Colleges.length > 0 && Departments.length > 0 && Majors.length > 0 && (
              <InstDetail
                className={Colleges && Departments && Majors ? 'active' : ''}
                data={Majors}
                Title="اختر التخصص"
                onChildClick={this.getDegrees}
                index={MajorsId}
              />
            )}
            {Colleges.length > 0 && Departments.length > 0 && Majors.length > 0 && Degrees.length > 0 && (
              <InstDetail
                className={Colleges && Departments && Majors && Degrees ? 'active' : ''}
                data={Degrees}
                Title=" اختر الدرجه العلميه"
                onChildClick={this.getbuttonApplication}
                index={DegreeId}
              />
            )}
            {InstitutesApplicationData > 0 && (
              <div className="choose__column choose__column--button active">
                <button type="button" className="btn btn-primary">
                  <img src={arrowDown} alt="" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

InstitutionDetailsContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object,
  GetTitle: PropTypes.func,
  institutionTitle: PropTypes.string,
};

const mapStateToProps = state => ({
  institutionTitle: state.institutionTitle,
});
const mapDispatchToProps = dispatch => ({
  GetTitle: title =>
    dispatch({
      type: actionTypes.GOTO_DETAILS_TITLE,
      payload: {
        institutionTitle: title,
      },
    }),
});
export default connect(mapStateToProps, mapDispatchToProps)(InstitutionDetailsContainer);
