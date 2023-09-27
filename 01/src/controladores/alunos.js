const { alunos } = require("../dados/alunos");
let { identificadorAluno } = require("../dados/alunos");
const cursos = require("../dados/cursos");

function listagemDeAlunos (req, res) {
    res.status(200).json(alunos)
}

function encontrarAlunoPorId (req, res) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({ mensagem: "O id deve ser um número válido." });
    }

    const aluno = alunos.find((elemento) => elemento.id === Number(id))

    if (!aluno) {
        return res.status(404).json({ mensagem: "Aluno não foi encontrado." });
    }

    return res.status(200).json(aluno);
}

function cadastrarAluno (req, res) {
    const { nome, sobrenome, idade, curso } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: "O nome é obrigatório." });
    }

    if (!sobrenome) {
        return res.status(400).json({ mensagem: "O sobrenome é obrigatório." });
    }
    
    if (!idade) {
        return res.status(400).json({ mensagem: "A idade é obrigatória." });
    }

    if (!curso) {
        return res.status(400).json({ mensagem: "O curso é obrigatório." });
    }

    if (idade < 18) {
        return res.status(400).json({ mensagem: "O aluno é menor de 18 e não pode ser cadastrado" });
    }

    const cursosDisponiveis = cursos.find((elemento) => elemento === curso)

    if (!cursosDisponiveis) {
        return res.status(400).json({ mensagem: `Não temos o curso em questão no momento. Segue a lista de cursos: ${cursos.join(", ")}` });
    }

    const cadastroDeAluno = {
        id: identificadorAluno,
        nome,
        sobrenome,
        idade,
        curso
    }

    identificadorAluno++

    alunos.push(cadastroDeAluno);

    return res.status(201).send();

}

function deletarAluno (req, res) {
    const { id } = req.params;

    if(isNaN(Number(id))) {
        return res.status(400).json({ mensagem: "O id deve ser um número válido." });
    }
   
    const aluno = alunos.find((elemento) => elemento.id === Number(id));
    const indiceAluno = alunos.findIndex((elemento) => elemento.id === Number(id));

    if (!aluno) {
        return res.status(404).json({ mensagem: "O id não foi encontrado." });
    }

    alunos.splice(indiceAluno, 1);

    return res.status(200).json(aluno);
}

function atualizarAluno(req, res) {
    const { id } = req.params;
    const { nome, sobrenome, idade, curso } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: "O nome é obrigatório." })
    }

    if (!sobrenome) {
        return res.status(400).json({ mensagem: "O sobrenome é obrigatório." })
    }

    if (!idade) {
        return res.status(400).json({ mensagem: "A idade é obrigatória." })
    }

    if (!curso) {
        return res.status(400).json({ mensagem: "O curso é obrigatório." })
    }

    const aluno = alunos.find((elemento) => elemento.id === Number(id));

    if (!aluno) {
        return res.status(404).json({ mensagem: "Id não encontrado." })
    }

    aluno.nome = nome;
    aluno.sobrenome = sobrenome;
    aluno.idade = idade;
    aluno.curso = curso;

    return res.status(203).send()
}

module.exports = {
    listagemDeAlunos,
    encontrarAlunoPorId,
    cadastrarAluno,
    deletarAluno,
    atualizarAluno
}
