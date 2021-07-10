import PropTypes from 'prop-types';
import React from 'react';

import ListBlock from '../common/ListBlock';

function Job({ data }) {
  return (
    <div className="row mx-0">
      <div className="col-12 col-md-6">
        <ListBlock title="مجالات العمل المتاحة" padRight="pl-0" data={data && data.availableFields} />
      </div>
      <div className="col-12 col-md-6">
        <ListBlock title="جهات العمل الموظفة" padRight="pl-0" data={data && data.employerAuthorities} />
      </div>
    </div>
  );
}

Job.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default Job;
