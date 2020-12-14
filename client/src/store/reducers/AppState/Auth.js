const defaultState = {
  token: localStorage.getItem("token"),
  userData: JSON.parse(localStorage.getItem("userData")),
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case "ON_REGISTER_SUCCESS": {
      return state;
    }
    case "UPDATE_USER_DATA": {
      localStorage.setItem("userData", JSON.stringify(action.res.user));
      return {
        ...state,
        userData: action.res.user,
      };
    }
    case 'SET_TOKEN':{
      localStorage.setItem("token", action.res.token);
      return {
        ...state,
        token: action.res.token,
      };
    }
    default:
      return state;
  }
};

export default auth;
