const mysql = require('mysql2');
const conf = require('../conf');

module.exports = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.database
});