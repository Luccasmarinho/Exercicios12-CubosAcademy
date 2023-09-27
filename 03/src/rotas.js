const express = require("express");

const { listagemDeLivros, encontrarLivroPorId, cadastrarNovoLivro, substituirLivro, alterarUmLivro, deletarLivro } = require("./controllers/biblioteca");

const rotas = express();

rotas.get("/livros/", listagemDeLivros);
rotas.get("/livros/:id", encontrarLivroPorId);
rotas.post("/livros/", cadastrarNovoLivro);
rotas.put("/livros/:id/", substituirLivro);
rotas.patch("/livros/:id/", alterarUmLivro);
rotas.delete("/livros/:id", deletarLivro);

module.exports = rotas