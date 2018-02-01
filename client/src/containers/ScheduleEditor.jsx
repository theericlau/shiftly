import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectWeek } from '../actions/index';
import moment from 'moment';
import PropTypes from 'prop-types';
import ScheduleTemplate from './ScheduleTemplate.jsx';

class ScheduleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSchedule: null,
      view: 'edit'
    }
  }

  componentDidMount() {
    let scheduleFound = false;
    for (let item in this.props.scheduleNeeds) {
      if (this.props.scheduleNeeds[item].monDate.substr(0, 10) === this.props.selectedWeek) {
        this.selectSchedule(JSON.stringify([item, null]));
        scheduleFound = true;
      }
    }
    if (!scheduleFound) {
      this.selectSchedule(JSON.stringify([null, this.props.selectedWeek]));
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.scheduleNeeds != this.props.scheduleNeeds) {
      for (let i in nextProps.scheduleNeeds) {
        if (!this.props.scheduleNeeds[i]) {
          this.setState({
            selectedSchedule: nextProps.scheduleNeeds[i],
          })
        }
      }
    }
  }

  componentDidUpdate() {
    if (this.state.selectedSchedule.monDate) {
      this.props.selectWeek(this.state.selectedSchedule.monDate.substr(0, 10));
    }
  }

  selectSchedule = (val) => {
    const id = JSON.parse(val)[0];
    const monDate = JSON.parse(val)[1];
    if (id) {
      this.setState({
        selectedSchedule: this.props.scheduleNeeds[id]
      })
    } else {
      this.setState({
        selectedSchedule: { id: null, monDate: monDate, neededEmployees: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0 } }
      })
    }
  }

  getNextMondayDates() {
    let monday = [];
    for (let i = 0; i < 6; i++) {
      let mondayDates = moment().day(1 + i * 7).format("YYYY-MM-DD");
      if (!this.dateExists(mondayDates)) {
        monday.push(mondayDates.substr(0, 10));
      }
    }
    return monday;
  }

  dateExists(date) {
    let dateExists = false;
    let date1 = date.substr(0, 10).split('-');
    Object.keys(this.props.scheduleNeeds).forEach(id => {
      let date2 = this.props.scheduleNeeds[id].monDate.substr(0, 10).split('-');
      if (date2[0] === date1[0] && parseInt(date2[1]) === parseInt(date1[1]) && parseInt(date2[2]) === parseInt(date1[2])) {
        dateExists = true;
      }
    });
    return dateExists;
  }

  renderEditCreate() {
    if (this.state.selectedSchedule.id === null) {
      return (
        <div>
          <h4>Create schedule</h4>
          <p>How many employees do you need for each shift?</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='ratio-col-1'>
        <div className="employee-availability clear-fix">
          <h4>Edit shifts for:</h4>
          {this.props.scheduleNeeds &&
            <select className='date-dropdown' onChange={(e) => this.selectSchedule(e.target.value)}>
              {Object.keys(this.props.scheduleNeeds).map((id, idx) => {
                const monDate = this.props.scheduleNeeds[id].monDate.substr(0, 10);
                const optionVal = JSON.stringify([id, monDate]);
                return <option key={optionVal} value={optionVal} selected={optionVal.includes(this.props.selectedWeek)}>{monDate}</option>
              })}
              {this.getNextMondayDates().map(monDate => {
                const optionVal = JSON.stringify([null, monDate]);
                return <option key={optionVal} value={optionVal} selected={optionVal.includes(this.props.selectedWeek)}>{monDate}</option>
              })}
            </select>}
          <p className='shift-prompt'>How many employees do you need for each shift?</p>
          <ScheduleTemplate schedule={this.state.selectedSchedule} dayPartsMap={this.props.dayPartsMap} scheduleNeeds={this.props.scheduleNeeds} />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  let scheduleNeeds;
  const dayPartsMap = {};
  if (state.neededEmployees && state.scheduleDates) {
    scheduleNeeds = state.scheduleDates.reduce((acc, scheduleDate) => {
      acc[scheduleDate.id] = {
        id: scheduleDate.id,
        monDate: scheduleDate.monday_dates,
        neededEmployees: {},
      };
      return acc;
    }, {});

    state.neededEmployees.forEach((requirement) => {
      scheduleNeeds[requirement.schedule_id].neededEmployees[requirement.day_part_id] = requirement.employees_needed;
    });
  }

  if (state.dayParts) {
    state.dayParts.forEach((dayPart) => {
      dayPartsMap[dayPart.id] = dayPart.name;
    });
  }

  return {
    dayPartsMap,
    scheduleNeeds,
    selectedWeek: state.selectedWeek
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectWeek }, dispatch);
}

ScheduleEditor.propTypes = {
  selectWeek: PropTypes.func.isRequired, //from actions
  dayPartsMap: PropTypes.object.isRequired,
  scheduleNeeds: PropTypes.object.isRequired,
  selectedWeek: PropTypes.string.isRequired, //state
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleEditor);
