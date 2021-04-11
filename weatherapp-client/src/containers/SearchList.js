import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSearches, removeSearch } from "../store/actions/searches";
import SearchItem from "../components/SearchItem";

class SearchList extends Component {
  componentDidMount() {
    this.props.fetchSearches();
  }
  componentDidUpdate() {
    this.props.fetchSearches();
  }
  render() {
    const { searches, removeSearch } = this.props;
    let searchList = searches.map((s) => (
      <SearchItem
        key={s._id}
        date={s.createdAt}
        temp={s.temp}
        temp_max={s.temp_max}
        temp_min={s.temp_min}
        weather={s.weather}
        city={s.city}
        country={s.country}
        sunrise={s.sunrise}
        sunset={s.sunset}
        timezone={s.timezone}
        removeSearch={removeSearch.bind(this, s.user, s._id)}
      />
    ));
    return (
      <div className="scroll">
        <div className="">
          <ul className="list-group" id="searches">
            {searchList}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searches: state.searches,
  };
}

export default connect(mapStateToProps, { fetchSearches, removeSearch })(
  SearchList
);
