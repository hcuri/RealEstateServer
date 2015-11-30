
module.exports = function errorHandler(err, req, res, next) {

    // Remove the stack trace in production environments
    if (req.app.get('env') !== 'development') {
        delete err.stack;
    }

    err.success = false;

    return res.status(err.statusCode || 500).json(err);
};