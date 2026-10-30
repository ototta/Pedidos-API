CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    cliente_nome VARCHAR(150) NOT NULL,
    cep_origem VARCHAR(8) NOT NULL,
    cep_destino VARCHAR(8) NOT NULL,
    peso NUMERIC(10, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);