import React from 'react';
import EmployeeRosterItem from '../containers/EmployeeRosterItem.jsx';
import _ from 'underscore';
import PropTypes from 'prop-types';

const EmployeeRoster = (props) => {
  return (
    <div>
      <div className="list-item clear-fix clickable" onClick={() => props.selectEmployee('create')}>
        <div className="ratio-col-4-3" >
          <div>
            <i className="material-icons employee-edit-profile">account_circle</i>
            <span>Add new employee</span>
          </div>
        </div>
        <div className="ratio-col-4" >
          <div className="employee-edit">
            <i className="material-icons employee-edit-button">add_circle</i>
          </div>
        </div>
      </div>
      {props.employees && _.map(props.employees, (employee) => {
        return <EmployeeRosterItem key={employee.id} employee={employee} selectEmployee={props.selectEmployee} />;
      })}
    </div>
  );
};


export default EmployeeRoster;