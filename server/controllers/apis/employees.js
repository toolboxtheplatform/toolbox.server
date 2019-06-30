'use strict';

const passport = require('passport');
const express = require('express');
const employeesService = require('../../services/employees/employees');

let router = express.Router();

router.get('/tools/fetch', passport.authenticate('jwt', { session: false }), employeesService.fetch);

module.exports = router;
