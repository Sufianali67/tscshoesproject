import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Input,
} from "reactstrap";

// core components
import "./productCard.css";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        selectedQuantity: 0,
      },
    };
  }
  addQuantity = (event) => {
    const { product } = this.props;
    const { formData } = this.state;
    if (event.target.value >= 0 && event.target.value <= product.quantity) {
      formData[event.target.name] = event.target.value;
      this.setState({ formData });
    }
  };

  componentDidMount() {
    const { cart, product } = this.props;
    const { formData } = this.state;
    if (cart) {
      formData["selectedQuantity"] = product.selectedQuantity;
      this.setState({ formData });
    }
  }

  handleSubmit = () => {
    const { formData } = this.state;
    const { onAddToCart, product } = this.props;
    if (formData.selectedQuantity !== 0) {
      product["selectedQuantity"] = formData.selectedQuantity;
      product["totalPrice"] = formData.selectedQuantity * product.price;
      toast.success("Product added to cart");
      onAddToCart(product);
    } else {
      toast.error("Please add quantity");
    }
  };
  render() {
    const { product, cart, index, removeFromCart } = this.props;
    const { formData } = this.state;
    return (
      <Card
        className="card-chart"
        style={{ maxWidth: "300px", marginLeft: "50px" }}
      >
        {cart ? (
          <div
            style={{ textAlign: "right", }}
            onClick={() => {
              console.log("clicked");
              removeFromCart(index);
            }}
          >
            <i
              class="fa fa-times"
              aria-hidden="true"
              style={{
                padding: "12px 12px 0px",
                marginBottom: "-16px",
              }}
            ></i>
          </div>
        ) : null}
        <CardHeader>
          <h5 className="card-category">{product.name}</h5>
          <CardTitle tag="h3">
            <i className="tim-icons icon-money-coins text-info" />{" "}
            {product.price} USD
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="chart-area">
            <img
              style={{ width: "100%", height: "100%" }}
              alt="..."
              src={product.imagePath}
            />
          </div>
          <ValidatorForm className="validatorForm" onSubmit={this.handleSubmit}>
            <TextValidator
              disabled={cart}
              className="input-field"
              label="Quantity"
              onChange={this.addQuantity}
              name="selectedQuantity"
              type="number"
              margin="dense"
              variant="outlined"
              validators={["required"]}
              errorMessages={["Quantity can not be empty"]}
              value={
                cart ? product.selectedQuantity : formData.selectedQuantity
              }
            />
            {cart ? null : <Button type="submit">Add to Cart</Button>}
          </ValidatorForm>
        </CardBody>
      </Card>
    );
  }
}
export default ProductCard;
