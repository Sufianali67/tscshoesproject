import axios from "axios";
import { baseURL } from "../config";

class ProductService {
  constructor(api) {
    this.api = api;
  }

  async getAllProducts() {
    const headers = {
      Authorization: this.api.token,
    };
    const { data } = await axios.get(`${baseURL}/getAllProducts`, {
      headers,
    });
    return data;
  }

  async getOrders() {
    const headers = {
      Authorization: this.api.token,
    };
    const { data } = await axios.get(`${baseURL}/api/getOrders`, {
      headers,
    });
    return data;
  }

  async onAddProduct(obj) {
    const headers = {
      Authorization: this.api.token,
    };
    var body = new FormData();
    body.append("name", obj.name || "");
    body.append("file", obj.file || "");
    body.append("quantity", obj.quantity || "");
    body.append("price", obj.price || "");

    const { data } = await axios.post(`${baseURL}/api/addProduct`, body, {
      headers,
    });
    return data;
  }

  async onUpdateProduct(obj) {
    const headers = {
      Authorization: this.api.token,
    };
    var body = new FormData();
    body.append("id", obj.id || "");
    body.append("name", obj.name || "");
    body.append("file", obj.file || "");
    body.append("quantity", obj.quantity || "");
    body.append("price", obj.price || "");

    const { data } = await axios.post(`${baseURL}/api/updateProduct`, body, {
      headers,
    });
    return data;
  }

  async deleteProduct(id) {
    const headers = {
      Authorization: this.api.token,
    };

    const { data } = await axios.post(
      `${baseURL}/api/deleteProduct`,
      { id },
      {
        headers,
      }
    );
    return data;
  }

  async onCheckout(body) {
    const { data } = await axios.post(`${baseURL}/checkout`, body);
    return data;
  }
}

export default ProductService;
