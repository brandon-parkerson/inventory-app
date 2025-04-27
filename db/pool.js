const { Pool } = require("pg");

module.exports = new Pool({
    host: "localhost", // or wherever the db is hosted
    user: "bkpkp1996",
    database: "inventory",
    password: "725Bp6758",
    port: 5432 // The default port
  });