const defaultState = null;
const test = (state = defaultState, action) => {
  switch (action.type) {
    case "TEST-UI": {
      return action.payload;
    }
    default:
      return state;
  }
};

export default test;
