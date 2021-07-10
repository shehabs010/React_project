import React, { Component } from 'react';
import Wrapper from '../hoc/Wrapper';
import InnrePage from './../containers/InnrePage';
import { NavLink } from 'react-router-dom';

class Statstics extends Component {
    render() {
        return (
            <Wrapper title="الاحصائيات" bodyClass="inner">
                <InnrePage>

                    <div className="container py-5">

                        <div className="row mx-0">
                            <h3 className="pageTitle col-12">الاحصائيات</h3>
                        </div>

                        <NavLink to="/" className="btn btn-primary my-5">الصفحة الرئيسية </NavLink>
                    </div>
                </InnrePage>
            </Wrapper>
        );
    }
}

export default Statstics;