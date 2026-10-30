const pedidoService = require("../services/pedidoService");

async function listar(req, res, next) {
    try {
        const pedidos = await pedidoService.listarPedidos();

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