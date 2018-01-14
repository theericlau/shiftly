import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEmployeeAvailability } from '../actions/index';
import _ from 'underscore';
import PropTypes from 'prop-types';
import AddEmployee from './AddEmployee.jsx';

class EmployeeAvailability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newAvailabilities: {}
    }
  }

  componentWillMount() {
    if (this.props.employee.availabilities) {
      this.setState({
        newAvailabilities: this.props.employee.availabilities
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.employee != this.props.employee && nextProps.employee.availabilities) {
      const newAvailabilities = _.clone(nextProps.employee.availabilities);
      this.setState({
        newAvailabilities: newAvailabilities,
      })
    }
  }

  alterDay = (dayPart) => {
    let availabilities = this.state.newAvailabilities;
    availabilities[dayPart] = !availabilities[dayPart];
    this.setState({
      newAvailabilities: availabilities
    })
  }

  mapDayPartsAsCheckboxes = (dayPart, idx) => {
    return (
      <td
        key={`${this.props.employee.name}${dayPart}`}
        onClick={(e) => this.alterDay(dayPart)}>
        <i name={dayPart} className="material-icons clickable day-checkbox">
          {this.state.newAvailabilities[dayPart] ? 'lens' : 'radio_button_unchecked'}
        </i>
      </td>
    );
  }

  render() {
    let renderBody;
    if (this.props.employee === 'create') {
      renderBody = (
        <AddEmployee />
      );
    } else {

      let morningParts = Object.keys(this.state.newAvailabilities).filter((dayPart) => {
        return dayPart % 2 !== 0;
      }).map(this.mapDayPartsAsCheckboxes);

      let afternoonParts = Object.keys(this.state.newAvailabilities).filter((dayPart) => {
        return dayPart % 2 === 0;
      }).map(this.mapDayPartsAsCheckboxes);

      renderBody = (
        <div>
          <h4>{this.props.employee.name}</h4>
          <p>Update {this.props.employee.name}'s weekly availability.</p>
          <table className="select-days-table">
            <tbody>
              <tr>
                <th scope="row"></th>
                <th scope="col">Mon</th>
                <th scope="col">Tue</th>
                <th scope="col">Wed</th>
                <th scope="col">Thu</th>
                <th scope="col">Fri</th>
                <th scope="col">Sat</th>
                <th scope="col">Sun</th>
              </tr>
              <tr>
                <th scope="row">AM</th>
                {morningParts}
              </tr>
              <tr>
                <th scope="row">PM</th>
                {afternoonParts}
              </tr>
            </tbody>
          </table>
          <div className="employee-editor-save-btn">
            <button
              className="btn-main"
              onClick={() => this.props.updateEmployeeAvailability(this.props.employee, this.state.newAvailabilities)}>
              Save
            </button>
          </div>
        </div>
      );

    }
    return (
      <div className="employee-availability clear-fix">
        {renderBody}
      </div>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateEmployeeAvailability }, dispatch);
}

export default connect(null, mapDispatchToProps)(EmployeeAvailability);
