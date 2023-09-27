function autenticacaoSenha (req, res, next) {
    const { senha } = req.query;

    if (!senha) {
        return res.status(400).json({ mensagem: "Digite uma senha." });
    }

    if (senha !== "cubos123") {
        return res.status(400).json({ mensagem: "Senha incorreta" });
    }

    next();
}

module.exports = {
    autenticacaoSenha
}