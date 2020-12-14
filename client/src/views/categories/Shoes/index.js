import React from "react";
import { connect } from "react-redux";

// core components
import ProductCard from "../../../components/ProductCard";
import { addToCart, getAllProducts } from "../../../store/actions/Product";
class Shoes extends React.Component {
  async componentDidMount() {
    const { getAllProducts, token } = this.props;
    await getAllProducts(token);
  }

  onAddToCart = (e) => {
    const { addToCart } = this.props;
    console.log("e :: ", e);
    addToCart(e);
  };

  render() {
    const { allProducts } = this.props;
    return (
      <div className="content">
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {allProducts &&
              allProducts.map((product, idx) => {
                return (
                  <ProductCard
                    onAddToCart={this.onAddToCart}
                    product={product}
                    key={idx}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.AppState.Auth.token,
    allProducts: state.AppState.Product.allProducts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: (token) => dispatch(getAllProducts(token)),
  addToCart: (product) => dispatch(addToCart(product)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shoes);
