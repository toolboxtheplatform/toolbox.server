'use strict';

const registerController = require('../../controllers/apis/register');
const loginController = require('../../controllers/apis/login');
const forgotController = require('../../controllers/apis/forgot');
const dashboardController = require('../../controllers/apis/dashboard');
const adminController = require('../../controllers/apis/admin');
const employeesController = require('../../controllers/apis/employees');
const profileController = require('../../controllers/apis/profile');
const toolsController = require('../../controllers/apis/tools');
const express = require('express');

let router = express.Router();

router.use('/register', registerController);
router.use('/login', loginController);
router.use('/forgot', forgotController);
router.use('/dashboard', dashboardController);
router.use('/admin/employees', employeesController);
router.use('/employees', employeesController);
router.use('/tools', toolsController);
router.use('/employees/profile', profileController)

module.exports = router;
