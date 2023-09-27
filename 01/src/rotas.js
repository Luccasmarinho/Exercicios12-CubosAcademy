const express = require("express");

const { listagemDeAlunos, encontrarAlunoPorId, cadastrarAluno, deletarAluno, atualizarAluno } = require("./controladores/alunos");
const { autenticacaoSenha } = require("./middlewares/middlewares");

const rotas = express();

rotas.use(autenticacaoSenha);

rotas.get("/alunos/", listagemDeAlunos);
rotas.get("/alunos/:id", encontrarAlunoPorId);
rotas.post("/alunos/", cadastrarAluno);
rotas.delete("/alunos/:id", deletarAluno);  
rotas.put("/alunos/:id", atualizarAluno);  

module.exports = rotas