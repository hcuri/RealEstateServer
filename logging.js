var fs          = require('fs');
var morgan      = require('morgan');
var FileStreamRotator = require('file-stream-rotator');

var logDirectory = __dirname + '/log';

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/access-%DATE%.log',
    date_format: 'YYYY-MM-DD',
    frequency: 'daily',
    verbose: false
});

// setup the logger
var logger = morgan('combined', {stream: accessLogStream});

module.exports = logger;