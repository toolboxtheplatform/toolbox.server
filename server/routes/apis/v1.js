'use strict';

const registerController = require('../../controllers/apis/register');
const loginController = require('../../controllers/apis/login');
const dashboardController = require('../../controllers/apis/dashboard');
const toolController = require('../../controllers/apis/tool');
const express = require('express');

let router = express.Router();

router.use('/register', registerController);
router.use('/login', loginController);
router.use('/dashboard', dashboardController);
router.use('/admin', toolController);

module.exports = router;