import React from "react";
import { connect } from "react-redux";
// reactstrap components
import { Alert, Button } from "reactstrap";
import ProductCard from "../../components/ProductCard";

// core components
import {
  addToCart,
  getAllProducts,
  removeItemFromCart,
} from "../../store/actions/Product";
class Cart extends React.Component {
  async componentDidMount() {
    const { getAllProducts, token } = this.props;
    await getAllProducts(token);
  }

  onAddToCart = (e) => {
    const { addToCart } = this.props;
    addToCart(e);
  };
  handleCheckout = () => {
    const { cart } = this.props;
    this.props.history.push("/home/checkout-billing");
  };

  removeDuplicates = (originalArray, prop) => {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.unshift(lookupObject[i]);
    }
    return newArray;
  };

  render() {
    const { cart } = this.props;
    let total = 0;
    {
      cart.map((product) => {
        total = product.selectedQuantity * product.price + total;
      });
    }

    var uniqueArray = this.removeDuplicates(cart, "name");

    return (
      <div className="content">
        {cart.length === 0 ? (
          <Alert color="danger">No product added to Cart</Alert>
        ) : (
          <>
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {uniqueArray.map((product, idx) => {
                  return (
                    <ProductCard
                      onAddToCart={this.onAddToCart}
                      cart
                      product={product}
                      key={idx}
                      index={idx}
                      removeFromCart={this.props.removeItemFromCart}
                    />
                  );
                })}
              </div>
            </div>
            <div
              style={{ backgroundColor: "white", padding: 20, borderRadius: 6 }}
            >
              <h3>Total: {total} USD</h3>
              {total != 0 ? (
                <Button onClick={this.handleCheckout}>Proceed</Button>
              ) : null}
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.AppState.Auth.token,
    cart: state.AppState.Product.cart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: (token) => dispatch(getAllProducts(token)),
  addToCart: (product) => dispatch(addToCart(product)),
  removeItemFromCart: (idx) => dispatch(removeItemFromCart(idx)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
