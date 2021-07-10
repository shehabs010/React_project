import React from 'react';

import ListBlock from '../common/ListBlock';

function Skills(props) {
  return (
    <div className="row mx-0">
      <div className="col-12">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <ListBlock title="المهارات التي يكتسبها الخريج" padRight="pl-0" {...props} />
      </div>
    </div>
  );
}

export default Skills;
