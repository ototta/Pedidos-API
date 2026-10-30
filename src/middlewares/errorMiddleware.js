function errorMiddleware(error, req, res, next) {
    console.error(error);

    const status = error.status || 500;

    return res.status(status).json({
        erro: status === 500
            ? "Erro interno do servidor."
            : error.message
    });
}

module.exports = errorMiddleware;