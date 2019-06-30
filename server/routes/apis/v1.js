'use strict';

const registerController = require('../../controllers/apis/register');
const loginController = require('../../controllers/apis/login');
const dashboardController = require('../../controllers/apis/dashboard');
const adminController = require('../../controllers/apis/admin');
const employeesController = require('../../controllers/apis/employees');
const express = require('express');

let router = express.Router();

router.use('/register', registerController);
router.use('/login', loginController);
router.use('/dashboard', dashboardController);
router.use('/admin', adminController);
router.use('/employees', employeesController);

module.exports = router;