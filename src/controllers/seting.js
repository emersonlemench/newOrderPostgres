const set ={

index: (req,res)=>{
  res.render('set')
},
enviar: (req,res)=>{
  
  let nuevo = req.body.numero;

  const {Client} = require('pg')

  const client = new Client({
    host:'db.cbohscidegiybbfhzyeu.supabase.co',
    database:'postgres',
    port:5432,
    user:'postgres',
    password: 'SdEiY4ornVUmJOPY'
  });

  client.connect(console.log('Conectado a Postgres'));

  client.query(`insert into ordenes (orden)
      values(${nuevo - 1})`)


res.redirect('/')
}
}

module.exports = set;