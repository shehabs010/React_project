import React, { Component } from 'react';
import ErrorContainer from '../../containers/ErrorContainer';
import Wrapper from './../../hoc/Wrapper';

class NotFound extends Component {
    render() {
        return (
            <Wrapper title="خطأ 404" bodyClass="inner">
                <ErrorContainer type="404" />
            </Wrapper>
        );
    }
}

export default NotFound;