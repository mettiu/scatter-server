const { users } = require('./test-data');

// setup db for testing purposes:
// * remove all collections from db
// * inserts test data into db
// then returns the result of insertion.
const setupUsers = async (connection) => {
  const results = [];
  try {
    // eslint-disable-next-line prefer-const
    for (let coll of await connection.db.listCollections().toArray()) {
      await connection.db.collection(coll.name).drop(); // eslint-disable-line no-await-in-loop
    }
    results.push(await connection.db.collection('users').insertMany(users));
  } catch (err) {
    console.log(err);
  }
  return results;
};

module.exports = {
  setupUsers,
};
