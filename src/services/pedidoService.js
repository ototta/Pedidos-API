
const pool = require("../config/database");

async function listarPedidos() {
    const resultado = await pool.query(
        "SELECT * FROM pedidos ORDER BY id DESC"
    );

    return resultado.rows;
}

async function criarPedido(dados) {
    const {
        cliente_nome,
        cep_origem,
        cep_destino,
        peso
    } = dados || {};

    if (!cliente_nome || !cep_origem || !cep_destino || peso === undefined) {
        const error = new Error("Todos os campos são obrigatórios.");
        error.status = 400;
        throw error;
    }

    if (
        typeof cliente_nome !== "string" ||
        cliente_nome.trim().length === 0 ||
        cliente_nome.trim().length > 150
    ) {
        const error = new Error("Nome do cliente inválido.");
        error.status = 400;
        throw error;
    }

    if (
        !/^\d{8}$/.test(cep_origem) ||
        !/^\d{8}$/.test(cep_destino)
    ) {
        const error = new Error("Os CEPs devem conter 8 números.");
        error.status = 400;
        throw error;
    }

    if (!Number.isFinite(Number(peso)) || Number(peso) <= 0) {
        const error = new Error("O peso deve ser maior que zero.");
        error.status = 400;
        throw error;
    }

    const resultado = await pool.query(
        `INSERT INTO pedidos
        (cliente_nome, cep_origem, cep_destino, peso)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [cliente_nome.trim(), cep_origem, cep_destino, peso]
    );

    return resultado.rows[0];
}

module.exports = {
    listarPedidos,
    criarPedido
};
