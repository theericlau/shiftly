import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateSchedule } from '../actions/index';
import _ from 'underscore';
import moment from 'moment';
import PropTypes from 'prop-types';

class ScheduleGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mondayDate: null,
    }
  }

  renderButton() {
    if (this.props.weekHasActualSchedule) {
      return (
        <div className='schedule-generator-button'>
          <button className="btn-primary clickable" type="button" onClick={() => { this.props.generateSchedule(moment(this.props.selectedWeek)); }}>Regenerate</button>
        </div>
      );
    } else if (this.props.weekHasAtLeastOneNeededEmployee) {
      return (
        <div className='schedule-generator-button'>
          <button className="btn-primary" type="button" onClick={() => { this.props.generateSchedule(moment(this.props.selectedWeek)); }}>Generate</button>
        </div>
      );
    }
    return (
      <div className='schedule-generator-button'>
        <button className="btn-primary clickable" type="button">Please set shifts</button>
      </div>
    );
  }

  render() {
    return (
      <div className="schedule-generator clear-fix overlay">
        <div>
          <div>Week of <span className='schedule-generator-date'>{moment(this.props.selectedWeek).format("MMMM Do YYYY")}</span></div>
        </div>
        {this.renderButton()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ generateSchedule: generateSchedule }, dispatch)
}

ScheduleGenerator.propTypes = {
  generateSchedule: PropTypes.func.isRequired,

  weekHasActualSchedule: PropTypes.bool.isRequired,
  selectedWeek: PropTypes.string.isRequired,
  weekHasAtLeastOneNeededEmployee: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(ScheduleGenerator);