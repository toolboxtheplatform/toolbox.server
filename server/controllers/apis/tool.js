'use strict';

const passport = require('passport');
const express = require('express');
const toolService = require('../../services/tool/tool');

let router = express.Router();

router.post('/tool/new', passport.authenticate('jwt', { session: false }), toolService.add);
router.get('/tools/list', passport.authenticate('jwt', { session: false }), toolService.fetch);

module.exports = router;
