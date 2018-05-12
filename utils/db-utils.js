const { db } = require('../config.js');
const { MongoClient } = require('mongodb');

// Extracts database name from mongodb connection string.
// For example, if connection string is: 'mongodb://localhost:27017/testdb'
// then db name will be 'testdb'.
const getDbName = connectionString =>
  ((connectionString.indexOf('/') === -1)
    ? connectionString
    : getDbName(connectionString.slice(connectionString.indexOf('/') + 1)));

const { connectionString } = db[process.env.NODE_ENV];
const dbName = getDbName(connectionString);
const dbUrl = connectionString.replace(`/${dbName}`, '');

// Connects to db and returns an object literal with client and db objects.
const dbConnect = async () => {
  let mongoClient;
  let dbConn;
  try {
    mongoClient = await MongoClient.connect(dbUrl, {
      useNewUrlParser: true,
    });
    dbConn = mongoClient.db(dbName);
  } catch (err) {
    console.log(err);
  }

  return { client: mongoClient, db: dbConn };
};

const dbCloseConnection = async (connection) => {
  if (connection && connection.client) return connection.client.close();
  return null;
};

module.exports = {
  dbConnect,
  dbCloseConnection,
};
