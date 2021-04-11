import React, { Component } from "react";

export default class AuthForm extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: "",
      mobile: "",
      city: "",
      country: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin";
    this.props
      .onAuth(authType, this.state)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(() => {
        return;
      });
  };

  render() {
    const {
      username,
      email,
      password,
      profileImageUrl,
      mobile,
      city,
      country,
    } = this.state;
    const {
      heading,
      buttonText,
      signUp,
      errors,
      history,
      removeError,
    } = this.props;

    history.listen(() => {
      removeError();
    });

    return (
      <div className="authform">
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )}
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
                value={email}
              />
              <label htmlFor="password">Password:</label>
              <input
                autoComplete="off"
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                value={password}
              />
              {signUp && (
                <>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={this.handleChange}
                    value={username}
                  />
                  <label htmlFor="image-url">Profile Image Url:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="image-url"
                    name="profileImageUrl"
                    onChange={this.handleChange}
                    value={profileImageUrl}
                  />
                  <label htmlFor="mobile">Mobile:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    onChange={this.handleChange}
                    value={mobile}
                  />
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={this.handleChange}
                    value={city}
                  />
                  <label htmlFor="country">Country:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    onChange={this.handleChange}
                    value={country}
                  />
                </>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
