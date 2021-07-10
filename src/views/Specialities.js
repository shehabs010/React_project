import React, { Component } from 'react';
import Wrapper from "./../hoc/Wrapper";
import InnrePage from './../containers/InnrePage';
import General from './../containers/specialties/General';
import SpecialitiesList from './../containers/specialties/SpecialitiesList';

class Specialities extends Component {


    render() {
        const { params } = this.props.match;

        return (
            <Wrapper title="التخصصات" bodyClass="inner">

                <InnrePage>
                    <div className="container py-5">
                        {(params.target === "details") && <General id={params.id} />}
                        {(params.target === "fields" || !params.target) && <SpecialitiesList match={params} />}
                    </div>
                </InnrePage>
            </Wrapper>
        );
    }
}

export default Specialities;