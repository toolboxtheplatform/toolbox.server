'use strict';

const passport = require('passport');
const express = require('express');
const employeesService = require('../../services/employees/employees');

let router = express.Router();

// router.get('/tools/fetch', passport.authenticate('jwt', { session: false }), employeesService.fetch);

router.get('/', passport.authenticate('jwt', { session: false }), employeesService.list);
router.post('/new', passport.authenticate('jwt', { session: false }), employeesService.add);
router.delete('/delete', passport.authenticate('jwt', { session: false }), employeesService.remove);
router.get('/search', passport.authenticate('jwt', { session: false }), employeesService.search);
// router.put('/update', passport.authenticate('jwt', { session: false }), employeesService.add); // Yet to be implemented

module.exports = router;
