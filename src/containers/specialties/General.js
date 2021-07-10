import React, { Component } from 'react';
import { connect } from 'react-redux';
import document from '../../assets/img/spiciality/document/document.png';
import book from '../../assets/img/spiciality/book/book.png';
import educ from '../../assets/img/spiciality/educ/educ.png';
import { getCardDetails } from "../../services/specialityServices";
import * as actionTypes from '../../store/actions';
import InstitutionsList from "../institurions/InstitutionsList";
import logger from '../../services/logger'
import ListBlock from '../../components/common/ListBlock';

class General extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedFullCard: {
                specialities: [],
                courses: [],
            },
            cardCode: null,


        }
    }
    componentDidMount() {

        getCardDetails(this.props.id).then(response => {
            this.setState({
                loadedFullCard: response.data,
            })
            this.props.GetTitle(response.data.title)
        }, error => { logger.log(error); window.location = "/error" })

    }
    render() {


        const { loadedFullCard } = this.state;

        return (
            <>
                <div className="row mx-0 mb-5">
                    <h3 className="pageTitle col-12"> {loadedFullCard.title} </h3>

                </div>
                <div className="content">
                    <div className="row mx-0">
                        <div className="eduCard  col-12 mb-3 px-sm-3 px-0">

                            <div className="eduCard__card  bg-white">
                                <div className="eduCard__wrapper--item">
                                    <div className="">
                                        <div className="d-flex align-items-center mb-2">
                                            <img src={document} className="eduCard__icon" alt=""
                                                width="23" height="23" />

                                            <h6 className="eduCard__title mb-0">وصف التخصص</h6>


                                        </div>
                                        {loadedFullCard.description ?
                                            <p className="eduCard__desc">
                                                {loadedFullCard.description}
                                            </p>
                                            : ''}
                                    </div>
                                </div>

                                <div className="row mx-0 align-items-baseline eduCard__details justify-content-center mb-4">
                                    <div className="col pl-md-0 px-0">
                                        <div className="eduCard__wrapper--item">
                                            <div className="">
                                                <ListBlock title='التخصصات المندرجة تحت هذا التخصص' imgsrc={educ} data={loadedFullCard.specialities} />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col  position-relative px-0">
                                        <div className="eduCard__wrapper--item no-border">
                                            <div className="">
                                                <ListBlock title="أهم المقررات التي تندرج تحت هذا التخصص" imgsrc={book} data={loadedFullCard.courses} />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="col-12 my-5">
                            <h4 className="font-weight-bold subPageTitle"> المؤسسات التعليمية التي تدرس فيها تخصص {loadedFullCard.title} </h4>
                            <div className="eduCard eduCard--result  col-12 my-3">
                                <InstitutionsList specialityId={this.props.id} />
                                {/* <div className="eduCard__more col-12 text-center mt-5">
                                    <Link to='/institutions' className="btn btn-primary btn-primary--more">جميع المؤسسات <img src={leftArrow} alt="arrow-img" /></Link>
                                </div> */}
                            </div>
                        </div>


                    </div>



                </div>


            </>


        )
    }
}


const mapStateToProps = state => {
    return {
        specialityTitle: state.specialityTitle
    }
}
const mapDispatchToProps = dispatch => {
    return {
        GetTitle: (title) => dispatch({
            type: actionTypes.GOTO_DETAILS_TITLE, payload: {
                specialityTitle: title
            }
        })
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(General);
