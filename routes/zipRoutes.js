var throwjs = require('throw.js');
var express = require('express');
var router = express.Router();
var User = require('./../models/user');
var Tenant = require('./../models/tenant');
var Property = require('./../models/property');

// verify API requests using JWT middleware
router.use(require('./../jwtCheck'));

// TODO - Implement routes here

module.exports = router;