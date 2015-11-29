var express = require('express');
var router = express.Router();
var User = require('./models/user');
var Tenant = require('./models/tenant');
var Property = require('./models/property');

// verify API requests using JWT middleware
router.use(require('./jwtCheck'));


// Route to check if the user is authenticated
router.get('/', function (req, res) {
    res.json({message: 'YOU ARE AUTHENTICATED!'});
});

// Current user
router.get('/users/:userid', function (req, res, next) {
    if (!req.auth) {
        return res.status(401).send();
    } else if (req.auth._id !== req.params['userid']) {
        return res.status(401).send();
    }


    User.findOne({_id: {$in: [req.auth._id]}}, function (err, user) {
        if (err) {
            return next(err);
        }
        res.status(200).json(user);
    });
});


router.route('/users/:userid/properties')

    // Get all of the current user's properties
    .get(function (req, res) {
        if (!req.auth) {
            return res.status(401).send();
        } else if (req.auth._id !== req.params['userid']) {
            return res.status(401).send();
        }

        User.findOne({_id: {$in: [req.auth._id]}}, function (err, user) {
            if (err) {
                return next(err);
            }
            res.status(200).json(user.properties);
        });
    })

    // Add a new property
    .post(function (req, res, next) {

        // TODO - set these values from the BODY values
        var property = new Property();
        property.title = "";
        property.type = "Apartment";
        property.address = "5600 SMU Blvd"
        property.city = "Dallas";
        property.value = "100000";
        property.totalRentPaid = 0;
        property.monthsPaid = 0;
        property.rentPayment = 1280.00;
        property.returnOnInvestment = 0.00;
        property.tenant = null;
        property.image = null;
        property.dateLastPaid = null;

        if (!req.auth) {
            return res.status(401).send();
        } else if (req.auth._id !== req.params['userid']) {
            return res.status(401).send();
        }

        User.findOne({_id: {$in: [req.auth._id]}}, function (err, user) {
            if (err) {
                return next(err);
            }

            user.properties.push(property);

            user.save(function (err, savedUser) {
                if (err) {
                    return (next(err));
                }
                res.status(200).send();
            });
        });

    });

router.route('/users/:userid/properties/:propertyid')

    // Get the current property
    .get(function (req, res) {
        if (!req.auth) {
            return res.status(401).send();
        } else if (req.auth._id !== req.params['userid']) {
            return res.status(401).send();
        }

        User.findOne({_id: {$in: [req.auth._id]}}, function (err, user) {
            if (err) {
                return next(err);
            }

            // Find the specified property
            var property = user.properties.id(req.params['propertyid']);

            if(property) {
                res.status(200).json();
            } else {
                res.status(404).send();
            }
        });
    })

    // Update the current property
    .put(function (req, res) {
        if (!req.auth) {
            // Check the authentication
            return res.status(401).send();
        } else if (req.auth._id !== req.params['userid']) {
            // Check the the userid provided is the same as the current token for the user
            return res.status(401).send();
        }

        // Find the current user
        User.findOne({_id: {$in: [req.auth._id]}}, function (err, user) {
            if (err) {
                return next(err);
            }

            // Find the property by id
            var property = user.properties.id(req.params['propertyid']);

            // Update the property variables
            if(property) {

                // TODO - set these values from the BODY values
                property.title = "SpaceX HQ";
                property.type = "Facility";
                property.address = "1 Rocket Rd"
                property.city = "Hawthorne";
                property.value = "9999999";
                property.totalRentPaid = 0;
                property.monthsPaid = 0;
                property.rentPayment = 85000.00;
                property.returnOnInvestment = 0.00;
                property.tenant = null;
                property.image = null;
                property.dateLastPaid = null;

            } else {
                return res.status(404).send();
            }

            // Save the changes to the user document
            user.save(function (err, savedUser) {
                if (err) {
                    return (next(err));
                }
                res.status(200).send();
            });
        });

    })

    // Delete the current property
    .delete(function (req, res) {


        if (!req.auth) {
            // Check the authentication
            return res.status(401).send();
        } else if (req.auth._id !== req.params['userid']) {
            // Check the the userid provided is the same as the current token for the user
            return res.status(401).send();
        }

        // Find the current user
        User.findOne({_id: {$in: [req.auth._id]}}, function (err, user) {
            if (err) {
                return next(err);
            }

            // Find the property by id
            var property = user.properties.id(req.params['propertyid']);


            // Remove the property
            if(property) {
                property.remove();
            } else {
                return res.status(404).send();
            }

            // Save the changes to the user document
            user.save(function (err, savedUser) {
                if (err) {
                    return (next(err));
                }
                res.status(200).send();
            });
        });

    });


module.exports = router;