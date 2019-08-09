'use strict';

const express = require('express');
const apiRoutes = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const db = require('../../../configs/db');

const User = require('../../models/User');

const httpResponse = {
  onUserNotFound: {
    success: false,
    message: 'User not found.'
  },
  onAuthenticationFail: {
    success: false,
    message: 'Passwords did not match.'
  }
}

function forgotPassword(request, response) { 
  let { username, password, repassword } = request.body;

  if (!password || !repassword) {
    return response.json({
      success: false,
      message: 'Please enter and re-enter your password for verification.'
    });
  }

  if (password !== repassword) {
    return response.json({
      success: false,
      message: 'Passwords do not match.'
    });
  }

  User.findOneAndUpdate({ username: username }, { password: password }, { new: true })
    .exec()
    .then(() => {
      return response.json({
        success: true,
        message: 'Your password updated successfully.',
      })
    })
    .catch(error => {
      return response.json(error);
    });
};

module.exports = {
  forgotPassword: forgotPassword
};
