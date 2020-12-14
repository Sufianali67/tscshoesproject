import axios from "axios";
import { baseURL } from "../config";

class UserService {
  constructor(api) {
    this.api = api;
  }

  async getUsers() {
    const headers = {
      Authorization: this.api.token,
    };

    const { data } = await axios.get(`${baseURL}/api/users`, { headers });
    return data;
  }
  async deleteUsers(userdata) {
    const headers = {
      Authorization: this.api.token,
    };
    const { data } = await axios.post(
      `${baseURL}/api/deleteUser`,
      { userId: userdata },
      { headers }
    );
    return data;
  }

  async getPendingUsers() {
    const headers = {
      Authorization: this.api.token,
    };
    const { data } = await axios.get(
      `${baseURL}/api/pendingUsers`,
      { headers }
    );
    return data;
  }
  async editPendingUsers(userdata, token) {
    const id = userdata.id;
    const name = userdata.name;
    const email = userdata.email;
    const headers = {
      Authorization: this.api.token,
    };

    const { data } = await axios.post(
      `${baseURL}/api/updateUserByAdmin`,
      { id, name, email },
      { headers }
    );
    return data;
  }

  async approvePendingUsers(userdata) {
    const id = userdata._id;
    const headers = {
      Authorization: this.api.token,
    };
    const { data } = await axios.post(
      `${baseURL}/api/approveAdmin`,
      { userId: id },
      { headers }
    );
    return data;
  }
  async rejectPendingUsers(userdata) {
    const id = userdata._id;
    const headers = {
      Authorization: this.api.token,
    };
    const { data } = await axios.post(
      `${baseURL}/api/rejectVerification`,
      { userId: id },
      { headers }
    );
    return data;
  }
}

export default UserService;
