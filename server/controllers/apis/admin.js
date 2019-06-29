'use strict';

const passport = require('passport');
const express = require('express');
const toolService = require('../../services/tool/tool');
const employeesService = require('../../services/employees/employees');

let router = express.Router();

router.post('/tool/new', passport.authenticate('jwt', { session: false }), toolService.add);
router.get('/tools/list', passport.authenticate('jwt', { session: false }), toolService.fetch);
router.post('/employees/new', passport.authenticate('jwt', { session: false }), employeesService.add);

module.exports = router;
