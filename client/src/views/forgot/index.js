import React from "react";
import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { onForgotPassword } from "../../store/actions/Auth";
import { connect } from "react-redux";

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      formData: {
        email: "",
      },
      isDisabled: false,
    };
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleForgot = async () => {
    const { history, onForgotPassword } = this.props;
    const { formData } = this.state;
    this.setState({ isDisabled: true });

    // api for code verification
    let res = await onForgotPassword(formData);
    if (res) {
      history.push({
        pathname: "/verify",
        state: { params: res.user.email, comingFrom: "forgot" },
      });
    }
    this.setState({ isDisabled: false });
  };

  render() {
    const { formData, isDisabled } = this.state;
    return (
      <div className="form-container">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <p className="form-title">Enter Email</p>
                <hr style={{ margin: "0px" }} />
              </CardHeader>
              <CardBody>
                <ValidatorForm
                  className="validatorForm"
                  onSubmit={this.handleForgot}
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
  onForgotPassword: (data) => dispatch(onForgotPassword(data)),
});
export default connect(
  null,
  mapDispatchToProps
)(ForgotPassword);
