import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { onLogin } from "../../store/actions/Auth";
import { toast } from "react-toastify";

import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      formData: {
        email: "",
        password: "",
      },
    };
  }

  handleLogin = async () => {
    const { history, onLogin } = this.props;
    const { formData } = this.state;
    this.setState({ isDisabled: true });

    // api for register
    let res = await onLogin(formData);
    if (res) {
      if (res.user.isVerified) {
        if (res.user.role === "admin") {
          history.push(`/home/products`);
        } else {
          toast.error("user not authorized");
        }
      } else if (!res.user.isVerified) {
        toast.error("user not verified");
        history.push({
          pathname: "/verify",
          state: { params: res.user.email, comingFrom: "login" },
        });
      }
    }
    this.setState({ isDisabled: false });
  };

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleForgot = () => {
    this.props.history.push("/forgot");
  };

  handleSignup = () => {
    this.props.history.push("/signup");
  };

  render() {
    const { formData, isDisabled } = this.state;
    return (
      <div className="form-container">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <p className="form-title">Login</p>
                <hr style={{ margin: "0px" }} />
              </CardHeader>
              <CardBody>
                <ValidatorForm
                  className="validatorForm"
                  onSubmit={this.handleLogin}
                >
                  <TextValidator
                    className="input-field"
                    label="Email"
                    onChange={this.handleChange}
                    name="email"
                    type="text"
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

                  <p onClick={this.handleForgot} style={{ cursor: "pointer" }}>
                    forgot password?
                  </p>
                  <hr style={{ margin: "20px 0px 20px 0px" }} />
                  <Button className="" type="submit" disabled={isDisabled}>
                    {!isDisabled ? (
                      "Login"
                    ) : (
                      <i className="fa fa-spinner fa-spin fa-1x fa-fw" />
                    )}
                  </Button>
                  <p className="dont-have-acc">
                    Don't have an Account?
                    <span
                      onClick={this.handleSignup}
                      style={{
                        color: "#344675",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {" "}
                      Signup
                    </span>
                  </p>
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
  onLogin: (data) => dispatch(onLogin(data)),
});
export default connect(
  null,
  mapDispatchToProps
)(Login);
