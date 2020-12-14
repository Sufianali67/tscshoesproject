import { connect } from "react-redux";
import EventBus from "eventing-bus";
import React, { Component } from "react";
import Login from "views/login";
import Signup from "views/signup";
import PrivateRoute from "./PrivateRoute";
import { createBrowserHistory } from "history";
import AdminLayout from "layouts/Admin/Admin.jsx";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "views/dashboard";
import NotificationAlert from "react-notification-alert";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import ForgotPassword from "./views/forgot";
import VerifyCode from "./views/verify";

import "./App.css";
import "./views/forms.css";
import "react-toastify/dist/ReactToastify.css";
import UpdatePassword from "./views/updatePassword";
import Shoes from "./views/categories/Shoes";

const hist = createBrowserHistory();

class App extends Component {
  notify = ({ auth, message }) => {
    var type;
    var time;
    if (auth) {
      type = "success";
      time = 5;
    } else {
      type = "danger";
      time = 7;
    }

    var options = {};
    options = {
      place: "tc",
      message: <div>{message}</div>,
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: time,
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  componentDidMount() {
    EventBus.on("handleAlert", this.notify);
  }

  render() {
    return (
      <div>
        <ToastContainer />
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <Router history={hist}>
          <Switch>
            <Route
              path="/home"
              component={(props) => <AdminLayout {...props} />}
            />
            <Route
              exact
              path="/admin/login"
              component={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/signup"
              component={(props) => <Signup {...props} />}
            />
            <Route
              exact
              path="/forgot"
              component={(props) => <ForgotPassword {...props} />}
            />
            <Route
              exact
              path="/verify"
              component={(props) => <VerifyCode {...props} />}
            />
            <Route
              exact
              path="/update-password"
              component={(props) => <UpdatePassword {...props} />}
            />
            <Redirect to="/home/shoes" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
