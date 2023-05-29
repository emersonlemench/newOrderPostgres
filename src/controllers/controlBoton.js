const controlBoton = {
  index: (req, res) => {
    res.render('index');
  },
  orden: (req, res) => {
    res.render('orden');
  },
  generate: (req, res) => {
    const { Client } = require('pg');

    const client = new Client({
      host: 'db.cbohscidegiybbfhzyeu.supabase.co',
      database: 'postgres',
      port: 5432,
      user: 'postgres',
      password: 'SdEiY4ornVUmJOPY'
    });

    client.connect((err) => {
      if (err) {
        console.error('Error al conectar a Postgres', err);
        return;
      }

      console.log('Conectado a Postgres');

      let numeroPlusOne;
      let ultimoInt;

      client.query('SELECT orden FROM ordenes', (error, respuestas) => {
        if (error) {
          console.error('Error al ejecutar la consulta', error);
          client.end();
          return;
        }

        ultimoString = respuestas.rows.pop().orden;
        ultimoInt = JSON.parse(ultimoString);
        numeroPlusOne = ultimoInt + 1;

        client.query(`INSERT INTO ordenes (orden) VALUES (${numeroPlusOne})`, (error) => {
          if (error) {
            console.error('Error al insertar la orden', error);
          }

          console.log(numeroPlusOne);
          client.end();

          res.render('orden', { ultimoInt, numeroPlusOne });
        });
      });
    });
  }
};

module.exports = controlBoton;
