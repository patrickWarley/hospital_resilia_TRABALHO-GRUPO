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
router.get("/", (req, res) => {
  res.render("pacientes/home", { layout: false });
});

//rota para inserir dados
router.post("/paci/insertpaci", (req, res) => {

  const {nome, cpf, idade, endereco} = req.body;
  const sql = `INSERT INTO pacientes (nome, cpf, idade, endereco) VALUES ('${nome}', '${cpf}', '${idade}', '${endereco}')`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/pacientes");
  });
});

//rota de consulta geral
router.get("/paci", (req, res) => {
  const sql = "SELECT * FROM pacientes";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const listar = data;

    console.log(listar);

    res.render("pacientes/pacientes", { layout: false, listar });
  });
});

//rota do buscar
router.get("/busca", (req, res) => {
  res.render("pacientes/busca", { layout: false });
});

//rota busc para exibir o resultado do buscar
router.post("/busc/", (req, res) => {
  const id = req.body.id;
  const sql = `SELECT * FROM pacientes WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listar = data;
    res.render("pacientes/pacientes", { layout: false, listar });
  });
});

//rota de edicao do registro com post
router.post("/paci/updatepacientes", (req, res) => {
  const { id, nome, cpf, idade, endereco } = req.body;

  const sql = `UPDATE pacientes SET nome = '${nome}', cpf = '${cpf}' , idade = '${idade}', endereco = '${endereco}' WHERE id = '${id}'`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect(`/pacientes/paci/${id}`);
  });
});

//rota para deletar um registro
router.get("/paci/remove/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM pacientes WHERE id = '${id}'`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/pacientes/paci");
  });
});


// consulta um registo pelo id (paci.handlebars)
router.get("/paci/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM pacientes WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const listar = data;
    res.render("pacientes/pacientes", { layout: false, listar });
  });
});


//pegando para editar registro
router.get("/paci/edit/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM pacientes where id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const paci = data[0];
    res.render("pacientes/edit", { layout: false, paci });
  });
});

module.exports = router;