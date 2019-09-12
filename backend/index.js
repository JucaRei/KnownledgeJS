// pode encadear chamadas de função uma atrás da outra
const app = require("express")();
const consign = require("consign");

//ajuda a fazer as dependencias dentro da aplicação(por exemplo require...)
consign()
  .then("./config/middlewares.js")
  .into(app); // cada uma das dependências ele vai injetar como parâmetro o app

app.listen(3000, () => {
  console.log("Backend em execução2...");
});
