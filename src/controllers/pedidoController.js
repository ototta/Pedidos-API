const pedidoService = require("../services/pedidoService");

async function listar(req, res, next) {
    try {
        const { page, limit } = req.query;

        const pedidos = await pedidoService.listarPedidos(
            page || 1,
            limit || 10
        );

        return res.status(200).json(pedidos);
    } catch (error) {
        next(error);
    }
}

async function criar(req, res, next) {
    try {
        const pedido = await pedidoService.criarPedido(req.body);

        return res.status(201).json(pedido);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listar,
    criar
};