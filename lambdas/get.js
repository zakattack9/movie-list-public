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
})

let grabMovies = "SELECT * FROM " + table + " ORDER BY id ASC";

module.exports.get = (event, context, callback) => {

  Client.connect() //connect to database
  .then(client => {
    console.log('connected to DB ' + Client.options.database)
    client.release()
    return client.query(grabMovies)
  })
/*  .then(result => {

  })*/

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
