'use strict';

const passport = require('passport');
const express = require('express');
const toolService = require('../../services/tool/tool');
const employeesService = require('../../services/employees/employees');

let router = express.Router();

router.get('/employee', passport.authenticate('jwt', { session: false }), employeesService.list);
router.post('/employee', passport.authenticate('jwt', { session: false }), employeesService.add);
router.delete('/employee', passport.authenticate('jwt', { session: false }), employeesService.remove);
// router.update('/employee', passport.authenticate('jwt', { session: false }), employeesService.update); // yet to be implemented

module.exports = router;
