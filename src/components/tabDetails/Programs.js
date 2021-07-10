/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import React from 'react';

import DisplayDate from '../common/DisplayDate';
import ListBlock from '../common/ListBlock';

function Programs({ data }) {
  const internalAccreditation = [];
  const externalAccreditation = [];
  data && internalAccreditation.push(data.internalAccreditation);
  data && externalAccreditation.push(data.externalAccreditation);
  data && externalAccreditation.push(data.countryName);

  return (
    <div className="row mx-0">
      {/* country: 0
countryName: null
externalAccreditation: null
externalDate: "0001-01-01T00:00:00Z"
externalHijriDate: "0001-01-01T00:00:00Z"
internalAccreditation: "test"
internalDate: "2020-12-28T21:00:00Z"
internalHijriDate: "1442-12-30T21:00:00Z"
isAcademicallyAccredited: true
isInternallyAccredited: true */}

      {data && data.isInternallyAccredited ? (
        <div className="row col-12">
          <div className="col-12 col-md-6">
            <ListBlock title="البرنامج معتمد اعتماد داخلي" padRight="pl-0" data={internalAccreditation} />
          </div>

          <div className="col-12 col-md-6 row pt-md-4 px-0">
            <DisplayDate name="الهجري" date={data.internalHijriDate} type="hijri" />
            <DisplayDate name="الميلادي" date={data.internalDate} type="gregorian" />
          </div>
        </div>
      ) : (
        <div className="col-12  align-items-center row mx-0">
          <ListBlock padRight="pl-0" title="البرنامج معتمد اعتماد داخلي" text="لا يوجد اعتماد" />
        </div>
      )}
      {data && data.externalAccreditation ? (
        <div className="col-12 row">
          <div className="col-12 col-md-6">
            <ListBlock title="البرنامج معتمد اعتماد خارجي" padRight="pl-0" data={externalAccreditation} />
          </div>

          <div className="col-12 col-md-6 row pt-md-4  px-0">
            <DisplayDate name="الهجري" date={data.externalHijriDate} type="hijri" />
            <DisplayDate name="الميلادي" date={data.externalDate} type="gregorian" />
          </div>
        </div>
      ) : (
        <div className="col-12  align-items-center row mx-0">
          <ListBlock title="البرنامج معتمد اعتماد خارجي" padRight="pl-0" text="لا يوجد اعتماد" />
        </div>
      )}
    </div>
  );
}

Programs.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default Programs;
