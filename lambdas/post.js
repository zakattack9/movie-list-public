'use strict';
//https://medium.com/dailyjs/how-to-build-a-node-js-api-using-postgres-lambda-and-api-gateway-3211a4570cea

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
//const testData = require('../test-data/post.json');
//console.log(testData);

//console.log(addMovies)

module.exports.post = (event, context, callback) => {
  console.log("event", event);
  let parseBody = JSON.parse(event.body);
  let {title, year, genre} = parseBody;
  console.log('yeaer', year)

  let addMovies = "INSERT INTO " + config.table + " VALUES(default, $1, $2, $3)"
  console.log("Event", event); //event.body
  Client.connect() //connect to database
    .then(client => {
      console.log('connected to DB ' + Client.options.database + ' ready to POST')
      client.release();
      return client.query(addMovies, [title, year, genre]);
    })
    .then(res => {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(res)
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
