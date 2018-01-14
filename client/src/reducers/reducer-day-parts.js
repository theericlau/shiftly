const dayParts = (state = null, action) => {
  switch (action.type) {
    case 'GET_DAY_PARTS':
      return action.payload.data;
    case 'GET_ALL':
      return action.payload.data.dayParts || state;
    default:
      return state;
  }
};

export default dayParts;
