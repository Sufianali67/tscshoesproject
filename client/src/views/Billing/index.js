import React from "react";

// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { onCheckout } from "../../store/actions/Product";
import { connect } from "react-redux";

class Billing extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: false,
      formData: {
        name: "",
        email: "",
        address: "",
        bill: "",
      },
    };
  }

  componentDidMount() {
    const { cart } = this.props;
    const { formData } = this.state;
    let total = 0;
    {
      cart.map((product) => {
        total = product.selectedQuantity * product.price + total;
      });
    }
    formData["bill"] = total;
    this.setState({ formData });
  }

  handleBilling = async () => {
    const { history, onCheckout, authToken, cart } = this.props;
    const { formData } = this.state;
    this.setState({ isDisabled: true });

    formData["products"] = cart;
    // api for register
    let res = await onCheckout(authToken, formData);
    if (res) {
      history.push("/home/shoes");
    }
    this.setState({ isDisabled: false });
  };

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  render() {
    const { formData, isDisabled } = this.state;
    const { history, cart } = this.props;
    if (cart.length === 0) {
      history.push("/home/shoes");
    }
    return (
      <div className="content">
        <div className="form-container">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <p className="form-title">Checkout</p>
                  <hr style={{ margin: "0px" }} />
                </CardHeader>
                <CardBody>
                  <ValidatorForm
                    className="validatorForm"
                    onSubmit={this.handleBilling}
                  >
                    <TextValidator
                      className="input-field"
                      label="Name"
                      onChange={this.handleChange}
                      name="name"
                      type="text"
                      margin="dense"
                      variant="outlined"
                      validators={["required"]}
                      errorMessages={["Name can not be empty"]}
                      value={formData.name}
                    />

                    <TextValidator
                      className="input-field"
                      label="Email"
                      onChange={this.handleChange}
                      name="email"
                      type="email"
                      margin="dense"
                      variant="outlined"
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "Email can not be empty",
                        "Email is not valid",
                      ]}
                      value={formData.email}
                    />

                    <TextValidator
                      className="input-field"
                      label="Shipping Address"
                      onChange={this.handleChange}
                      name="address"
                      type="text"
                      margin="dense"
                      variant="outlined"
                      validators={["required"]}
                      errorMessages={["Address can not be empty"]}
                      value={formData.address}
                    />

                    <TextValidator
                      className="input-field"
                      label="Total (USD)"
                      onChange={this.handleChange}
                      name="bill"
                      type="text"
                      margin="dense"
                      variant="outlined"
                      disabled
                      validators={["required"]}
                      errorMessages={["Billing can not be empty"]}
                      value={formData.bill}
                    />

                    <hr style={{ margin: "20px 0px 20px 0px" }} />
                    <Button className="" type="submit" disabled={isDisabled}>
                      {!isDisabled ? (
                        "Checkout"
                      ) : (
                        <i className="fa fa-spinner fa-spin fa-1x fa-fw" />
                      )}
                    </Button>
                  </ValidatorForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
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
  onCheckout: (token, data) => dispatch(onCheckout(token, data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing);
