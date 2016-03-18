var throwjs = require('throw.js');
var express = require('express');
var router = express.Router();
var User = require('./../../models/user');
var Expense = require('./../../models/expense');
var _ = require('lodash');

// verify API requests using JWT middleware
router.use(require('./../../jwtCheck'));

router.route('/users/:userid/properties/:propertyid/expenses')

    // Get all of the current property's expenses
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
                    return res.status(200).json(property.expenses);
                } else {
                    return next(new throwjs.notFound());
                }
            }
        });
    })

    // Add a new property expense
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

                    var expense = new Expense();
                    expense.amount = req.body.amount;
                    expense.description = req.body.description;
                    expense.date = req.body.date;

                    property.expenses.push(expense);

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



router.route('/users/:userid/properties/:propertyid/expenses/:expenseid')

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
                    var expense = _.find(property.expenses, function (item) {
                        return item.id == req.params['expenseid'];
                    });

                    if (expense) {
                        return res.status(200).json(expense);
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
                    var expense = _.find(property.expenses, function (item) {
                        return item.id == req.params['expenseid'];
                    });

                    if (expense) {

                        expense.amount = req.body.amount;
                        expense.description = req.body.description;
                        expense.date = req.body.date;

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
                    var expense = _.find(property.expenses, function (item) {
                        return item.id == req.params['expenseid'];
                    });

                    if (expense) {

                        expense.remove();

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