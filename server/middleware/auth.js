const jwt = require("jsonwebtoken");
const userModel = require("../models/users");

exports.loginCheck = (req, res, next) => {
  try {
    let token = req.headers.token;
    console.log("token: ", token);
    token = token.replace("Bearer ", "");
    decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userDetails = decode;
    next();
  } catch (err) {
    res.json({
      error: "You must be logged in",
    });
  }
};

// Grant access to specific roles
exports.adminAuthenticate = (req, res, next) => {
  try {
    let token = req.headers.token;
    console.log("token: ", token);
    token = token.replace("Bearer ", "");
    decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode.role == 1) {
      next();
    } else {
      res.json({
        error: "Authenticate error",
      });
    }
  } catch (err) {
    res.json({
      error: "You must be logged in",
    });
  }
};

exports.generateToken = async (token) => {
  try {
    if (token) {
      const accessToken = token.split(" ")[1];
      const data = await jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
      if (data) {
        return data;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};
