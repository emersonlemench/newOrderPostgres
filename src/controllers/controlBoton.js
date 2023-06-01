const controlBoton = {
  index: (req, res) => {
    res.render("index");
  },
  orden: (req, res) => {
    res.render("orden");
  },
  generate: async (req, res) => {
    const { Client } = require("pg");

    const client = new Client({
      host: "db.cbohscidegiybbfhzyeu.supabase.co",
      database: "postgres",
      port: 5432,
      user: "postgres",
      password: "SdEiY4ornVUmJOPY",
    });

    try {
      await client.connect();

      console.log("Conectado a Postgres desde GENERATE");

      await client.query("BEGIN");

      const result = await client.query("SELECT MAX(orden) AS max_numero FROM ordenes");

      let numeroPlusOne;
      let ultimoInt;

      const ultimoString = result.rows.pop().max_numero;
      ultimoInt = JSON.parse(ultimoString);
      numeroPlusOne = ultimoInt + 1;

      await client.query(`INSERT INTO ordenes (orden) VALUES (${numeroPlusOne})`);

      await client.query("COMMIT");

      console.log(numeroPlusOne);

      res.render("orden", { ultimoInt, numeroPlusOne });
    } catch (error) {
      console.error("Error al generar el número de orden", error);

      await client.query("ROLLBACK");

      // Manejar el error según sea necesario
    } finally {
      client.end();
    }
  },
};

module.exports = controlBoton;
