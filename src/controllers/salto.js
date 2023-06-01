const cron = require("node-cron");
const client = require('./dataConfig')

const inicioDeMes = async () => {
  try {
    await client.connect();
    console.log('Conexión exitosa a la base de datos');

    const result = await client.query('SELECT orden FROM ordenes');
    let data = 0; // Valor predeterminado para la variable data

    if (result.rows.length > 0) {
      data = result.rows.pop().orden;
    }

    let centena = Math.ceil(data / 100) * 100;
    let dosNum = data.toString().slice(-2);

    if (dosNum === '00') {
      await client.query(`INSERT INTO ordenes (orden) VALUES (${centena + 100 - 1})`);
      console.log('igual a 00');
    } else {
      await client.query(`INSERT INTO ordenes (orden) VALUES (${centena - 1})`);
      console.log('ni parecido');
    }

    console.log('Mes iniciado');
  } catch (error) {
    console.error('Tenemos problemas con salto', error);
  } finally {
    client.end();
  }
};

cron.schedule('0 3 1 * *', () => {
  inicioDeMes();
});

module.exports = inicioDeMes;
