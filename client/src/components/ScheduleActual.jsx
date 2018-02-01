import React from 'react';
import _ from 'underscore';
import EmployeeSchedule from './EmployeeSchedule.jsx';
import PropTypes from 'prop-types';

const ScheduleActual = (props) => {

  let calendarBody;

  let morningEvenings = [<div key={'block'} className="ratio-col-8 schedule-block schedule-hours"></div>];

  for (let i = 0; i < 14; i++) {
    morningEvenings.push(<div key={`${i}shift`} className="ratio-col-16 schedule-block  schedule-hours">{i % 2 === 0 ? 'AM' : 'PM'}</div>)
  }

  if (props.selectedWeekActualSchedule.length > 0) {
    calendarBody = props.selectedWeekActualSchedule.map((sched, idx) => {
      return <EmployeeSchedule key={`${sched.name}${idx}`} schedule={sched} />;
    });
  } else if (props.weekHasAtLeastOneNeededEmployee) {
    calendarBody = <div className='schedule-prompt'>Generate a schedule for this week when you have finalized your shifts.</div>;
  } else {
    calendarBody = <div className='schedule-prompt'>You have not saved any shifts for this week.</div>;
  }

  return (
    <div className="container clear-fix schedule-actual">
      <div className="schedule-date-header">
        <div className="ratio-col-8 schedule-block " />
        <div className="ratio-col-8 schedule-block ">Mon</div>
        <div className="ratio-col-8 schedule-block ">Tue</div>
        <div className="ratio-col-8 schedule-block ">Wed</div>
        <div className="ratio-col-8 schedule-block ">Thur</div>
        <div className="ratio-col-8 schedule-block ">Fri</div>
        <div className="ratio-col-8 schedule-block ">Sat</div>
        <div className="ratio-col-8 schedule-block ">Sun</div>
        {morningEvenings}
      </div>
      {calendarBody}
    </div>
  );
}

ScheduleActual.propTypes = {
  weekHasAtLeastOneNeededEmployee: PropTypes.bool,
  selectedWeekActualSchedule: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default ScheduleActual;