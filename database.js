const mysql = require('mysql2');


module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 'dbpass',
    database: 'dino'
});