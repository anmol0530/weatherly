import React, { Component } from "react";
import { connect } from "react-redux";
import { newSearch } from "../store/actions/searches";
import { withRouter } from "react-router-dom";

// ADDING COMMENT BECAUSE OF STUPID HEROKU APP

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
    };
  }

  handleNewSearch = (event) => {
    event.preventDefault();
    this.props.newSearch(this.state.city, this.state.country);
    this.setState({ city: "", country: "" });
    this.props.history.push("/users/searches");
    // flag = true;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username } = this.props;
    // const flag = false;
    return (
      <div>
        <form onSubmit={this.handleNewSearch} className="search-form">
          <h1>Welcome, {username.toUpperCase()} </h1>
          <hr />
          <h1>Search Weather</h1>
          <hr />
          {this.props.errors.message && (
            <div className="alert alert-danger">
              {this.props.errors.message}
            </div>
          )}
          <label htmlFor="city">City:</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={this.state.city}
            onChange={this.handleChange}
          />
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={this.state.country}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-success">
            Search
          </button>
        </form>

        {<div>{this.props.errors.message}</div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
  };
}

export default withRouter(connect(mapStateToProps, { newSearch })(SearchForm));
