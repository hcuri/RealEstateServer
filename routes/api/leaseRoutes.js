var throwjs = require('throw.js');
var express = require('express');
var router = express.Router();
var User = require('./../../models/user');
var Lease = require('./../../models/lease');
var _ = require('lodash');

// verify API requests using JWT middleware
router.use(require('./../../jwtCheck'));

router.route('/users/:userid/properties/:propertyid/leases')

    // Get all of the current property's leases
    .get(function (req, res, next) {
        if (!req.auth || req.auth._id !== req.params['userid'] ) {
            return next(new throwjs.unauthorized());
        }

        User.findById(req.auth._id, function (err, user) {
            if(!user) {
                return next(new throwjs.notFound());
            } else {

                var property = _.find(user.properties, function(item) {
                    return item.id == req.params['propertyid'];
                });

                if(property) {
                    return res.status(200).json(property.leases);
                } else {
                    return next(new throwjs.notFound());
                }
            }
        });
    })

    // Add a new property lease
    .post(function (req, res, next) {

        if (!req.auth || req.auth._id !== req.params['userid'] ) {
            return next(new throwjs.unauthorized());
        }

        User.findById(req.auth._id, function (err, user) {
            if(!user) {
                return next(new throwjs.notFound());
            } else {

                var property = _.find(user.properties, function(item) {
                    return item.id == req.params['propertyid'];
                });

                if(property) {

                    var lease = new Lease();

                    lease.numberOfTerms = req.body.numberOfTerms;
                    lease.termPeriod = req.body.termPeriod;
                    lease.rentAmount = req.body.rentAmount;
                    lease.rentDueDate = req.body.rentDueDate;
                    lease.startDate = req.body.startDate;
                    lease.endDate = req.body.endDate;

                    property.leases.push(lease);

                    user.save(function (err, savedUser) {
                        if (err) {
                            return (next(err));
                        }
                        return res.status(200).send();
                    });

                } else {
                    return next(new throwjs.notFound());
                }
            }
        });
    });
;



router.route('/users/:userid/properties/:propertyid/leases/:leaseid')

    // Get the current expense
    .get(function (req, res, next) {
        if (!req.auth || req.auth._id !== req.params['userid']) {
            return next(new throwjs.unauthorized());
        }

        User.findById(req.auth._id, function (err, user) {
            if (!user) {
                return next(new throwjs.notFound());
            } else {

                var property = _.find(user.properties, function (item) {
                    return item.id == req.params['propertyid'];
                });

                if (property) {
                    var lease = _.find(property.leases, function (item) {
                        return item.id == req.params['leaseid'];
                    });

                    if (lease) {
                        return res.status(200).json(lease);
                    } else {
                        return next(new throwjs.notFound());
                    }
                } else {
                    return next(new throwjs.notFound());
                }
            }
        });
    })

    // Update the current expense
    .put(function (req, res, next) {
        if (!req.auth || req.auth._id !== req.params['userid']) {
            return next(new throwjs.unauthorized());
        }

        User.findById(req.auth._id, function (err, user) {
            if (!user) {
                return next(new throwjs.notFound());
            } else {

                var property = _.find(user.properties, function (item) {
                    return item.id == req.params['propertyid'];
                });

                if (property) {
                    var lease = _.find(property.leases, function (item) {
                        return item.id == req.params['leaseid'];
                    });

                    if (lease) {

                        lease.numberOfTerms = req.body.numberOfTerms;
                        lease.termPeriod = req.body.termPeriod;
                        lease.rentAmount = req.body.rentAmount;
                        lease.rentDueDate = req.body.rentDueDate;
                        lease.startDate = req.body.startDate;
                        lease.endDate = req.body.endDate;

                        // Save the changes to the user document
                        user.save(function (err, savedUser) {
                            if (err) {
                                return (next(err));
                            }
                            return res.status(200).send();
                        });
                    } else {
                        return next(new throwjs.notFound());
                    }
                } else {
                    return next(new throwjs.notFound());
                }
            }
        });
    })

    // Delete the current property
    .delete(function (req, res, next) {
        if (!req.auth || req.auth._id !== req.params['userid'] ) {
            return next(new throwjs.unauthorized());
        }

        User.findById(req.auth._id, function (err, user) {
            if (!user) {
                return next(new throwjs.notFound());
            } else {

                var property = _.find(user.properties, function (item) {
                    return item.id == req.params['propertyid'];
                });

                if (property) {
                    var lease = _.find(property.leases, function (item) {
                        return item.id == req.params['leaseid'];
                    });

                    if (lease) {

                        lease.remove();

                        // Save the changes to the user document
                        user.save(function (err, savedUser) {
                            if (err) {
                                return (next(err));
                            }
                            return res.status(200).send();
                        });
                    } else {
                        return next(new throwjs.notFound());
                    }
                } else {
                    return next(new throwjs.notFound());
                }
            }
        });
    });

module.exports = router;