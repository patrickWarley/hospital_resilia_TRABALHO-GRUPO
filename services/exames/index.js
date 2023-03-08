const express = require("express");
const mysql = require("mysql");
//aqui eu uso router para criar um modulo que vai lidat exclusivamente com as unidades
const router = express.Router();

const conn = mysql.createConnection({
  host: "localhost",
  port: "3307",
  user: "root",
  password: "",
  database: "hospital_resilia",
});

conn.connect(function (err) {
  if (err) {
    console.log(err);
  }

  console.log("Conectado com sucesso!");
});

//rota raiz
router.get('/', function (req, res) {
  res.render('exames/home', { layout: false })
})

//rota para inserir dados (home.handlebars)
router.post('/ex/insertex', (req, res) => {

  const { cpf, nome_paciente, descricao, crm } = req.body;

  const sql = `INSERT INTO exames (cpf, nome_paciente, descricao, crm) VALUES ('${cpf}', '${nome_paciente}', '${descricao}', '${crm}')`

  conn.query(sql, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/exames/')
  })
})

//rota de consulta geral
router.get('/ex', (req, res) => {
  const sql = 'SELECT * FROM exames order by nome_paciente'


  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err)
      return
    }

    const listar = data

    res.render('exames/ex', { layout: false, listar })

  })
})

//rota busc para exibir o resultado do buscar
router.post('/busc/', (req, res) => {
  const cpf = req.body.cpf
  const sql = `SELECT * FROM exames WHERE cpf = ${cpf}`

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    const listarex = data[0]
    res.render('exames/exames', { layout: false, listarex })
  })
})

//rota do buscar
router.get('/busca', (req, res) => {
  res.render('exames/busca', { layout: false })
})

//rota de edicao do registro com post
router.post('/ex/updateex', (req, res) => {

  const cpf = req.body.cpf
  const nome_paciente = req.body.nome_paciente
  const descricao = req.body.descricao
  const crm = req.body.crm

  const sql = `UPDATE exames SET nome_paciente = '${nome_paciente}', descricao = '${descricao}', crm = '${crm}' WHERE cpf = '${cpf}'`

  conn.query(sql, function (err) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/exames/')
  })

})


//rota para pegar dados para editar registro
router.get('/ex/edit/:cpf', (req, res) => {

  const cpf = req.params.cpf

  const sql = `SELECT * FROM exames where cpf = ${cpf}`

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err)
      return
    }

    const ex = data[0]
    res.render('exames/edit', { layout: false, ex })

  })
})


//rota para deletar um registro
router.get('/ex/remove/:cpf', (req, res) => {
  const cpf = req.params.cpf

  const sql = `DELETE FROM exames WHERE cpf = '${cpf}'`

  conn.query(sql, function (err) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/exames/')
  })
});


// consulta um registo pelo cpf (exames.handlebars)
router.get('/ex/:cpf', (req, res) => {
  const cpf = req.params.cpf

  const sql = `SELECT * FROM exames WHERE cpf = ${cpf}`

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err)
      return
    }

    const listarex = data[0]
    res.render('exames/exames', { layout: false, listarex })

  })
})


module.exports = router;