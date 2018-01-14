const flashMessage = (state = null, action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.payload.data.flashMessage || null;
    case 'REMOVE_LOGGED_IN_DETAILS':
      return { message: 'You have logged out', type: 'green' };
    case 'ADD_EMPLOYEE':
      return action.payload.data.flashMessage || { message: 'Employee added', type: 'green' };
    case 'LEAVE_ADD_EMPLOYEE':
      return null;
    case 'CREATE_SCHEDULE_TEMPLATE':
      return { message: 'Schedule template created', type: 'green' };
    case 'UPDATE_NEEDED_EMPLOYEES':
      return { message: 'Schedule template updated', type: 'green' };
    case 'SELECT_WEEK':
      return state;
    default:
      return null;
  }
};

export default flashMessage;