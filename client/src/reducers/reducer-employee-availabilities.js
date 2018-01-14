const employeeAvailabilities = (state = null, action) => {
  switch (action.type) {
    case 'GET_EMPLOYEE_AVAILABILITIES':
      return action.payload.data;
    case 'UPDATE_EMPLOYEE_AVAILABILITY':
      return state.filter((availability) => {
        return availability.user_id !== action.payload.data[0].user_id;
      }).concat(action.payload.data);
    case 'ADD_EMPLOYEE':
      if (!action.payload.data.flashMessage) {
        return state ? state.concat(action.payload.data.employeeAvailabilities) : action.payload.data.employeeAvailabilities;
      } else {
        return state;
      }
    case 'GET_ALL':
      return action.payload.data.employeeAvailabilities || state;
    case 'REMOVE_LOGGED_IN_DETAILS':
      return null;
    default:
      return state;
  }
};

export default employeeAvailabilities;
