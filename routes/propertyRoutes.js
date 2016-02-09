var throwjs = require('throw.js');
var express = require('express');
var router = express.Router();
var User = require('./../models/user');
var Tenant = require('./../models/tenant');
var Property = require('./../models/property');

// verify API requests using JWT middleware
router.use(require('./../jwtCheck'));

router.route('/users/:userid/properties')

    // Get all of the current user's properties
    .get(function (req, res, next) {
        if (!req.auth || req.auth._id !== req.params['userid'] ) {
            return next(new throwjs.unauthorized());
        }

        User.findById(req.auth._id, function (err, user) {
            if(!user) {
                return next(new throwjs.notFound());
            } else {
                return res.status(200).json(user.properties);
            }
        });
    })

    // Add a new property
    .post(function (req, res, next) {

        if (!req.auth || req.auth._id !== req.params['userid'] ) {
            return next(new throwjs.unauthorized());
        }

        var property = new Property();
        property.title = req.body.title;
        property.type = req.body.type;
        property.address = req.body.address;
        property.city = req.body.city;
        property.value = req.body.value;
        property.totalRentPaid = req.body.totalRentPaid;
        property.monthsPaid = req.body.monthsPaid;
        property.rentPayment = req.body.rentPayment;
        property.returnOnInvestment = req.body.returnOnInvestment;
        property.dateLastPaid = req.body.dateLastPaid;

        // TODO - Set the tenant and image
        property.tenant = null;
        property.image = null;

        User.findById(req.auth._id, function (err, user) {
            if(!user) {
                return next(new throwjs.notFound());
            } else {

                user.properties.push(property);

                user.save(function (err, savedUser) {
                    if (err) {
                        return (next(err));
                    }
                    return res.status(200).send();
                });
            }
        });

    });



router.route('/users/:userid/properties/:propertyid')

    // Get the current property
    .get(function (req, res, next) {
        if (!req.auth || req.auth._id !== req.params['userid'] ) {
            return next(new throwjs.unauthorized());
        }

        User.findById(req.auth._id, function (err, user) {
            if(!user) {
                return next(new throwjs.notFound());
            } else {
                // Find the specified property
                var property = user.properties.id(req.params['propertyid']);

                if (!property) {
                    return next(new throwjs.notFound());
                } else {
                    return res.status(200).json(property);
                }
            }
        });
    })

    // Update the current property
    .put(function (req, res, next) {
        if (!req.auth || req.auth._id !== req.params['userid'] ) {
            return next(new throwjs.unauthorized());
        }

        User.findById(req.auth._id, function (err, user) {
            if(!user) {
                return next(new throwjs.notFound());
            } else {

                // Find the property by id
                var property = user.properties.id(req.params['propertyid']);

                // Update the property variables
                if (!property) {
                    return next(new throwjs.notFound());
                } else {
                    property.title = req.body.title;
                    property.type = req.body.type;
                    property.address = req.body.address;
                    property.city = req.body.city;
                    property.value = req.body.value;
                    property.totalRentPaid = req.body.totalRentPaid;
                    property.monthsPaid = req.body.monthsPaid;
                    property.rentPayment = req.body.rentPayment;
                    property.returnOnInvestment = req.body.returnOnInvestment;
                    property.dateLastPaid = req.body.dateLastPaid;

                    // TODO - Set the tenant and image
                    property.tenant = null;
                    property.image = null;
                }

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

    // Delete the current property
    .delete(function (req, res, next) {
        if (!req.auth || req.auth._id !== req.params['userid'] ) {
            return next(new throwjs.unauthorized());
        }

        User.findById(req.auth._id, function (err, user) {
            if(!user) {

            } else {

                // Find the property by id
                var property = user.properties.id(req.params['propertyid']);


                // Remove the property
                if (!property) {
                    next(new throwjs.notFound());
                } else {
                    property.remove();

                    // Save the changes to the user document
                    user.save(function (err, savedUser) {
                        if (err) {
                            return (next(err));
                        }
                        return res.status(200).send();
                    });
                }
            }
        });

    });

module.exports = router;