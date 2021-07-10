import React, { Component } from 'react';
import Wrapper from '../hoc/Wrapper';
import InnrePage from './../containers/InnrePage';
import SearchResultsList from './../containers/search/SearchResultsList';

class Search extends Component {
    render() {
        return (
            <Wrapper title="نتائج البحث" bodyClass="inner">
                <InnrePage location={this.props.location}>
                    <div className="container py-5">

                        <div className="row mx-0">
                            <h3 className="pageTitle col-12"> نتائج البحث</h3>
                        </div>

                        <SearchResultsList />
                    </div>
                </InnrePage>
            </Wrapper>
        );
    }
}

export default Search;