import axios from "axios";
import { baseURL } from "../config";

class AuthService {
  constructor(api) {
    this.api = api;
  }

  async onRegister(body) {
    const { data } = await axios.post(`${baseURL}/register`, body);
    return data;
  }

  async onLogin(body) {
    const { data } = await axios.post(`${baseURL}/authenticate`, body);
    return data;
  }

  async onVerifyCode(body) {
    const { data } = await axios.post(`${baseURL}/verifyEmail`, body);
    return data;
  }

  async onResendCode(body) {
    const { data } = await axios.post(`${baseURL}/resendOTP`, body);
    return data;
  }

  async onForgotPassword(body) {
    const { data } = await axios.post(`${baseURL}/forgotPassword`, body);
    return data;
  }

  async onUpdatePassword(body) {
    const headers = {
      Authorization: this.api.token,
    };
    const { data } = await axios.post(`${baseURL}/api/updatePassword`, body, { headers });
    return data;
  }
}

export default AuthService;
