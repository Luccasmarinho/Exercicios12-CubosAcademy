const {livros} = require("../data/livros");
let {idLivro} = require("../data/livros");

function listagemDeLivros(req, res) {
    return res.status(200).json(livros)
}

function encontrarLivroPorId(req, res) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({ mensagem: "O valor do parâmetro ID da URL não é um número válido." });
    }

    const livro = livros.find((elemento) => elemento.id === Number(id));

    if (!livro) {
        return res.status(404).json({ mensagem: "Não existe livro para o ID informado." })
    }

    return res.status(200).json(livro)
}

function cadastrarNovoLivro(req, res) {
    const { titulo, autor, ano, numPaginas } = req.body;

    if (!titulo) {
        return res.status(400).json({ mensagem: "O título é obrigatório." })
    }

    if (!autor) {
        return res.status(400).json({ mensagem: "O autor é obrigatório." })
    }

    if (!ano) {
        return res.status(400).json({ mensagem: "O ano é obrigatório." })
    }

    if (!numPaginas) {
        return res.status(400).json({ mensagem: "O número de páginas é obrigatório." })
    }

    livros.push({
        id: idLivro++,
        titulo,
        autor,
        ano,
        numPaginas
    })

    return res.status(201).json(livros)
}

function substituirLivro(req, res) {
    const { titulo, autor, ano, numPaginas } = req.body;
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({ mensagem: "O valor do parâmetro ID da URL não é um número válido." });
    }

    const livro = livros.find((elemento) => elemento.id === Number(id));

    if (!livro) {
        return res.status(400).json({ mensagem:"Não existe livro a ser substituído para o ID informado." });
    }

    livro.titulo = titulo
    livro.autor = autor
    livro.ano = ano
    livro.numPaginas = numPaginas

    return res.status(200).json({ mensagem: "Livro substituído." });

}

function alterarUmLivro(req, res) {
    const { titulo, autor, ano, numPaginas } = req.body;
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({ mensagem: "O valor do parâmetro ID da URL não é um número válido." });
    }

    const livro = livros.find((elemento) => elemento.id === Number(id));

    if (!livro) {
        return res.status(400).json({ mensagem:"Não existe livro a ser substituído para o ID informado." });
    }

    if (livro && titulo) {
        livro.titulo = titulo
        return res.status(200).json({ mensagem: "Livro alterado." });
    }

    if (livro && autor) {
        livro.autor = autor
        return res.status(200).json({ mensagem: "Livro alterado." });
    }

    if (livro && ano) {
        livro.ano = ano
        return res.status(200).json({ mensagem: "Livro alterado." });
    }

    if (livro && numPaginas) {
        livro.numPaginas = numPaginas
        res.status(200).json({ mensagem: "Livro alterado." });
    }
}

function deletarLivro(req, res) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({ mensagem: "Digite um número válido." })
    }
    
    const livro = livros.find((elemento) => elemento.id === Number(id));
    const indiceLivro = livros.findIndex((elemento) => elemento.id === Number(id));

    if (!livro) {
        return res.status(404).json({ mensagem: "Não existe livro a ser removido para o ID informado." });
    }

    if (livro) {
        livros.splice(indiceLivro, 1);
        return res.status(200).json({ mensagem: "Livro removido." })
    }
}
 


module.exports = {
    listagemDeLivros,
    encontrarLivroPorId,
    cadastrarNovoLivro,
    substituirLivro,
    alterarUmLivro,
    deletarLivro
}