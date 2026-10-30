const pool = require("../config/database");

async function listarPedidos(page = 1, limit = 10) {
    const pagina = Number(page);
    const limite = Number(limit);

    if (
        !Number.isInteger(pagina) ||
        !Number.isInteger(limite) ||
        pagina < 1 ||
        limite < 1 ||
        limite > 100
    ) {
        const error = new Error("Parâmetros de paginação inválidos.");
        error.status = 400;
        throw error;
    }

    const offset = (pagina - 1) * limite;

    const resultado = await pool.query(
        `SELECT * FROM pedidos
         ORDER BY id DESC
         LIMIT $1 OFFSET $2`,
        [limite, offset]
    );

    const contagem = await pool.query(
        "SELECT COUNT(*) FROM pedidos"
    );

    const total = Number(contagem.rows[0].count);

    return {
        dados: resultado.rows,
        paginacao: {
            pagina,
            limite,
            total,
            totalPaginas: Math.ceil(total / limite)
        }
    };
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