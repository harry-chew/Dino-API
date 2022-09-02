const mysql = require('mysql2');


module.exports = mysql.createConnection({
    host: '****',
    user: '****',
    password: '****',
    database: '****'
});
