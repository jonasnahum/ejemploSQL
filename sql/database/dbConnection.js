var config = require('./db-config');
module.exports = require('mysql').createConnection(config);
