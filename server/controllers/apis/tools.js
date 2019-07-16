'use strict';

const passport = require('passport');
const express = require('express');
const toolService = require('../../services/tool/tool');

let router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), toolService.get);
router.post('/new', passport.authenticate('jwt', { session: false }), toolService.add);
router.delete('/delete', passport.authenticate('jwt', { session: false }), toolService.remove);

module.exports = router;