'use strict';

const passport = require('passport');
const express = require('express');
const toolService = require('../../services/tool/tool');

let router = express.Router();

router.post('/tool/new', passport.authenticate('jwt', { session: false }), toolService.add);

module.exports = router;
