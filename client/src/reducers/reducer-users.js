const users = (state = null, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.payload.data;
    case 'ADD_EMPLOYEE':
      if (!action.payload.data.flashMessage) {
        return state ? state.concat(action.payload.data.user) : action.payload.data.user;
      } else {
        return state;
      }
    case 'GET_ALL':
      return action.payload.data.users || state;
    case 'REMOVE_LOGGED_IN_DETAILS':
      return null;
    default:
      return state;
  }
};

export default users;
