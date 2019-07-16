'use strict';

const registerController = require('../../controllers/apis/register');
const loginController = require('../../controllers/apis/login');
const dashboardController = require('../../controllers/apis/dashboard');
const adminController = require('../../controllers/apis/admin');
const employeesController = require('../../controllers/apis/employees');
const toolsController = require('../../controllers/apis/tools');
const express = require('express');

let router = express.Router();

router.use('/register', registerController);
router.use('/login', loginController);
router.use('/dashboard', dashboardController);
router.use('/admin/employees', employeesController);
router.use('/employees', employeesController);
router.use('/tools', toolsController);

module.exports = router;
