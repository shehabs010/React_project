import React, { Component } from 'react';

import InstitutionsList from './InstitutionsList';

class InstituteContainerList extends Component {
  render() {
    return (
      <>
        <div className="row mx-0">
          <h3 className="pageTitle col-12">المؤسسات التعليمية</h3>
        </div>

        <div className="col-12 my-5">
          <div className="eduCard eduCard--result  col-12 my-3">
            <InstitutionsList />
          </div>
        </div>
      </>
    );
  }
}

export default InstituteContainerList;
