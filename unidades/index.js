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

router.get("/", function (req, res) {
  res.render("unidades/home", { layout: false });
});

//rota para inserir dados (home.handlebars)
router.post("/und/insertund", (req, res) => {
  const cnpj = req.body.cnpj;
  const nome = req.body.nome;
  const endereco = req.body.endereco;
  const telefone = req.body.telefone;

  const sql = `INSERT INTO unidades (cnpj, nome, endereco, telefone) VALUES ('${cnpj}', '${nome}', '${endereco}', '${telefone}')`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/unidades/");
  });
});

//rota de consulta geral
router.get("/und", (req, res) => {
  const sql = "SELECT * FROM unidades order by nome";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const listar = data;

    console.log(listar);

    res.render("unidades/und", { layout: false, listar });
  });
});

//rota busc para exibir o resultado do buscar
router.post("/busc", (req, res) => {
  const cnpj = req.body.cnpj;
  const sql = `SELECT * FROM unidades WHERE cnpj = ${cnpj}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listarund = data[0];
    res.render("unidades/unidades", { layout: false, listarund });
  });
});

//rota do buscar
router.get("/und/busca", (req, res) => {
  res.render("unidades/busca", { layout: false });
});

//rota de edicao do registro com post
router.post("/updateund", (req, res) => {
  const cnpj = req.body.cnpj;
  const nome = req.body.nome;
  const endereco = req.body.endereco;
  const telefone = req.body.telefone;

  const sql = `UPDATE unidades SET nome = '${nome}', endereco = '${endereco}', telefone = '${telefone}' WHERE cnpj = '${cnpj}'`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/unidades/und");
  });
});

//rota para pegar dados para editar registro
router.get("/edit/:cnpj", (req, res) => {
  const cnpj = req.params.cnpj;

  const sql = `SELECT * FROM unidades where cnpj = ${cnpj}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const und = data[0];
    res.render("unidades/edit", { layout: false, und });
  });
});

//rota para deletar um registro
router.get("/und/remove/:cnpj", (req, res) => {
  const cnpj = req.params.cnpj;

  const sql = `DELETE FROM unidades WHERE cnpj = '${cnpj}'`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/unidades/und");
  });
});


// consulta um registo pelo id (produto.handlebars)
router.get("/und/:cnpj", (req, res) => {
  const cnpj = req.params.cnpj;

  const sql = `SELECT * FROM unidades WHERE cnpj ='${cnpj}'`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const listarund = data[0];
    res.render("unidades/unidades", { layout: false, listarund });
  });
});

module.exports = router;