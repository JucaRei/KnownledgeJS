// pode encadear chamadas de função uma atrás da outra
const app = require("express")();
const consign = require("consign");
const db = require("./config/db");
const mongoose = require('mongoose')
require('./config/mongodb')   // conecta com o mongo

app.db = db;
app.mongoose = mongoose

//ajuda a fazer as dependencias dentro da aplicação(por exemplo require...)
consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api/validator.js")
  .then("./api")
  .then("./schedule/statsSchedule.js")
  .then("./config/routes.js")
  .into(app); // cada uma das dependências ele vai injetar como parâmetro o app

app.listen(3000, () => {
  console.log("Backend em execução2...");
});
