// importar express
var express = require("express");

// importar mysql
const mysql = require("mysql");

// importar o handlebars
const exphbs = require("express-handlebars");

const Unidades = require("./unidades/index");

const port = 3000;

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/unidades", Unidades);

app.listen(port);