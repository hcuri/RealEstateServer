var app = require('./app');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    } else if (req.body && req.body.token) {
        return req.body.token;
    } else if (req.headers['x-access-token']) {
        return req.headers['x-access-token'];
    }
}
// Performs a check on the JSON Web Token information to authenticate each request
module.exports = function jwtCheck(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = getToken(req);

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {

                // if everything is good, save to request for use in other routes
                if(decoded._doc) {
                    req.auth = decoded._doc;
                } else {
                    req.auth = decoded;
                }
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
};