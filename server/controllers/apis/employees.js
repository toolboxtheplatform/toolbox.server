'use strict';

const passport = require('passport');
const express = require('express');
const employeesService = require('../../services/employees/employees');

let router = express.Router();

router.post('/employees/new', passport.authenticate('jwt', { session: false }), employeesService.add);

module.exports = router;
