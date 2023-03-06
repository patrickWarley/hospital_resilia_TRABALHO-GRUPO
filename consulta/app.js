//importa o express
const express = require('express')

// importar o handlebars
const exphbs = require('express-handlebars')

//importar sql
const mysql = require('mysql')

//Variável para definir o express e a porta de execução
var app = express();
var port = 3000

// configuração handlebars

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//rota raiz
app.get('/', function(req,res){
  res.render('home', { layout: false })
})

//express url
app.use(
  express.urlencoded({
    extended: true     
  }) 
)

//rota para inserir dados
app.post('/prod/insertprod', (req, res) => {
  const id_consulta = req.body.id_consulta
  const crm = req.body.crm
  const especialidade = req.body.especialidade
  const cpf_cliente = req.body.cpf_cliente
  const data = req.body.data
  const hora = req.body.hora
  const motivo_procura = req.body.motivo_procura
  const observacao_medico = req.body.observacao_medico

  
  const sql = `INSERT INTO consulta (id_consulta, crm, especialidade, cpf_cliente, data, hora, motivo_procura, observacao_medico) VALUES ('${id_consulta}', '${crm}', '${especialidade}', '${cpf_cliente}', '${data}', '${hora}', '${motivo_procura}', '${observacao_medico}')`
  
  conn.query(sql, function(err){
    if (err){
      console.log(err)
    }
  
    res.redirect('/')
    })
  })

//rota de consulta geral
app.get('/prod', (req, res) => {
  const sql = 'SELECT * FROM consulta'


  conn.query(sql, function(err, data){
    if(err){
      console.log(err)
        return
    }
 
    const listar = data
     
    console.log(listar)

  res.render('prod', { layout: false, listar })

  })
})

// consulta um registo pelo id (produto.handlebars)
app.get('/prod/:id_consulta', (req, res) => {
  const id_consulta = req.params.id_consulta
  
  const sql = `SELECT * FROM consulta WHERE id_consulta = ${id_consulta}`

  conn.query(sql, function(err, data){
    if(err){
      console.log(err)
        return
      }

    const listarProd = data[0]
    res.render('consulta', {  layout: false, listarProd } )

  })
})

//rota do buscar
app.get('/busca', (req, res) => {
  res.render('busca', { layout: false })
})

//rota busc para exibir o resultado do buscar
app.post('/busc/', (req, res) => {
  const id_consulta = req.body.id_consulta //para mudar a busca de id para nome
  const sql = `SELECT * FROM consulta WHERE id_consulta = ${id_consulta}`

  conn.query(sql, function(err, data){
    if(err){
     console.log(err)
      return
    }
    const listarProd = data[0]
     res.render('consulta', {  layout: false, listarProd } )
  })
})

//pegando para editar registro
app.get('/prod/edit/:id_consulta', (req, res) => {
    
  const id_consulta = req.params.id_consulta

  const sql = `SELECT * FROM consulta where id_consulta = ${id_consulta}`

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }

      const prod = data[0]
      res.render('edit', { layout: false, prod } )

  })
})

//rota de edicao do registro com post
app.post('/prod/updateprod', (req, res) => {

  const id_consulta = req.body.id_consulta
  const crm = req.body.crm
  const especialidade = req.body.especialidade
  const cpf_cliente = req.body.cpf_cliente
  const data = req.body.data
  const hora = req.body.hora
  const motivo_procura = req.body.motivo_procura
  const observacao_medico = req.body.observacao_medico
  
  const sql = `UPDATE consulta SET crm = '${crm}', especialidade = '${especialidade}', cpf_cliente = '${cpf_cliente}', data = '${data}', hora = '${hora}', motivo_procura = '${motivo_procura}', observacao_medico = '${observacao_medico}'  WHERE id_consulta = ${id_consulta}` 

  conn.query(sql, function(err) {
      if(err){
          console.log(err)
          return
      }

      res.redirect('/prod')
  })

})

//rota para deletar um registro
app.get('/prod/remove/:id_consulta', (req, res) => {
  const id_consulta = req.params.id_consulta

  const sql = `DELETE FROM consulta WHERE id_consulta = '${id_consulta}'`

  conn.query(sql, function(err){
      if(err){
          console.log(err)
          return
      }

      res.redirect('/prod')
  })
})



// conexao banco de dados
const conn = mysql.createConnection({
  host: 'localhost',    
  port: '3307',
  user:'root',
  password: '',
  database: 'clinica_médica'
  })
  
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

