import React from 'react';
import PropTypes from 'prop-types';

const EmployeeSchedule = (props) => {
  const shifts = [
    <div key="shiftblock" className="ratio-col-8 schedule-name">{props.schedule.name}
      <br />
      <span className="schedule-hours">{props.schedule.schedule.length * 6} hrs</span>
    </div>];
  for (let i = 1; i < 15; i++) {
    if (props.schedule.schedule.indexOf(i) !== -1) {
      shifts.push(<div
        key={`shift${props.schedule.name}${i}`}
        className="ratio-col-16 schedule-block schedule-shift-on"
      />);
    } else {
      shifts.push(<div
        key={`shift${props.schedule.name}${i}`}
        className="ratio-col-16 schedule-block schedule-shift-off" />);
    }
  }

  return (
    <div className="container schedule-row clear-fix">
      {shifts}
    </div>
  );
};

export default EmployeeSchedule;
