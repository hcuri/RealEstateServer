var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User = require('./app/models/user');
var bcrypt = require('bcrypt');
var app = require('./server');

router.post('/register', function(req, res, next) {
    var user = new User();
    user.email = req.body.email;
    user.properties = [] ;

    User.findOne({email: user.email}, function (err, dbUser) {
        if (err) {
            return next(err);
        }

        if(dbUser) {
            // Account already exists for email
            return res.status(422).send('Account already exists').send();
        }

        // Can create
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            user.password = hash;

            console.log(user);

            user.save(function(err,savedUser) {
                if(err) { return(next(err)); }
                res.status(200).send();
            });
        });
    });
});

router.post('/login', function(req, res, next) {

    User.findOne({email: req.body.email})
        .select('password').select('email')
        .exec(function (err, user) {
            if (err) { return next(err); }
            if (!user) { return res.status(401).send(); }

            // Verify the password using bcrypt
            bcrypt.compare(req.body.password,
                user.password, function (err, valid) {
                    if (err) { return next(err); }
                    if (!valid) { return res.status(401).send(); }

                    // Create a token - valid for 24 hours
                    var token = jwt.sign(user, app.get('jwtSecret'), {
                        expiresIn: '24h'
                    });

                    // Send the token back to the user
                    var result = {
                        token: token,
                        email: req.body.email,
                        id: user._id
                    };

                    res.status(200).json(result);
                });
        });
});

router.post('/resetPassword', function(req, res, next) {
    // TODO - sent link to reset password
    res.status(200).send();
});

router.post('/resetPasswordFinal', function(req, res, next) {
    // TODO - called when a user sets a new password after resetting
    res.status(200).send();
});


module.exports = router