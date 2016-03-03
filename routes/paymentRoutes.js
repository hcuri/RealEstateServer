var throwjs = require('throw.js');
var express = require('express');
var router = express.Router();
var User = require('./../models/user');
var Payment = require('./../models/payment');
var _ = require('lodash');

// verify API requests using JWT middleware
router.use(require('./../jwtCheck'));

router.route('/users/:userid/properties/:propertyid/leases/:leaseid/payments')

    // Get all of the current payments
    .get(function (req, res, next) {
        if (!req.auth || req.auth._id !== req.params['userid'] ) {
            return next(new throwjs.unauthorized());
        }

        User.findById(req.auth._id, function (err, user) {
            if(!user) {
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
                        return res.status(200).json(lease.payments);
                    } else {
                        return next(new throwjs.notFound());
                    }
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

                var property = _.find(user.properties, function (item) {
                    return item.id == req.params['propertyid'];
                });

                if (property) {
                    var lease = _.find(property.leases, function (item) {
                        return item.id == req.params['leaseid'];
                    });

                    if (lease) {
                        var payment = new Payment();

                        payment.amount = req.body.amount;
                        payment.date = req.body.date;

                        lease.payments.push(payment);

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
;



router.route('/users/:userid/properties/:propertyid/leases/:leaseid/payments/:paymentid')

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
                        var payment = _.find(lease.payments, function (item) {
                            return item.id == req.params['paymentid'];
                        });

                        if(payment) {
                            return res.status(200).json(payment);
                        } else {
                            return next(new throwjs.notFound());
                        }
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
                        var payment = _.find(lease.payments, function (item) {
                            return item.id == req.params['paymentid'];
                        });

                        if(payment) {

                            payment.amount = req.body.amount;
                            payment.date = req.body.date;


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
                        var payment = _.find(lease.payments, function (item) {
                            return item.id == req.params['paymentid'];
                        });

                        if(payment) {

                            payment.remove();

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
                } else {
                    return next(new throwjs.notFound());
                }
            }
        });
    });

module.exports = router;