
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

const pool = require("./config/database");
const pedidoRoutes = require("./routes/pedidoRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

// Segurança dos cabeçalhos HTTP
app.use(helmet());

// Configuração de CORS
const origensPermitidas = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map(origem => origem.trim())
    : [];

app.use(cors({
    origin: (origem, callback) => {
        if (!origem || origensPermitidas.length === 0 || origensPermitidas.includes(origem)) {
            return callback(null, true);
        }

        return callback(new Error("Origem não permitida pelo CORS."));
    }
}));

app.use(express.json({ limit: "10kb" }));

// Limite geral: 100 requisições por IP a cada 15 minutos
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        erro: "Limite de requisições excedido. Tente novamente mais tarde."
    }
});

app.use(limiter);

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API de pedidos funcionando!",
        ambiente: process.env.NODE_ENV || "development"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
});

app.use("/pedidos", pedidoRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS pedidos (
                id SERIAL PRIMARY KEY,
                cliente_nome VARCHAR(150) NOT NULL,
                cep_origem VARCHAR(8) NOT NULL,
                cep_destino VARCHAR(8) NOT NULL,
                peso NUMERIC(10, 2) NOT NULL,
                status VARCHAR(30) DEFAULT 'pendente',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar aplicação:", error);
        process.exit(1);
    }
}

iniciarServidor();
