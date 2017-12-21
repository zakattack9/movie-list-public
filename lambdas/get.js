'use strict';

const Pool = require('pg-pool'); //require in pg-pool packages
const config = require('./config.json');
const {host, database, table, user, password, port, idleTimeoutMillis} = config; //object destructuring
const Client = new Pool ({ //creating template
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis : 1000
});

let grabMovies = "SELECT * FROM " + table + " ORDER BY id ASC;";
// https://node-postgres.com/features/pooling
module.exports.get = (event, context, callback) => {
  Client.connect() //connect to database
    .then(client => {
      console.log('connected to DB ' + Client.options.database + ' ready to GET')
      client.release();
      return client.query(grabMovies);
    })
    .then(res => {
      //console.log(data.rows);
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods" : "*"
        },
        body: JSON.stringify(res.rows)
      }
      callback(null, response);
    })
    .catch(err => {
      console.log(err.stack);
      const response = {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(err.stack)
      }
      callback(null, response);
    })
};
