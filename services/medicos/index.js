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
  res.render("medicos/home", { layout: false });
});

//rota para inserir dados mysql
router.post("/med/insertmed", (req, res) => {
  const { nome, crm, especialidade, endereco, telefone } = req.body;

  const sql = `INSERT INTO medico (nome,crm,especialidade,telefone,endereco) VALUES ('${nome}','${crm}', '${especialidade}', '${telefone}', '${endereco}')`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/medicos/");
  });
});

//rota de consulta geral
router.get("/med", (req, res) => {
  const sql = "SELECT * FROM medico";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const listar = data;
    res.render("medicos/med", { layout: false, listar });
  });
});

// consulta um registo pelo id (produto.handlebars)
router.get("/med/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM medico WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const listarMed = data[0];
    res.render("medicos/medico", { layout: false, listarMed });
  });
});

//rota do buscar
router.get("/busca", (req, res) => {
  res.render("medicos/busca", { layout: false });
});

//rota busc para exibir o resultado do buscar
router.post("/busc/", (req, res) => {
  const id = req.body.id;
  const sql = `SELECT * FROM medico WHERE id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listarMed = data[0]; //amazenar as info
    res.render("medicos/medico", { layout: false, listarMed });
  });
});

//rota para pegar dados para editar registro
router.get("/med/edit/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM medico where id = ${id}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const med = data[0];
    res.render("medicos/edit", { layout: false, med });
  });
});

//rota de edicao do registro com post
router.post("/med/updatemed", (req, res) => {
  const { id, crm, nome, especialidade, telefone, endereco } = req.body;

  const sql = `UPDATE medico SET nome = '${nome}',  crm = '${crm}',especialidade = '${especialidade}', telefone = '${telefone}', endereco = '${endereco}' WHERE id = '${id}'`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/medicos/med");
  });
});

//rota para deletar um registro
router.get("/med/remove/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM medico WHERE id = '${id}'`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/medicos/med");
  });
});


module.exports = router