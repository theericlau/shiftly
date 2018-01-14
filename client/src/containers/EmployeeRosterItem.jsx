import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEmployee } from '../actions/index';
import PropTypes from 'prop-types';

const EmployeeRosterItem = (props) => {
  return (
    <div className="list-item clear-fix clickable" onClick={() => props.selectEmployee(props.employee)}>
      <div className="ratio-col-4-3" >
        <div>
          <i className="material-icons employee-edit-profile">account_circle</i>
          <span>{props.employee.name}</span>
        </div>
      </div>
      <div className="ratio-col-4" >
        <div className="employee-edit">
          <i className="material-icons employee-edit-button">mode_edit</i>
        </div>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEmployee }, dispatch);
}

export default connect(null, mapDispatchToProps)(EmployeeRosterItem);
