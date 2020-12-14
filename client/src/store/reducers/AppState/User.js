const defaultState = {
  pendingUsers: [],
  users: [],
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_PENDING_USER_SUCCESS": {
      return {
        ...state,
        pendingUsers: action.res.users,
      };
    }
    case "GET_USER_SUCCESS": {
      return {
        ...state,
        users: action.res.user,
      };
    }
    default:
      return state;
  }
};

export default user;
