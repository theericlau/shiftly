import moment from 'moment';

let monday = moment(moment().day(1)).isAfter(moment()) ? moment().day(-6) : moment().day(1);
monday = monday.format('YYYY-MM-DD');

const selectedWeek = (state = monday, action) => {
  switch (action.type) {
    case 'SELECT_WEEK':
      return action.payload;
    case 'REMOVE_LOGGED_IN_DETAILS':
      return monday;
    default:
      return state;
  }
};

export default selectedWeek;
