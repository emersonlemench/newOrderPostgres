const { Client } = require("pg");

const client = new Client({
  host: "db.cbohscidegiybbfhzyeu.supabase.co",
  database: "postgres",
  port: 5432,
  user: "postgres",
  password: "SdEiY4ornVUmJOPY",
});

module.exports = client;