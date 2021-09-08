const mysql = require('mysql');
const util = require('util');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

const query = util.promisify(connection.query).bind(connection);

module.exports = {
  query,
};
