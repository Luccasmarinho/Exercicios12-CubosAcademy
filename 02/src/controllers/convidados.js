const convidados = require("../dados/convidados");

function consultarListaDeConvidados(req, res) {
    const { nome } = req.query;

    if (!nome) {
        return res.json(convidados);
    }

    const convidado = convidados.find((elemento) => elemento === nome);
    
    if (!convidado) {
        return res.status(404).json({ mensagem: "O convidado buscado não está presente na lista." });
    }

    if (convidado) {
        return res.status(200).json({ mensagem: "Convidado presente." });
    }


}

function adicionarConvidado(req, res) {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: "Nome inválido" });
    }

    const convidado = convidados.find((elemento) => elemento === nome);

    if (convidado) {
        return res.status(400).json({ mensagem: "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também." });
    }
    
    convidados.push(nome);
    return res.status(201).json({ mensamge: "Convidado adicionado." })
}

function deletarConvidado(req, res) {
    const { nome } = req.params;

    const convidado = convidados.find((elemento) => elemento === nome);
    const indiceConvidado = convidados.findIndex((elemento) => elemento === nome);

    if(!convidado) {
        return res.status(400).json({ mensagem: "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido." })
    }

    if(convidado) {
        convidados.splice(indiceConvidado, 1);
        return res.status(200).json({ mensagem: "Convidado removido." });
    }


}

function deletarTodosConvidados (req, res) {
    convidados.splice(0, convidados.length);

    return res.status(200).json({ mensagem: "Todos os convidados foram removidos." })
}

module.exports = {
    consultarListaDeConvidados,
    adicionarConvidado,
    deletarConvidado,
    deletarTodosConvidados
 
}