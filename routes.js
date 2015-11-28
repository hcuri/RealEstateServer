var express = require('express');
var router = express.Router();
var User  = require('./app/models/user');
var Tenant  = require('./app/models/tenant');
var Property  = require('./app/models/property');

// verify API requests using JWT middleware
router.use(require('./jwtCheck'));


// Route to check if the user is authenticated
router.get('/', function(req, res) {
    res.json({ message: 'YOU ARE AUTHENTICATED!' });
});

// All users
router.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

// Current user
router.get('/users/:userid', function(req, res, next) {
    if (!req.auth) {
        return res.status(401).send();
    } else if (req.auth._id !== req.params['userid']) {
        return res.status(401).send();
    }


    User.findOne({_id: { $in: [req.auth._id] } }, function (err, user) {
        if (err) { return next(err); }
        res.status(200).json(user);
    });
});


// Current user's properties
router.get('/users/:userid/properties', function(req, res, next) {
    if (!req.auth) {
        return res.status(401).send();
    } else if (req.auth._id !== req.params['userid']) {
        return res.status(401).send();
    }

    User.findOne({_id: { $in: [req.auth._id] } }, function (err, user) {
        if (err) { return next(err); }
        res.status(200).json(user.properties);
    });
});

module.exports = router;