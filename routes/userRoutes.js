var throwjs = require('throw.js');
var express = require('express');
var router = express.Router();
var User = require('./../models/user');
var Tenant = require('./../models/tenant');
var Property = require('./../models/property');

// verify API requests using JWT middleware
router.use(require('./../jwtCheck'));

// Route to check if the user is authenticated
router.get('/authenticated', function (req, res, next) {
    res.json({message: 'YOU ARE AUTHENTICATED!'});
});

router.route('/users/:userid')

    // Current user
    .get(function (req, res, next) {
        if (!req.auth || req.auth._id !== req.params['userid'] ) {
            return next(new throwjs.unauthorized());
        }

        User.findById(req.auth._id, function (err, user) {
            if(!user) {
                return next(new throwjs.notFound());
            } else {
                return res.status(200).json(user);
            }
        });
    })

    // Update the current user
    .put(function (req, res, next) {
        if (!req.auth || req.auth._id !== req.params['userid'] ) {
            return next(new throwjs.unauthorized());
        }

        User.findById(req.auth._id, function (err, user) {
            if(!user) {
                return next(new throwjs.notFound());
            } else {


                // Update the user variables
                // TODO: Update more properties for the user here
                property.firstName = req.body.firstName;


                // Save the changes to the user document
                user.save(function (err, savedUser) {
                    if (err) {
                        return (next(err));
                    }
                    return res.status(200).send();
                });
            }
        });

    })

module.exports = router;