const express = require("express");

const { consultarListaDeConvidados, adicionarConvidado, deletarConvidado, deletarTodosConvidados } = require("./controllers/convidados");
const { autenticacaoSenha } = require("./middlewares/autenticacao");

const rotas = express();

rotas.get("/convidados/", consultarListaDeConvidados);
rotas.post("/convidados/", adicionarConvidado);
rotas.delete("/convidados/:nome", deletarConvidado);
rotas.delete("/convidados/", autenticacaoSenha, deletarTodosConvidados);

module.exports = rotas;
