var throwjs = require('throw.js');
var express = require('express');
var router = express.Router();
var User = require('./../../models/user');
var Tenant = require('./../../models/tenant');
var _ = require('lodash');

// verify API requests using JWT middleware
router.use(require('./../../jwtCheck'));

router.route('/users/:userid/properties/:propertyid/leases/:leaseid/tenants')

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
                        return res.status(200).json(lease.tenants);
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
                        var tenant = new Tenant();

                        tenant.firstName = req.body.firstName;
                        tenant.lastName = req.body.lastName;
                        tenant.phoneNumber = req.body.phoneNumber;
                        tenant.email = req.body.email;
                        tenant.image = req.body.image;

                        lease.tenants.push(tenant);

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



router.route('/users/:userid/properties/:propertyid/leases/:leaseid/tenants/:tenantid')

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
                        var tenant = _.find(lease.tenants, function (item) {
                            return item.id == req.params['tenantid'];
                        });

                        if(tenant) {
                            return res.status(200).json(tenant);
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
                        var tenant = _.find(lease.tenants, function (item) {
                            return item.id == req.params['tenantid'];
                        });

                        if(tenant) {

                            tenant.firstName = req.body.firstName;
                            tenant.lastName = req.body.lastName;
                            tenant.phoneNumber = req.body.phoneNumber;
                            tenant.email = req.body.email;
                            tenant.image = req.body.image;

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
                        var tenant = _.find(lease.tenants, function (item) {
                            return item.id == req.params['tenantid'];
                        });

                        if(tenant) {

                            tenant.remove();

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