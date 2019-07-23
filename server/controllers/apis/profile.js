'use strict';

const passport = require('passport');
const express = require('express');
const profileService = require('../../services/employees/profile');

let router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), profileService.getProfile);
router.put('/', passport.authenticate('jwt', { session: false }), profileService.updateProfile);

module.exports = router;
