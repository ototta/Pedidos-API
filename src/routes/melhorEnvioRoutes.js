const express = require("express");

const router = express.Router();

router.get("/connect", (req, res) => {
    const {
        MELHORENVIO_CLIENT_ID,
        MELHORENVIO_REDIRECT_URI,
        MELHORENVIO_BASE_URL
    } = process.env;

    if (
        !MELHORENVIO_CLIENT_ID ||
        !MELHORENVIO_REDIRECT_URI ||
        !MELHORENVIO_BASE_URL
    ) {
        return res.status(500).json({
            erro: "Variáveis do Melhor Envio não configuradas."
        });
    }

    const params = new URLSearchParams({
        client_id: MELHORENVIO_CLIENT_ID,
        redirect_uri: MELHORENVIO_REDIRECT_URI,
        response_type: "code",
        state: "pedidos-api",
        scope: "shipping-calculate"
    });

    const url = `${MELHORENVIO_BASE_URL}/oauth/authorize?${params}`;

    return res.redirect(url);
});

router.get("/callback", (req, res) => {
    const { code, error } = req.query;

    if (error) {
        return res.status(400).json({
            erro: "Autorização recusada."
        });
    }

    if (!code) {
        return res.status(400).json({
            erro: "Código de autorização não recebido."
        });
    }

    return res.status(200).json({
        mensagem: "Autorização recebida. Próxima etapa: gerar o token."
    });
});

module.exports = router;