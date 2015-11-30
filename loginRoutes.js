var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User = require('./models/user');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var config = require('./config');
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

router.post('/forgot', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    return res.status(404).send();
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var transporter = nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: config.sendGridUsername,
                    pass: config.sendGridPassword
                }
            });

            var resetLink = 'http://' + req.headers.host + '/reset/' + token;

            var mailOptions = {
                to: user.email,
                from: 'passwordreset@MyRealEstate.com',
                subject: 'MyRealEstate Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                resetLink + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transporter.sendMail(mailOptions, function(err) {
                res.status(200).send();
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.status(501).send();
    });
});

router.post('/reset/:token', function(req, res, next) {
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {

                if (!user) {
                    return res.status(404).send();
                }

                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                // Can create
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    user.password = hash;

                    user.save(function(err) {
                        done(err, user);
                    });
                });
            });
        },
        function(user, done) {
            var transporter = nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: config.sendGridUsername,
                    pass: config.sendGridPassword
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@MyRealEstate.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            transporter.sendMail(mailOptions, function(err) {
                res.status(200).send();
                done(err);
            });
        }
    ], function(err) {
        res.status(501).send();
    });
});


module.exports = router;