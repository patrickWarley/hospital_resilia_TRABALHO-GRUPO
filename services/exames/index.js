const express = require ('express')
const exphbs = require('express-handlebars')
const { copyFile } = require('fs')
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
app.post('/ex/insertex', (req, res) => {
    const cpf = req.body.cpf
    const nome_paciente = req.body.nome_paciente
    const descricao = req.body.descricao
    const crm = req.body.crm
    
    const sql = `INSERT INTO exames (cpf, nome_paciente, descricao, crm) VALUES ('${cpf}', '${nome_paciente}', '${descricao}', '${crm}')`
    
    conn.query(sql, function(err){
      if (err){
        console.log(err)
      }
    
      res.redirect('/')
      })
})

//rota de consulta geral
app.get('/ex', (req, res) => {
    const sql = 'SELECT * FROM exames order by nome_paciente'
  
  
    conn.query(sql, function(err, data){
      if(err){
        console.log(err)
          return
      }
   
      const listar = data
       
      console.log(listar) 
  
    res.render('ex', { layout: false, listar })
  
    })
  })

    // consulta um registo pelo cpf (exames.handlebars)
app.get('/ex/:cpf', (req, res) => {
    const cpf = req.params.cpf
    
    const sql = `SELECT * FROM exames WHERE cpf = ${cpf}`
  
    conn.query(sql, function(err, data){
      if(err){
        console.log(err)
          return
        }
  
      const listarex = data[0]
      res.render('exames', {  layout: false, listarex } )
  
    })
  })

  //rota busc para exibir o resultado do buscar
app.post('/busc/', (req, res) => {
    const cpf = req.body.cpf
    const sql = `SELECT * FROM exames WHERE cpf = ${cpf}`
  
    conn.query(sql, function(err, data){
       if(err){
       console.log(err)
        return
      }
       const listarex = data[0]
       res.render('exames', {  layout: false, listarex } )
       })
})

//rota do buscar
app.get('/busca', (req, res) => {
    res.render('busca', { layout: false })
  })

  //rota para pegar dados para editar registro
app.get('/ex/edit/:cpf', (req, res) => {
    
    const cpf = req.params.cpf
  
    const sql = `SELECT * FROM exames where cpf = ${cpf}`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const ex = data[0]
        res.render('edit', { layout: false, ex } )
  
    })
  })

  //rota de edicao do registro com post
app.post('/ex/updateex', (req, res) => {

    const cpf = req.body.cpf
    const nome_paciente = req.body.nome_paciente
    const descricao = req.body.descricao
    const crm = req.body.crm
    
    const sql = `UPDATE exames SET nome_paciente = '${nome_paciente}', descricao = '${descricao}', crm = '${crm}' WHERE cpf = '${cpf}'` 
  
    conn.query(sql, function(err) {
        if(err){
            console.log(err)
            return
        }
  
        res.redirect('/ex')
    })
  
  })

  //rota para deletar um registro
app.get('/ex/remove/:cpf', (req, res) => {
    const cpf = req.params.cpf
  
    const sql = `DELETE FROM exames WHERE cpf = '${cpf}'`
  
    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
  
        res.redirect('/ex')
    })
  })










const conn = mysql.createConnection({
    host: 'localhost',    
    port: '3307',
    user:'root',
    password: '',
    database: 'projeto_exames'
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