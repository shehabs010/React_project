/* eslint-disable no-magic-numbers */
import PropTypes from 'prop-types';
import React from 'react';

import ListBlock from '../common/ListBlock';

function Training({ data }) {
  return (
    <div className="row mx-0">
      <div className="col-12 col-md-6">
        {data && data.isCooperativeTraining ? (
          <ListBlock padRight="pl-0" title="أسماء الجهات المتعاونة" data={data && data.cooperatingOrganizations} />
        ) : (
          <ListBlock padRight="pl-0" title="أسماء الجهات المتعاونة" text="لا يوجد تدريب تعاوني" />
        )}
      </div>
      <div className="col-12 col-md-6 row mx-0">
        <div className="col">
          {data && data.trainingHours >= 0 && <span className="circle">{data.trainingHours}</span>}
          <p className="text-center">عدد الساعات التدريبية ضمن الخطة الدراسية</p>
        </div>
        <div className="col">
          {' '}
          {data && data.actualHoursPerWeek >= 0 && <span className="circle">{data.actualHoursPerWeek}</span>}
          <p className="text-center">متوسط عدد الساعات التدريبية الفعلية في الأسبوع</p>
        </div>
        <div className="col">
          {' '}
          {data && data.noOfWeeks >= 0 && <span className="circle">{data.noOfWeeks}</span>} <p className="text-center">عدد أسابيع التدريب</p>
        </div>
      </div>
    </div>
  );
}

Training.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default Training;
