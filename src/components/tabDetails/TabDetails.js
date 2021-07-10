import './TabDetails.css';

import PropTypes from 'prop-types';
import React from 'react';

import Job from './Job';
import Programs from './Programs';
import Skills from './Skills';
import StudyPlan from './StudyPlan';
import Training from './Training';

function TabDetails({ data, columnSort, onSort }) {
  const siblings = n => [...n.parentElement.children].filter(c => c !== n);
  const toggleTab = event => {
    event.preventDefault();
    const { target } = event;
    if (target.getAttribute('href')) {
      const targetId = target.getAttribute('href').replace('#', '');
      siblings(target.parentNode).forEach(e => e.children[0].classList.remove('active'));
      target.classList.add('active');

      const tabContent = document.getElementById(targetId);
      siblings(tabContent).forEach(e => {
        e.classList.remove('active');
        e.classList.remove('show');
      });
      tabContent.classList.add('active');
      tabContent.classList.add('show');
    }
  };
  return (
    <div className="tabDetails d-none d-lg-block">
      <ul className="nav nav-tabs pl-0" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            id="skills-tab"
            data-toggle="tab"
            href="#skills"
            role="tab"
            onClick={toggleTab}
            aria-controls="skills"
            aria-selected="false">
            <i className="icon" />
            المهارات المكتسبة
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="approve-tab"
            data-toggle="tab"
            href="#approve"
            role="tab"
            onClick={toggleTab}
            aria-controls="approve"
            aria-selected="true">
            <i className="icon" />
            بيانات اعتماد البرنامج
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" id="job-tab" data-toggle="tab" href="#job" role="tab" aria-controls="job" onClick={toggleTab} aria-selected="true">
            <i className="icon" />
            بيانات العمل
          </a>
        </li>

        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="training-tab"
            data-toggle="tab"
            href="#training"
            role="tab"
            onClick={toggleTab}
            aria-controls="training"
            aria-selected="false">
            <i className="icon" />
            التدريب التعاوني
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="plan-tab"
            data-toggle="tab"
            href="#plan"
            role="tab"
            aria-controls="plan"
            onClick={toggleTab}
            aria-selected="false">
            <i className="icon" />
            الخطة الدراسية
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="skills" role="tabpanel" aria-labelledby="skills-tab">
          <div className="tab-pan-content">
            <Skills data={data && data.program.acquiredSkills} />
          </div>
        </div>

        <div className="tab-pane fade" id="approve" role="tabpanel" aria-labelledby="approve-tab">
          <div className="tab-pan-content">
            <Programs data={data && data.program} />
          </div>
        </div>

        <div className="tab-pane fade " id="job" role="tabpanel" aria-labelledby="job-tab">
          <div className="tab-pan-content">
            <Job data={data && data.workStatement} />
          </div>
        </div>
        <div className="tab-pane fade" id="training" role="tabpanel" aria-labelledby="training-tab">
          <div className="tab-pan-content">
            <Training data={data && data.cooperativeTraining} />
          </div>
        </div>
        <div className="tab-pane fade" id="plan" role="tabpanel" aria-labelledby="plan-tab">
          <StudyPlan data={data && data.studyPlan} attachments={data && data.attachments} columnSort={columnSort} onSort={onSort} />
        </div>
      </div>
    </div>
  );
}

TabDetails.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onSort: PropTypes.func,
  columnSort: PropTypes.string,
};

export default TabDetails;
