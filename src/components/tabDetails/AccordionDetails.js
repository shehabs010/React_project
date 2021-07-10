import './AccordionDetails.css';

import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Job from './Job';
import Programs from './Programs';
import Skills from './Skills';
import StudyPlan from './StudyPlan';
import Training from './Training';

class AccordionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSkillsCollapsed: true,
      isApproveCollapsed: true,
      isJobCollapsed: true,
      isTrainingCollapsed: true,
      isPlanCollapsed: true,
    };
  }

  handleCollapse = event => {
    const { isSkillsCollapsed, isApproveCollapsed, isJobCollapsed, isTrainingCollapsed, isPlanCollapsed } = this.state;
    this.setState({
      isSkillsCollapsed: true,
      isApproveCollapsed: true,
      isJobCollapsed: true,
      isTrainingCollapsed: true,
      isPlanCollapsed: true,
    });
    if (event.target.id === 'skills') {
      this.setState({ isSkillsCollapsed: !isSkillsCollapsed });
    } else if (event.target.id === 'approve') {
      this.setState({ isApproveCollapsed: !isApproveCollapsed });
    } else if (event.target.id === 'job') {
      this.setState({ isJobCollapsed: !isJobCollapsed });
    } else if (event.target.id === 'training') {
      this.setState({ isTrainingCollapsed: !isTrainingCollapsed });
    } else {
      this.setState({ isPlanCollapsed: !isPlanCollapsed });
    }
  };

  render() {
    const { isSkillsCollapsed, isApproveCollapsed, isJobCollapsed, isTrainingCollapsed, isPlanCollapsed } = this.state;
    const { data } = this.props;
    return (
      <div className="accordion d-lg-none d-block" id="accordionExample">
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button
                className="btn collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#skills"
                id="skills"
                aria-expanded={!isSkillsCollapsed}
                onClick={this.handleCollapse}
                aria-controls="skills">
                <i className="icon" />
                المهارات المكتسبة
              </button>
            </h2>
          </div>
          <div id="skills" className={`${isSkillsCollapsed ? 'collapse ' : 'collapse show'}`} data-parent="#accordionExample">
            <div className="card-body">
              <Skills data={data && data.program.acquiredSkills} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button
                className="btn collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#approve"
                id="approve"
                aria-expanded={!isApproveCollapsed}
                onClick={this.handleCollapse}
                aria-controls="approve">
                <i className="icon" />
                بيانات اعتماد البرنامج
              </button>
            </h2>
          </div>
          <div id="approve" className={`${isApproveCollapsed ? 'collapse ' : 'collapse show'}`} data-parent="#accordionExample">
            <div className="card-body">
              <Programs data={data && data.program} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button
                className="btn collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#job"
                id="job"
                aria-expanded={!isJobCollapsed}
                onClick={this.handleCollapse}
                aria-controls="job">
                <i className="icon" />
                بيانات العمل
              </button>
            </h2>
          </div>
          <div id="job" className={`${isJobCollapsed ? 'collapse ' : 'collapse show'}`} data-parent="#accordionExample">
            <div className="card-body">
              <Job data={data && data.workStatement} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button
                className="btn collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#training"
                id="training"
                aria-expanded={!isTrainingCollapsed}
                onClick={this.handleCollapse}
                aria-controls="training">
                <i className="icon" />
                التدريب التعاوني
              </button>
            </h2>
          </div>
          <div id="training" className={`${isTrainingCollapsed ? 'collapse ' : 'collapse show'}`} data-parent="#accordionExample">
            <div className="card-body">
              <Training data={data && data.cooperativeTraining} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button
                className="btn collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#plan"
                id="plan"
                aria-expanded={!isPlanCollapsed}
                onClick={this.handleCollapse}
                aria-controls="plan">
                <i className="icon" />
                الخطة الدراسية
              </button>
            </h2>
          </div>
          <div id="plan" className={`${isPlanCollapsed ? 'collapse ' : 'collapse show'}`} data-parent="#accordionExample">
            <div className="card-body">
              <StudyPlan data={data && data.studyPlan} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AccordionDetails.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default AccordionDetails;
