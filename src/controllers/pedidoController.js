
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

async function buscarPorId(req, res, next) {
    try {
        const pedido = await pedidoService.buscarPedidoPorId(req.params.id);

        if (!pedido) {
            return res.status(404).json({
                erro: "Pedido não encontrado."
            });
        }

        return res.status(200).json(pedido);
    } catch (error) {
        next(error);
    }
}

async function atualizar(req, res, next) {
    try {
        const pedido = await pedidoService.atualizarPedido(
            req.params.id,
            req.body
        );

        if (!pedido) {
            return res.status(404).json({
                erro: "Pedido não encontrado."
            });
        }

        return res.status(200).json(pedido);
    } catch (error) {
        next(error);
    }
}

async function excluir(req, res, next) {
    try {
        const excluido = await pedidoService.excluirPedido(req.params.id);

        if (!excluido) {
            return res.status(404).json({
                erro: "Pedido não encontrado."
            });
        }

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listar,
    criar,
    buscarPorId,
    atualizar,
    excluir
};
