module.exports ={
    "development": {
      "username": process.env.MYSQL_USER,
      "password": process.env.MYSQL_PW,
      "database": process.env.MYSQL_DBNAME,
      "host": process.env.MYSQL_HOST,
      "dialect": "mysql"
    },
    "test": {
      "username": process.env.MYSQL_USER,
      "password": process.env.MYSQL_PW,
      "database": process.env.MYSQL_DBNAME,
      "host": process.env.MYSQL_HOST,
      "dialect": "mysql"
    },
    "production": {
      "use_env_variable":"JAWSDB_URL",
      "dialect": "mysql"
    }
  }