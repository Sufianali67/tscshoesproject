const defaultState = {
  allProducts: [],
  cart: [],
};

const product = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_SUCCESS": {
      return {
        ...state,
        allProducts: action.res.products,
      };
    }
    case "ADD_TO_CART": {
      return {
        ...state,
        cart: [...state.cart, action.product],
      };
    }
    case "REMOVE_ITEM_FROM_CART": {
      return {
        cart: state.cart.filter((item, idx) => idx !== action.idx),
      };
    }
    default:
      return state;
  }
};

export default product;
