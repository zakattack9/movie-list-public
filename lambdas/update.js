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

/*const testData = require('../test-data/update.json');
console.log(testData);*/



module.exports.update = (event, context, callback) => {
  console.log("event", event.body)
  let parseBody = JSON.parse(event.body)
  let {id, title, year, genre} = parseBody;
  console.log('yeaer', year)

  let updateMovies = `UPDATE ${config.table} SET TITLE = '$1', YEAR = $2, GENRE = '$3' WHERE ID = $4;`;

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
