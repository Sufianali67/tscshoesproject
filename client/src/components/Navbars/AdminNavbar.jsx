import classNames from "classnames";
import { connect } from "react-redux";
import React, { Component } from "react";

// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal
} from "reactstrap";
import { Link } from "react-router-dom";

// import {logout} from "../../store/actions/Auth";

class AdminNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent"
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }

  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen)
      this.setState({ color: "bg-white" });
    else this.setState({ color: "navbar-transparent" });
  };

  toggleCollapse = () => {
    if (this.state.collapseOpen) this.setState({ color: "navbar-transparent" });
    else this.setState({ color: "bg-white" });
    this.setState({ collapseOpen: !this.state.collapseOpen });
  };

  toggleModalSearch = () =>
    this.setState({ modalSearch: !this.state.modalSearch });

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/admin/login");
  };

  handleSettings = () => {
    this.props.history.push("/home/settings");
  };

  render() {
    return (
      <div>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          {this.props.userData !== null ? (
            <Container fluid>
              <div className="navbar-wrapper">
                <div
                  className={classNames("navbar-toggle d-inline", {
                    toggled: this.props.sidebarOpened
                  })}
                >
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.props.toggleSidebar}
                  >
                    <span className="navbar-toggler-bar bar1" />
                    <span className="navbar-toggler-bar bar2" />
                    <span className="navbar-toggler-bar bar3" />
                  </button>
                </div>
                <NavbarBrand
                  onClick={e => this.props.history.push("/home/dashboard")}
                >
                  <img
                    style={{
                      objectFit: "scale-down",
                      width: "50%",
                      borderRadius: "50%"
                    }}
                    alt="..."
                    src={"/favicon.png"}
                  />
                </NavbarBrand>
              </div>
              <button
                aria-expanded={false}
                aria-label="Toggle navigation"
                className="navbar-toggler"
                data-target="#navigation"
                data-toggle="collapse"
                id="navigation"
                type="button"
                onClick={this.toggleCollapse}
              >
                <span className="navbar-toggler-bar navbar-kebab" />
                <span className="navbar-toggler-bar navbar-kebab" />
                <span className="navbar-toggler-bar navbar-kebab" />
              </button>
              <Collapse navbar isOpen={this.state.collapseOpen}>
                <Nav className="ml-auto" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle
                      caret
                      color="default"
                      data-toggle="dropdown"
                      nav
                      onClick={e => e.preventDefault()}
                    >
                      <div className="photo">
                        <img alt="..." src="/favicon.png" />
                      </div>
                      <b className="caret d-none d-lg-block d-xl-block" />
                      <p className="d-lg-none">Log out</p>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-navbar" right tag="ul">
                      <NavLink tag="li">
                        <DropdownItem
                          className="nav-item"
                          onClick={this.handleSettings}
                        >
                          Profile Settings
                        </DropdownItem>
                      </NavLink>
                      <DropdownItem divider tag="li" />
                      <NavLink tag="li">
                        <DropdownItem
                          className="nav-item"
                          onClick={this.handleLogout}
                        >
                          Log out
                        </DropdownItem>
                      </NavLink>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <li className="separator d-lg-none" />
                </Nav>
              </Collapse>
            </Container>
          ) : (
            <Link to="/home/cart" style={{
              width: "100%",
              textAlign: "right",
              cursor: "pointer",
              fontWeight: "600"
            }}>
              <p
                style={{
                  width: "100%",
                  textAlign: "right",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                View Cart
              </p>
            </Link>
          )}
        </Navbar>
        <Modal
          modalClassName="modal-search"
          isOpen={this.state.modalSearch}
          toggle={this.toggleModalSearch}
        >
          <div className="modal-header">
            <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleModalSearch}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

// const mapDispatchToProps = {logout};

export default connect(
  null,
  null
)(AdminNavbar);
