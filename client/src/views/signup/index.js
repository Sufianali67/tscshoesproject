import React from "react";

// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { onRegister } from "../../store/actions/Auth";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: false,
      formData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  }

  componentDidMount() {
    const { formData } = this.state;
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== formData.password) {
        return false;
      }
      return true;
    });
  }

  goToLogin = (e) => {
    const { history } = this.props;
    history.push("/admin/login");
  };

  handleSignup = async () => {
    const { history, onRegister } = this.props;
    const { formData } = this.state;
    this.setState({ isDisabled: true });

    // api for register
    let res = await onRegister(formData);
    if (res) {
      history.push({ pathname: "/verify", state: { params: res.user.email, comingFrom: "login" } });
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
    return (
      <div className="form-container">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <p className="form-title">Signup</p>
                <hr style={{ margin: "0px" }} />
              </CardHeader>
              <CardBody>
                <ValidatorForm
                  className="validatorForm"
                  onSubmit={this.handleSignup}
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
                    label="Password"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    margin="dense"
                    variant="outlined"
                    validators={["required"]}
                    errorMessages={["Password can not be empty"]}
                    value={formData.password}
                  />

                  <TextValidator
                    className="input-field"
                    label="Confirm Password"
                    onChange={this.handleChange}
                    name="confirmPassword"
                    type="password"
                    margin="dense"
                    variant="outlined"
                    validators={["required", "isPasswordMatch"]}
                    errorMessages={[
                      "Confirm Password can not be empty",
                      "Password mismatch",
                    ]}
                    value={formData.confirmPassword}
                  />
                  <p className="dont-have-acc">
                    Already have account?
                    <span
                      onClick={this.goToLogin}
                      style={{
                        color: "#344675",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {" "}
                      Login
                    </span>
                  </p>

                  <hr style={{ margin: "20px 0px 20px 0px" }} />
                  <Button className="" type="submit" disabled={isDisabled}>
                    {!isDisabled ? (
                      "Signup"
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
    );
  }
}

// const mapStateToProps = (state) =>
// {
//   return {
//     authToken: state.Auth.authToken,
//   }
// }

const mapDispatchToProps = (dispatch) => ({
  onRegister: (data) => dispatch(onRegister(data)),
});
export default connect(
  null,
  mapDispatchToProps
)(Signup);
