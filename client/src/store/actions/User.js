import { Api } from "../../services/api";
import { toast } from "react-toastify";

export const getPendingUsers = (token) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.user.getPendingUsers();
    dispatch({
      type: "GET_PENDING_USER_SUCCESS",
      res,
    });
    return res;
  } catch (error) {
    dispatch({
      type: "GET_PENDING_USER_ERROR",
      error,
    });
    toast.error(error.response.data.message);
  }
};

export const getUsers = (token) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.user.getUsers();
    dispatch({
      type: "GET_USER_SUCCESS",
      res,
    });
    return res;
  } catch (error) {
    dispatch({
      type: "GET_USER_ERROR",
      error,
    });
    toast.error(error.response.data.message);
  }
};

export const editUsers = (userdata, token) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.user.editPendingUsers(userdata);
    toast.success(res.message);
    return res;
  } catch (error) {
    return false;
  }
};

export const approveUsers = (userdata, token) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.user.approvePendingUsers(userdata);
    toast.success("User has been successfully approved.");
    return res;
  } catch (error) {
    return false;
  }
};
export const rejectUsers = (userdata, token) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.user.rejectPendingUsers(userdata);
    toast.success("User has been successfully rejected.");
    return res;
  } catch (error) {
    return false;
  }
};
export const deleteUsers = (userdata, token) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.user.deleteUsers(userdata);
    return res;
  } catch (error) {
    return false;
  }
};
