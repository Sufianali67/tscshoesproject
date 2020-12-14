import { Api } from "../../services/api";
import { toast } from "react-toastify";

export const getAllProducts = (token) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.product.getAllProducts();
    dispatch({
      type: "GET_PRODUCTS_SUCCESS",
      res,
    });
    return res;
  } catch (error) {
    dispatch({
      type: "GET_PRODUCTS_ERROR",
      error,
    });
    if ((error.response && error.response.data.message) || false) {
      toast.error(error.response.data.message);
    }
  }
};

export const getOrders = (token) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.product.getOrders();
    dispatch({
      type: "GET_ALL_ORDERS_SUCCESS",
      res,
    });
    return res;
  } catch (error) {
    dispatch({
      type: "GET_ALL_ORDERS_ERROR",
      error,
    });
    if ((error.response && error.response.data.message) || false) {
      toast.error(error.response.data.message);
    }
  }
};

export const onAddProduct = (token, body) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.product.onAddProduct(body);
    dispatch({
      type: "ADD_PRODUCT_SUCCESS",
      res,
    });
    toast.success(res.message);
    return true;
  } catch (error) {
    dispatch({
      type: "ADD_PRODUCT_ERROR",
      error,
    });
    toast.error(error.response.data.message);
    return false;
  }
};

export const onUpdateProduct = (token, body) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.product.onUpdateProduct(body);
    dispatch({
      type: "UPDATE_PRODUCT_SUCCESS",
      res,
    });
    toast.success(res.message);
    return true;
  } catch (error) {
    dispatch({
      type: "UPDATE_PRODUCT_ERROR",
      error,
    });
    toast.error(error.response.data.message);
    return false;
  }
};

export const deleteProduct = (token, id) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.product.deleteProduct(id);
    dispatch({
      type: "DELETE_PRODUCT_SUCCESS",
      res,
    });
    toast.success(res.message);
    return true;
  } catch (error) {
    dispatch({
      type: "DELETE_PRODUCT_ERROR",
      error,
    });
    toast.error(error.response.data.message);
    return false;
  }
};

export const addToCart = (product) => async (dispatch) => {
  dispatch({
    type: "ADD_TO_CART",
    product,
  });
};

export const removeItemFromCart = (idx) => async (dispatch) => {
  dispatch({
    type: "REMOVE_ITEM_FROM_CART",
    idx,
  });
};

export const onCheckout = (token, data) => async (dispatch) => {
  const api = new Api(token);
  try {
    let res = await api.product.onCheckout(data);
    dispatch({
      type: "CHECKOUT",
      res,
    });
    toast.success(res.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};
