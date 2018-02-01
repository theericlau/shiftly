import React, { Component } from 'react';
import EmployeeAvailability from './EmployeeAvailability.jsx';
import EmployeeRoster from '../components/EmployeeRoster.jsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class EmployeeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEmployee: null,
    };
  }

  selectEmployee = (employee) => {
    this.setState({
      selectedEmployee: employee
    })
  }

  render() {
    return (
      <div className='ratio-col-1'>
        {this.state.selectedEmployee && <EmployeeAvailability employee={this.state.selectedEmployee} dayPartsMap={this.props.dayPartsMap} />}

        <EmployeeRoster
          employees={this.props.employees}
          selectEmployee={this.selectEmployee}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  let employees;
  const dayPartsMap = {};
  if (state.users && state.employeeAvailabilities) {
    employees = state.users.filter((user) => {
      return user.role === 'employee';
    }).reduce((acc, employee) => {
      acc[employee.id] = {
        id: employee.id,
        name: employee.name,
        availabilities: {},
      };
      return acc;
    }, {});

    state.employeeAvailabilities.forEach((availability) => {
      employees[availability.user_id].availabilities[availability.day_part_id] = availability.is_available;
    });
  }
  if (state.dayParts) {
    state.dayParts.forEach((dayPart) => {
      dayPartsMap[dayPart.id] = dayPart.name
    })
  }

  return {
    dayPartsMap,
    employees,
  };

};

EmployeeEditor.propTypes = {
  dayPartsMap: PropTypes.objectOf(PropTypes.string).isRequired,
  employees: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(EmployeeEditor);
