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
router.get("/", function (req, res) {
  res.render("consulta/home", { layout: false });
});

//express url
router.use(
  express.urlencoded({
    extended: true,
  })
);

//rota para inserir dados
router.post("/prod/insertprod", (req, res) => {
   const {
     id_consulta,
     crm,
     especialidade,
     motivo_procura,
     observacao_medico,
     hora,
     data,
     cpf_cliente,
   } = req.body;

  const sql = `INSERT INTO consulta (id_consulta, crm, especialidade, cpf_cliente, data, hora, motivo_procura, observacao_medico) VALUES ('${id_consulta}', '${crm}', '${especialidade}', '${cpf_cliente}', '${data}', '${hora}', '${motivo_procura}', '${observacao_medico}')`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/consulta/");
  });
});

//rota de consulta geral
router.get("/prod", (req, res) => {
  const sql = "SELECT * FROM consulta";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const listar = data;

    console.log(listar);

    res.render("consulta/prod", { layout: false, listar });
  });
});

// consulta um registo pelo id (produto.handlebars)
router.get("/prod/:id_consulta", (req, res) => {
  const id_consulta = req.params.id_consulta;

  const sql = `SELECT * FROM consulta WHERE id_consulta = ${id_consulta}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const listarProd = data[0];
    res.render("consulta/consulta", { layout: false, listarProd });
  });
});

//rota do buscar
router.get("/busca", (req, res) => {
  res.render("consulta/busca", { layout: false });
});

//rota busc para exibir o resultado do buscar
router.post("/busc/", (req, res) => {
  const id_consulta = req.body.id_consulta; //para mudar a busca de id para nome
  const sql = `SELECT * FROM consulta WHERE id_consulta = ${id_consulta}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const listarProd = data[0];
    res.render("consulta/consulta", { layout: false, listarProd });
  });
});

//pegando para editar registro
router.get("/prod/edit/:id_consulta", (req, res) => {
  const id_consulta = req.params.id_consulta;

  const sql = `SELECT * FROM consulta where id_consulta = ${id_consulta}`;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const prod = data[0];
    res.render("consulta/edit", { layout: false, prod });
  });
});

//rota de edicao do registro com post
router.post("/prod/updateprod", (req, res) => {
  const{
    id_consulta, 
    crm,
    especialidade, 
    motivo_procura, 
    observacao_medico, 
    hora, 
    data, 
    cpf_cliente} = req.body;

  const sql = `UPDATE consulta SET crm = '${crm}', especialidade = '${especialidade}', cpf_cliente = '${cpf_cliente}', data = '${data}', hora = '${hora}', motivo_procura = '${motivo_procura}', observacao_medico = '${observacao_medico}'  WHERE id_consulta = ${id_consulta}`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/consulta/prod");
  });
});

//rota para deletar um registro
router.get("/prod/remove/:id_consulta", (req, res) => {
  const id_consulta = req.params.id_consulta;

  const sql = `DELETE FROM consulta WHERE id_consulta = '${id_consulta}'`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/consulta/prod");
  });
});


module.exports = router;