const express = require ('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')
const app = express()
var port = 3000
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//rota raiz
app.get('/', function(req,res){
    res.render('home', { layout: false })
  })

  app.use(
    express.urlencoded({
      extended: true     
    }) 
)

//rota para inserir dados (home.handlebars)
app.post('/und/insertund', (req, res) => {
    const cnpj = req.body.cnpj
    const nome = req.body.nome
    const endereco = req.body.endereco
    const telefone = req.body.telefone
    
    const sql = `INSERT INTO unidades (cnpj, nome, endereco, telefone) VALUES ('${cnpj}', '${nome}', '${endereco}', '${telefone}')`
    
    conn.query(sql, function(err){
      if (err){
        console.log(err)
      }
    
      res.redirect('/')
      })
})

//rota de consulta geral
app.get('/und', (req, res) => {
    const sql = 'SELECT * FROM unidades order by nome'
  
  
    conn.query(sql, function(err, data){
      if(err){
        console.log(err)
          return
      }
   
      const listar = data
       
      console.log(listar)
  
    res.render('und', { layout: false, listar })
  
    })
  })

  // consulta um registo pelo id (produto.handlebars)
app.get('/und/:cnpj', (req, res) => {
  const cnpj = req.params.cnpj
  
  const sql = `SELECT * FROM unidades WHERE cnpj = ${cnpj}`

  conn.query(sql, function(err, data){
    if(err){
      console.log(err)
        return
      }

    const listarund = data[0]
    res.render('unidades', {  layout: false, listarund } )

  })
})


//rota busc para exibir o resultado do buscar
app.post('/busc/', (req, res) => {
  const cnpj = req.body.cnpj
  const sql = `SELECT * FROM unidades WHERE cnpj = ${cnpj}`

  conn.query(sql, function(err, data){
     if(err){
     console.log(err)
      return
    }
     const listarund = data[0]
     res.render('unidades', {  layout: false, listarund } )
     })
    })

  //rota do buscar
app.get('/busca', (req, res) => {
    res.render('busca', { layout: false })
  })

  //rota para pegar dados para editar registro
app.get('/und/edit/:cnpj', (req, res) => {
    
    const cnpj = req.params.cnpj
  
    const sql = `SELECT * FROM unidades where cnpj = ${cnpj}`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const und = data[0]
        res.render('edit', { layout: false, und } )
  
    })
  })

  //rota de edicao do registro com post
app.post('/und/updateund', (req, res) => {

    const cnpj = req.body.cnpj
    const nome = req.body.nome
    const endereco = req.body.endereco
    const telefone = req.body.telefone
    
    const sql = `UPDATE unidades SET nome = '${nome}', endereco = '${endereco}', telefone = '${telefone}' WHERE cnpj = '${cnpj}'` 
  
    conn.query(sql, function(err) {
        if(err){
            console.log(err)
            return
        }
  
        res.redirect('/und')
    })
  
  })

//rota para deletar um registro
app.get('/und/remove/:cnpj', (req, res) => {
    const cnpj = req.params.cnpj
  
    const sql = `DELETE FROM unidades WHERE cnpj = '${cnpj}'`
  
    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
  
        res.redirect('/und')
    })
  })















const conn = mysql.createConnection({
    host: 'localhost',    
    port: '3307',
    user:'root',
    password: '',
    database: 'projeto5'
    })
    
    conn.connect(function(err) {
      if(err){
        console.log(err)
    }
    
    console.log('Conectado com sucesso!')
  })



app.listen(port, () => {
    console.log('App rodando na porta ${port}');
})