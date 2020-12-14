import React from "react";
import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { onVerifyCode, onResendCode } from "../../store/actions/Auth";

class VerifyCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: (props.location.state && props.location.state.params) || "",
        verificationCode: "",
      },
      isDisabled: false,
    };
    this.comingFrom = props.location.state && props.location.state.comingFrom;
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  onSubmitCode = async () => {
    const { history, onVerifyCode } = this.props;
    const { formData } = this.state;
    this.setState({ isDisabled: true });

    // api for code verification
    let res = await onVerifyCode(formData);
    if (res) {
      if (this.comingFrom === "login") {
        history.push(`/admin/login`);
      } else {
        history.push({
          pathname: "/update-password",
          state: { params: res.token, comingFrom: "verify" },
        });
      }
    }
    this.setState({ isDisabled: false });
  };

  handleResend = async () => {
    const { formData } = this.state;
    const {onResendCode} = this.props
    this.setState({ isDisabled: true });
    let res = await onResendCode(formData);
    this.setState({ isDisabled: false });
  }

  render() {
    const { formData, isDisabled } = this.state;
    return (
      <div className="form-container">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <p className="form-title">Enter Code</p>
                <hr style={{ margin: "0px" }} />
              </CardHeader>
              <CardBody>
                <ValidatorForm
                  className="validatorForm"
                  onSubmit={this.onSubmitCode}
                >
                  <TextValidator
                    className="input-field"
                    label="Email"
                    onChange={this.handleChange}
                    name="code"
                    type="text"
                    margin="dense"
                    variant="outlined"
                    disabled
                    value={formData.email}
                  />
                  <TextValidator
                    className="input-field"
                    label="Code"
                    onChange={this.handleChange}
                    name="verificationCode"
                    type="text"
                    margin="dense"
                    variant="outlined"
                    validators={["required"]}
                    errorMessages={["Code can not be empty"]}
                    value={formData.verificationCode}
                  />
                  <p
                    hidden={isDisabled}
                      onClick={this.handleResend}
                      style={{ cursor: "pointer" }}
                    >
                      Resend Code
                    </p>
                  <hr style={{ margin: "20px 0px 20px 0px" }} />
                  <Button className="" type="submit" disabled={isDisabled}>
                    {!isDisabled ? (
                      "Send"
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

const mapDispatchToProps = (dispatch) => ({
  onVerifyCode: (data) => dispatch(onVerifyCode(data)),
  onResendCode: (data) => dispatch(onResendCode(data)),
});
export default connect(
  null,
  mapDispatchToProps
)(VerifyCode);
