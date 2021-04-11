import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../images/webappers.png";
import { logout } from "../store/actions/auth";
import { withRouter } from 'react-router-dom';


class Navbar extends Component {
  logout = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  };
  render() {
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <img src={Logo} alt="Weatherly Home" />
            </Link>
          </div>
          {this.props.currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to={`/users/searches`}>
                  Search History
                </Link>
              </li>
              <li>
                <a onClick={this.logout}>Log Out</a>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Log In</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default withRouter(connect(mapStateToProps, { logout })(Navbar));
