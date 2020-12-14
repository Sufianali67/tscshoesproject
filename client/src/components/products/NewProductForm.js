import React from "react";

// reactstrap components
import {
  Button,
  Card,
  FormGroup,
  CardBody,
  Row,
  Col,
  Alert,
  Label,
  Input,
  FormText,
} from "reactstrap";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { onAddProduct, getAllProducts } from "../../store/actions/Product";

class NewProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      imgInValid: false,
      isLoading: false,
      formData: {
        name: "",
        price: "",
        quantity: "",
        file: "",
      },
    };
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleFileUpload = (e) => {
    const { formData } = this.state;
    formData["file"] = e.target.files[0];
    this.setState({ formData });
  };

  handleSubmit = async () => {
    const { token, onAddProduct, backToMain, getAllProducts } = this.props;
    const { formData } = this.state;
    if (formData.file === "") {
      this.setState({ imgInValid: true });
    } else {
      this.setState({ imgInValid: false, isLoading: true });
      const res = await onAddProduct(token, formData);
      if (res) {
        getAllProducts(token);
        this.setState({ isLoading: false });
        backToMain();
      }
    }
  };

  render() {
    const { formData, imgInValid, isLoading } = this.state;

    return (
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <ValidatorForm
                className="validatorForm"
                onSubmit={this.handleSubmit}
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
                  label="Price (USD)"
                  onChange={this.handleChange}
                  name="price"
                  type="number"
                  margin="dense"
                  variant="outlined"
                  validators={["required"]}
                  errorMessages={["Price can not be empty"]}
                  value={formData.price}
                />
                <TextValidator
                  className="input-field"
                  label="Quantity"
                  onChange={this.handleChange}
                  name="quantity"
                  type="number"
                  margin="dense"
                  variant="outlined"
                  validators={["required"]}
                  errorMessages={["Quantity can not be empty"]}
                  value={formData.quantity}
                />
                <FormGroup>
                  <Label for="exampleFile">Product Image</Label>
                  <Input
                    type="file"
                    name="file"
                    accept="image/png"
                    onChange={this.handleFileUpload}
                  />
                  <FormText color="muted">
                    {formData.file.name ? (
                      formData.file.name
                    ) : (
                      <p>Click here to Upload</p>
                    )}
                  </FormText>
                </FormGroup>
                {imgInValid && (
                  <Alert color="danger">Product image required</Alert>
                )}
                <Button disabled={isLoading} type="submit">
                  {!isLoading ? (
                    "Save"
                  ) : (
                    <i className="fa fa-spinner fa-spin fa-1x fa-fw" />
                  )}
                </Button>
              </ValidatorForm>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.AppState.Auth.token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAddProduct: (token, obj) => dispatch(onAddProduct(token, obj)),
  getAllProducts: (token) => dispatch(getAllProducts(token)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProductForm);
