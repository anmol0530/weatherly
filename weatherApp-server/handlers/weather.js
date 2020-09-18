const { response } = require("express");
const db = require("../models");
const fetch = require("node-fetch");

exports.currentWeather = async function (req, res, next) {
  try {
    //console.log(req.body);
    let city = req.body.city;
    let country = req.body.country;
    const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=e4060ebf2dc2053a169e58a84ee7f118`;
    //console.log(res);
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    console.log(json);

    let history = await db.History.create({
      weather: json.weather[0].description,
      city: req.body.city,
      country: req.body.country,
      temp: json.main.temp,
      temp_max: json.main.temp_max,
      temp_min: json.main.temp_min,
      sunrise: json.sys.sunrise,
      sunset: json.sys.sunset,
      user: req.params.id,
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.history.push(history.id);
    await foundUser.save();
    let foundHistory = await db.History.findById(history._id).populate("user", {
      username: true,
      profileImageUrl: true,
    });

    return res.status(200).json(foundHistory);
  } catch (err) {
    return next(err);
  }
};

exports.getHistory = async function (req, res, next) {
  try {
    let history = await db.History.findById(req.params.history_id);
    return res.status(200).json(history);
  } catch (err) {
    return next(err);
  }
};

exports.deleteHistory = async function (req, res, next) {
  try {
    let history = await db.History.findById(req.params.history_id);
    await history.remove();
    return res.status(200).json(history);
  } catch (err) {
    return next(err);
  }
};

exports.totalHistory = async function (req, res, next) {
  try {
    let userHistory = await db.History.find({ user: req.params.id }).sort({
      createdAt: "desc",
    });
    return res.status(200).json(userHistory);
  } catch (err) {
    return next(err);
  }
};
