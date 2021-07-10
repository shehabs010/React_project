
import React, { Component } from 'react';
import ErrorContainer from '../../containers/ErrorContainer';
import Wrapper from './../../hoc/Wrapper';


class Error extends Component {
    render() {
        return (
            <Wrapper title="خطأ في النظام" bodyClass="inner">
                <ErrorContainer type="error" />
            </Wrapper>
        );
    }
}

export default Error;