import PropTypes from 'prop-types';
import React from 'react';

import Table from '../common/Table';

function StudyPlan({ data, attachments, columnSort, onSort }) {
  const columns = [
    { label: 'رمز المقرر', path: 'courseCode', isSort: true },
    { label: 'اسم المقرر', path: 'courseName', isSort: true },
    {
      label: 'إجباري',
      path: 'isRequired',
      content: item => (item.isRequired ? 'نعم' : 'لا'),
      isSort: true,
    },
    { label: 'نوع المتطلب', path: 'typeOfRequirementName', isSort: true },
    { label: 'اين يدرس', path: 'courseLocationName', isSort: true },
    { label: 'اجمالي عدد الوحدات', path: 'noOfUnits', isSort: true },
    {
      label: 'عددالساعات الاسبوعية',
      path: 'weeklyhour',
      child: [
        { label: 'نظري', path: 'theoreticalHours', isSort: false },
        { label: 'ميداني', path: 'onSiteHours', isSort: false },
        { label: 'عملي', path: 'practicalHours', isSort: false },
      ],
    },
    { label: 'المستوى الأكاديمي', path: 'studyLevelName', isSort: true },
    // {
    //     label: "خطة المقرر",
    //     key: "courseAttache",
    //     content: item => (
    //         <a href={`/${item.attachmentRefId}`} className="link-download" title="تحميل"><i className="icon-download"></i></a>
    //     ),
    //     isSort: false
    // },
  ];

  return (
    <h5>
      <div className="attachments row mx-0 mb-5">
        <h5 className="attachments__title col-12">:المرفقات</h5>
        <ul className="attachments__list col-12 col-md-4 m-0">
          {attachments &&
            attachments.map((attch, i) => (
              <li key={i} className="attachments__item">
                <span>الخطة الدراسية</span>{' '}
                <a href="/" className="link-download" title="تحميل">
                  <i className="icon-download" />
                </a>
              </li>
            ))}

          <li className="attachments__item">
            <span>خطة تطوير القسم</span>{' '}
            <a href="/" className="link-download" title="تحميل">
              <i className="icon-download" />
            </a>
          </li>
        </ul>
      </div>

      <div className="tableWrapper no-more-tables">
        <Table className="table" columns={columns} data={data && data.courses} onSort={onSort} columnSort={columnSort} />
      </div>
    </h5>
  );
}

StudyPlan.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  attachments: PropTypes.string,
  onSort: PropTypes.func,
  columnSort: PropTypes.string,
};

export default StudyPlan;
