import React, { Component } from 'react';
import Wrapper from '../hoc/Wrapper';
import InnrePage from './../containers/InnrePage';
import Specific from '../containers/specialties/Specific';
import InstituteContainerList from '../containers/institurions/InstituteContainerList';
import InstitutionDetailsContainer from '../containers/institurions/InstitutionDetailsContainer';

class Institute extends Component {

    render() {
        const { params } = this.props.match;
        return (
            <Wrapper title="المؤسسات التعليمية" bodyClass="inner">

                <InnrePage>
                    <div className="container py-5">
                        {(params.target === "specialities") && <Specific match={params} />}
                        {(!params.code && params.id) && <InstitutionDetailsContainer match={params}/>}
                        {!params.target && !params.id && <InstituteContainerList />}
                    </div>
                </InnrePage>
            </Wrapper>
        );
    }
}

export default Institute;