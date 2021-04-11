const { response } = require("express");
const db = require("../models");
const fetch = require("node-fetch");

exports.createSearch = async function (req, res, next) {
  try {
    //console.log(req.body);
    let city = req.body.city;
    let country = req.body.country;
    const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=e4060ebf2dc2053a169e58a84ee7f118`;
    //console.log(res);
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    console.log(json);

    let search = await db.Search.create({
      weather: json.weather[0].description,
      city: req.body.city,
      country: req.body.country,
      temp: json.main.temp,
      temp_max: json.main.temp_max,
      temp_min: json.main.temp_min,
      sunrise: json.sys.sunrise,
      sunset: json.sys.sunset,
      timezone: json.timezone,
      user: req.params.id,
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.searches.push(search.id);
    await foundUser.save();
    let foundSearch = await db.Search.findById(search._id).populate("user", {
      username: true,
      profileImageUrl: true,
    });

    return res.status(200).json(foundSearch);
  } catch (err) {
    return next(err);
  }
};

exports.getSearch = async function (req, res, next) {
  try {
    let search = await db.Search.findById(req.params.search_id);
    return res.status(200).json(search);
  } catch (err) {
    return next(err);
  }
};

exports.deleteSearch = async function (req, res, next) {
  try {
    let foundSearch = await db.Search.findById(req.params.search_id);
    await foundSearch.remove();
    return res.status(200).json(foundSearch);
  } catch (err) {
    return next(err);
  }
};

exports.allSearches = async function (req, res, next) {
  try {
    let allSearches = await db.Search.find({ user: req.params.id }).sort({
      createdAt: "desc",
    });
    return res.status(200).json(allSearches);
  } catch (err) {
    return next(err);
  }
};
