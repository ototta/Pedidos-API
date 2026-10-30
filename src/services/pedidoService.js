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
    } = dados;

    if (!cliente_nome || !cep_origem || !cep_destino || peso === undefined) {
        throw new Error("Todos os campos são obrigatórios.");
    }

    if (!/^\d{8}$/.test(cep_origem) || !/^\d{8}$/.test(cep_destino)) {
        throw new Error("Os CEPs devem conter 8 números.");
    }

    if (!Number.isFinite(Number(peso)) || Number(peso) <= 0) {
        throw new Error("O peso deve ser maior que zero.");
    }

    const resultado = await pool.query(
        `INSERT INTO pedidos
        (cliente_nome, cep_origem, cep_destino, peso)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [cliente_nome, cep_origem, cep_destino, peso]
    );

    return resultado.rows[0];
}

module.exports = {
    listarPedidos,
    criarPedido
};