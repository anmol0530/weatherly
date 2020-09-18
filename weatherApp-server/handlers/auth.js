const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });

    let { id, username, profileImageUrl, city, country, mobile } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if(isMatch){
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        city,
        country,
        mobile,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password"
      });
    }
  } catch (e) {
    return next({
      status: 400,
      message: "Invalid Email/Password"
    });
  }
};

exports.signup = async function(req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl, city, country, mobile } = user;
    let token = jwt.sign(
      {
        id, 
        username,
        profileImageUrl
      }, 
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      city,
      country,
      mobile,
      token
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, this username and/or email is already taken!';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};
