const neededEmployees = (state = null, action) => {
  switch (action.type) {
    case 'GET_NEEDED_EMPLOYEES':
      return action.payload.data;
    case 'UPDATE_NEEDED_EMPLOYEES':
      return state.filter((availability) => {
        return availability.schedule_id !== action.payload.data[0].schedule_id;
      }).concat(action.payload.data);
    case 'CREATE_SCHEDULE_TEMPLATE':
      return state.concat(action.payload.data.template);
    case 'GET_ALL':
      return action.payload.data.neededEmployees || state;
    case 'REMOVE_LOGGED_IN_DETAILS':
      return null;
    default:
      return state;
  }
};

export default neededEmployees;
