const senhaCorreta = require("./senha");

function autenticacaoSenha (req, res, next) {
    const { senha } = req.query
    
    if (!senha) {
        return res.status(401).json({ mensagem: "Digite uma senha."});
    }

    if (senha !== senhaCorreta) {
        return res.status(401).json({ mensagem: "Digite uma senha válida."});
    }

    next();
}

module.exports = {
    autenticacaoSenha
}