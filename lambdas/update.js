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
const testData = require('../test-data/update.json');
console.log(testData);

let updateMovies = `UPDATE ${table} SET TITLE = '${testData.title}', YEAR = ${testData.year}, GENRE = '${testData.genre}' WHERE ID = ${testData.id};`;


module.exports.update = (event, context, callback) => {
  Client.connect() //connect to database
    .then(client => {
      console.log('connected to DB ' + Client.options.database + ' ready to UPDATE')
      client.release();
      return client.query(updateMovies);
    })
    .then(res => {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: {
          message: res,
          //input: event,
        }
      }
      callback(null, response);
    })
    .catch(err => {
      console.log(err.stack);
      const response = {
        statusCode: 500,
        body: {
          message: err.stack,
          //input: event,
        }
      }
      callback(null, response);
    })
};
