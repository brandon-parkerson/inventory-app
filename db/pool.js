const { Pool } = require("pg");

module.exports = new Pool({
    connectionString: "postgresql://postgres:VZmeunFWKTziJdJMsaexvCqfxpNjaDFZ@yamabiko.proxy.rlwy.net:30980/railway"
  });