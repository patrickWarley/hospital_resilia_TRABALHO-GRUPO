// importar express
var express = require('express');

// importar mysql
const mysql = require('mysql');

// importar o handlebars
const exphbs = require('express-handlebars');

// variável para definir o express
var app  = express();
var port = 3000

// configuração handlebars

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


//rotas 

//rota raiz
app.get('/', (req, res) => {
  res.render('home', { layout: false })
});

//express url
app.use(
  express.urlencoded({
      extended: true
}) 
)

//rota para inserir dados
app.post('/paci/insertpaci', (req, res) => {
  const nome = req.body.nome
  const cpf = req.body.cpf
  const idade = req.body.idade
  const endereco = req.body.endereco 

  const sql = `INSERT INTO pacientes (nome, cpf, idade, endereco) VALUES ('${nome}', '${cpf}', '${idade}', '${endereco}')`

  conn.query(sql, function(err){
      if (err){
          console.log(err)
      }

      res.redirect('/')
  })
})
//rota de consulta geral
app.get('/paci', (req, res) => {
  const sql = 'SELECT * FROM pacientes'

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }
  
      const listar = data
      
      console.log(listar)

      res.render('pacientes', { layout: false, listar })

  })
})

// consulta um registo pelo id (paci.handlebars)
app.get('/paci/:id', (req, res) => {
  const id = req.params.id
  
  const sql = `SELECT * FROM pacientes WHERE id = ${id}`

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }

      const listar = data
      res.render('pacientes', {  layout: false, listar } )

  })
})

//rota do buscar
app.get('/busca', (req, res) => {
  res.render('busca', { layout: false })
})
//rota busc para exibir o resultado do buscar
app.post('/busc/', (req, res) => {
  const id = req.body.id
  const sql = `SELECT * FROM pacientes WHERE id = ${id}`

  conn.query(sql, function(err, data){
     if(err){
     console.log(err)
      return
    }
     const listar = data
     res.render('pacientes', {  layout: false, listar } )
     })
    })
    //pegando para editar registro
app.get('/paci/edit/:id', (req, res) => {
    
  const id = req.params.id

  const sql = `SELECT * FROM pacientes where id = ${id}`

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }

      const paci = data[0]
      res.render('edit', { layout: false, paci  } )

  })
})

//rota de edicao do registro com post
app.post('/paci/updatepacientes', (req, res) => {
    const {id,nome,cpf,idade,endereco} = req.body

    const sql = `UPDATE pacientes SET nome = '${nome}', cpf = '${cpf}' , idade = '${idade}', endereco = '${endereco}' WHERE id = '${id}'` 

    conn.query(sql, function(err) {
        if(err){
            console.log(err)
            return
        }

        res.redirect(`/paci/${id}`)
    })

})

  //rota para deletar um registro
app.get('/paci/remove/:id', (req, res) => {
  const id = req.params.id

  const sql = `DELETE FROM pacientes WHERE id = '${id}'`

  conn.query(sql, function(err){
      if(err){
          console.log(err)
          return
      }

      res.redirect('/paci')
  })
})
// conexao banco de dados
const conn = mysql.createConnection({
  host: 'localhost',    
  port: '3307', //porta servidor xampp
  user:'root',
  password: '',
  database: 'projetofnl' //nome do banco de dados criado no mysql
}
);

//verificar se o banco de dados apresentou erro
conn.connect(function(err) {
  if(err){
      console.log(err)
  }

  console.log('Conectado com sucesso!')
 
});

//configurar o servidor

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})

//instalar my-sql - npm install mysql
//nome do banco projetofnl
//tabela: produto(nome, cpf, idade, endereco)



