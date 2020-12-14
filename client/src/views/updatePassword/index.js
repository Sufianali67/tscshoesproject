import React from "react";
import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { onUpdatePassword } from "../../store/actions/Auth";
class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,

      formData: {
        newPassword: "",
        // user_id: this.props.match.params.id,
        // code: this.props.match.params.code,
      },
      passwordValid: true,
    };
    this.comingFrom = props.location.state && props.location.state.comingFrom || '';
    if (props.location.state && props.location.state.params === undefined) {
      props.history.push(`/admin/login`);
    }
    else{
      this.token = props.location.state.params
    }
  }

  componentDidMount() {
    const { formData } = this.state;
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== formData.newPassword) {
        return false;
      }
      return true;
    });
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleUpdatePassword = async () => {
    const { history, onUpdatePassword } = this.props;
    const { formData } = this.state;
    this.setState({ isDisabled: true });
    if (this.comingFrom === 'verify') {
      formData['resetPassword'] = true
    }
    // api for code verification
    let res = await onUpdatePassword(this.token,formData);
    if (res) {
      history.push(`/admin/login`);
    }
    this.setState({ isDisabled: false });
  };

  render() {
    const { formData, isDisabled } = this.state;
    return (
      <div
        className={this.comingFrom === "verify" ? "form-container" : "content"}
      >
        <Row style={{ justifyContent: "center" }}>
          <Col md={this.comingFrom === "verify" ? "12" : "6"}>
            <Card>
              <CardHeader>
                <p className="form-title">Update Password</p>
                <hr style={{ margin: "0px" }} />
              </CardHeader>
              <CardBody>
                <ValidatorForm
                  className="validatorForm"
                  onSubmit={this.handleUpdatePassword}
                >
                  <TextValidator
                    className="input-field"
                    label="Password"
                    onChange={this.handleChange}
                    name="newPassword"
                    type="password"
                    margin="dense"
                    variant="outlined"
                    validators={["required"]}
                    errorMessages={["Password can not be empty"]}
                    value={formData.newPassword}
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

                  {this.comingFrom !== "verify" ? (
                    <p
                      onClick={this.handleForgot}
                      style={{ cursor: "pointer" }}
                    >
                      forgot password?
                    </p>
                  ) : null}
                  <hr style={{ margin: "20px 0px 20px 0px" }} />
                  <Button className="" type="submit" disabled={isDisabled}>
                    {!isDisabled ? (
                      "Update"
                    ) : (
                      <i className="fa fa-spinner fa-spin fa-1x fa-fw" />
                    )}
                  </Button>
                  {/* <p className="dont-have-acc">
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
                      Update
                    </span>
                  </p> */}
                </ValidatorForm>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  onUpdatePassword: (token, data) => dispatch(onUpdatePassword(token, data)),
});
export default connect(
  null,
  mapDispatchToProps
)(UpdatePassword);