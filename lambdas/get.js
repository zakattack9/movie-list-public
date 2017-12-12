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
      console.log(res.rows);
    })
    .catch(err => {
      console.log(err.stack);
    })

  const get = {
    statusCode: 200,
    body: {
      message: "Success!",
      //input: event,
    }
  };

  callback(null, get);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
