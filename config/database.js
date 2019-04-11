// config/database.js
require("dotenv").config();

module.exports = {
    'connection': {
        'host': process.env.MYSQL_HOST,
        'user': process.env.MYSQL_USER,
        'password': process.env.MYSQL_PW,
        'database': process.env.MYSQL_DBNAME
    },
}