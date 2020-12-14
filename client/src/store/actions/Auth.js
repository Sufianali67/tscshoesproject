import { Api } from "../../services/api";
import { toast } from "react-toastify";

export const onRegister = (body) => async (dispatch) => {
  const api = new Api();
  try {
    let res = await api.auth.onRegister(body);
    dispatch({
      type: "ON_REGISTER_SUCCESS",
      res,
    });
    toast.success(res.message);
    return res;
  } catch (error) {
    dispatch({
      type: "ON_REGISTER_ERROR",
      error,
    });
    toast.error(error.response.data.message);
  }
};

export const onLogin = (body) => async (dispatch) => {
  const api = new Api();
  try {
    let res = await api.auth.onLogin(body);
    dispatch({
      type: "UPDATE_USER_DATA",
      res,
    });
    if (res.token) {
      dispatch({
        type: "SET_TOKEN",
        res,
      });
    }
    toast.success(res.message);
    return res;
  } catch (error) {
    dispatch({
      type: "ON_LOGIN_ERROR",
      error,
    });
    toast.error(error.response.data.message);
  }
};

export const onVerifyCode = (body) => async (dispatch) => {
  const api = new Api();
  try {
    let res = await api.auth.onVerifyCode(body);
    dispatch({
      type: "UPDATE_USER_DATA",
      res,
    });
    if (res.token) {
      dispatch({
        type: "SET_TOKEN",
        res,
      });
    }
    toast.success(res.message);
    return res;
  } catch (error) {
    dispatch({
      type: "ON_CODE_VERIFICATION_ERROR",
      error,
    });
    toast.error(error.response.data.message);
  }
};

export const onResendCode = (body) => async (dispatch) => {
  const api = new Api();
  try {
    let res = await api.auth.onResendCode(body);
    dispatch({
      type: "ON_RESEND_SUCCESS",
      res,
    });
    toast.success(res.message);
    return res;
  } catch (error) {
    dispatch({
      type: "ON_RESEND_ERROR",
      error,
    });
    toast.error(error.response.data.message);
  }
};

export const onForgotPassword = (body) => async (dispatch) => {
  const api = new Api();
  try {
    let res = await api.auth.onForgotPassword(body);
    dispatch({
      type: "ON_FORGOT_PASSWORD_SUCCESS",
      res,
    });
    toast.success(res.message);
    return res;
  } catch (error) {
    dispatch({
      type: "ON_FORGOT_PASSWORD_ERROR",
      error,
    });
    toast.error(error.response.data.message);
  }
};

export const onUpdatePassword = (token, body) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.auth.onUpdatePassword(body);
    dispatch({
      type: "ON_FORGOT_PASSWORD_SUCCESS",
      res,
    });
    toast.success(res.message);
    return res;
  } catch (error) {
    dispatch({
      type: "ON_FORGOT_PASSWORD_ERROR",
      error,
    });
    toast.error(error.response.data.message);
  }
};

export const onChangePassword = (token, body) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.auth.onChangePassword(body);
    dispatch({
      type: "ON_CHANGE_PASSWORD_SUCCESS",
      res,
    });
    toast.success(res.message);
    return res;
  } catch (error) {
    dispatch({
      type: "ON_CHANGE_PASSWORD_ERROR",
      error,
    });
    toast.error(error.response.data.message);
  }
};

export const onUpdateProfile = (token, body) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.auth.onUpdateProfile(body);
    dispatch({
      type: "UPDATE_USER_DATA",
      res,
    });
    toast.success(res.message);
    return res;
  } catch (error) {
    dispatch({
      type: "ON_UPDATE_ERROR",
      error,
    });
    toast.error(error.response.data.message);
  }
};
