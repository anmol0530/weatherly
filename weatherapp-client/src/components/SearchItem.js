import React from "react";
import Moment from "react-moment";
import moment from "moment";
// import { Link } from "react-router-dom";

const SearchItem = ({
  date,
  temp,
  city,
  country,
  weather,
  temp_max,
  temp_min,
  sunrise,
  sunset,
  timezone,
  removeSearch,
}) => (
  <li className="list-group-item">
    <div className="search-area">
      <span className="text-muted">
        <Moment className="text-muted" format="HH:mm - Do MMM YYYY">
          {date}
        </Moment>
      </span>
      <p>WEATHER - {weather}</p>
      <p>AVG TEMPERATURE - {(temp - 273.15).toFixed(2)} °C</p>
      <p>MAX TEMPERATURE - {(temp_max - 273.15).toFixed(2)} °C</p>
      <p>MIN TEMPERATURE - {(temp_min - 273.15).toFixed(2)} °C</p>
      <p>SUNRISE - {moment.utc((sunrise + timezone) * 1000).format("LTS")}</p>
      <p>SUNSET - {moment.utc((sunset + timezone) * 1000).format("LTS")}</p>
      <p>
        {city},{country}
      </p>
      <span className="text-muted">
        <Moment fromNow>{date}</Moment>
      </span>
      <hr />
      <a className="btn btn-danger" onClick={removeSearch}>
        REMOVE
      </a>
    </div>
  </li>
);

export default SearchItem;
