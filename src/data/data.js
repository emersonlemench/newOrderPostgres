  const {Client} = require('pg')

  const client = new Client({
    host:'db.cbohscidegiybbfhzyeu.supabase.co',
    database:'postgres',
    port:5432,
    user:'postgres',
    password: 'SdEiY4ornVUmJOPY'
  });

  client.connect(console.log('Conectado a Postgres'));


  client.query('select orden from ordenes',(error,respuestas)=>{

    let ultimoString = respuestas.rows.pop().orden

    let ultimoInt = JSON.parse(ultimoString)

    numeroPlusOne = ultimoInt + 1;

    client.end()
    console.log(numeroPlusOne);


  });

