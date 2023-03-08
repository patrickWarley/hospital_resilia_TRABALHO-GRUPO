// importar express
var express = require("express");

// importar mysql
const mysql = require("mysql");

// importar o handlebars
const exphbs = require("express-handlebars");
const Unidades = require("./services/unidades/index");
const Consultas = require("./services/consulta/index");
const Pacientes = require("./services/pacientes/index");
const Medicos = require("./services/medicos/index");
const Exames = require("./services/exames/index");

const port = 3000;

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("view options", { layout: 'main' });
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/unidades", Unidades);
app.use("/consulta", Consultas);
app.use("/pacientes", Pacientes);
app.use("/medicos", Medicos);
app.use("/exames", Exames);

app.get('/', (req, res) => {
  res.render("home", { layout: false });
})

app.listen(port);