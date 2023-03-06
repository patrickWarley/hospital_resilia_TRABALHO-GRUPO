//npm init no terminal para = criar pastas node
//npm i express para = instalar o express
//npm i body-parser = instalar o body-parser para trabalhar com formulário
//npm install --save-dev nodemon = instalar atualização automatica
//npm install express-handlebars = para fazer a página inicial 
//npm install mysql = instalar banco de dados mysql




// importar express
var express = require('express');
//mysql
const mysql = require('mysql')
// importar o handlebars
const exphbs = require('express-handlebars')
// variável para definir o express
var app  = express();
var port = 3000

// configuração handlebars

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


//rotas


//rota raiz
app.get('/', (req, res) => {
  res.render('home', { layout: false })
})

//express url
app.use(
  express.urlencoded({
      extended: true
      
}) 
)
//rota para inserir dados mysql
app.post('/med/insertmed', (req, res) => {
  const id = req.body.id
  const nome = req.body.nome
  const crm = req.body.crm
  const especialidade = req.body.especialidade
  const telefone = req.body.telefone
  const endereco = req.body.endereco

  const sql = `INSERT INTO medico (nome,crm,especialidade,telefone,endereco) VALUES ('${nome}','${crm}', '${especialidade}', '${telefone}', '${endereco}')`

  conn.query(sql, function(err){
      if (err){
          console.log(err)
      }

      res.redirect('/')
  })
})


//rota de consulta geral
app.get('/med', (req, res) => {
  const sql = 'SELECT * FROM medico'

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }
  
      const listar = data
      
      console.log(listar)

      res.render('med', { layout: false, listar })

  })
})

// consulta um registo pelo id (produto.handlebars)
app.get('/med/:id', (req, res) => {
  const id = req.params.id
  
  const sql = `SELECT * FROM medico WHERE id = ${id}`

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }

      const listarMed = data[0]
      res.render('medico', {  layout: false, listarMed } )

  })
})

//rota do buscar
app.get('/busca', (req, res) => {
  res.render('busca', { layout: false })
})
//rota busc para exibir o resultado do buscar
app.post('/busc/', (req, res) => {
  const id = req.body.id
  const sql = `SELECT * FROM medico WHERE id = ${id}`

  conn.query(sql, function(err, data){
     if(err){
     console.log(err)
      return
    }
     const listarMed = data[0]  //amazenar as info
     res.render('medico', {  layout: false, listarMed } )
     })
    })

    //rota para pegar dados para editar registro
app.get('/med/edit/:id', (req, res) => {
    
  const id = req.params.id

  const sql = `SELECT * FROM medico where id = ${id}`

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }

      const med = data[0]
      res.render('edit', { layout: false, med } )

  })
})

//rota de edicao do registro com post
app.post('/med/updatemed', (req, res) => {

  const id = req.body.id
  const crm = req.body.crm
  const nome = req.body.nome
  const especialidade = req.body.especialidade
  const telefone = req.body.telefone
  const endereco = req.body.endereco
  
  const sql = `UPDATE medico SET nome = '${nome}',  crm = '${crm}',especialidade = '${especialidade}', telefone = '${telefone}', endereco = '${endereco}' WHERE id = '${id}'` 

  conn.query(sql, function(err) {
      if(err){
          console.log(err)
          return
      }

      res.redirect('/med')
  })

})

//rota para deletar um registro
app.get('/med/remove/:id', (req, res) => {
  const id = req.params.id

  const sql = `DELETE FROM medico WHERE id = '${id}'`

  conn.query(sql, function(err){
      if(err){
          console.log(err)
          return
      }

      res.redirect('/med')
  })
})


//conexao com banco de dado mysql
var conn = mysql.createConnection({
  host     : 'localhost',   //local do servidor
  port:'3307',  //porta do servidor
  user     : 'root', //nome do usuario
  password : '',
  database : 'medico' //nome do banco de dados
})

//(esse comando executa o sql)
conn.connect(function(err) { 
  if(err){
      console.log(err)
  }

  console.log('Conectado com sucesso!')

  
})

//configurar o servidor

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})
