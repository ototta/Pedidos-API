# Pedidos API

API REST para gerenciamento de pedidos, desenvolvida com Node.js, Express e PostgreSQL.

O projeto permite cadastrar e consultar pedidos, com validação de dados, persistência em banco de dados e execução em containers Docker.

## Tecnologias

- Node.js
- JavaScript
- Express
- PostgreSQL
- Docker
- Docker Compose
- Render

## API em produção

https://pedidos-api-hv0c.onrender.com

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Informações da API |
| GET | `/health` | Verificação de saúde |
| GET | `/pedidos` | Lista todos os pedidos |
| POST | `/pedidos` | Cadastra um novo pedido |

## Criar pedido

**POST** `/pedidos`

Exemplo de requisição:

```json
{
  "cliente_nome": "João",
  "cep_origem": "96810000",
  "cep_destino": "90010000",
  "peso": 2.5
}
```

## Consultar pedidos

**GET** `/pedidos`

Retorna os pedidos cadastrados no PostgreSQL.

## Executar localmente

Clone o repositório:

```bash
git clone https://github.com/ototta/Pedidos-API.git
```

Entre na pasta:

```bash
cd Pedidos-API
```

Configure as variáveis de ambiente utilizando o arquivo `.env.example` como referência e crie seu `.env` local.

Inicie os containers:

```bash
docker compose up -d --build
```

A API estará disponível em:

```text
http://localhost:3000
```

## Banco de dados

O projeto utiliza PostgreSQL para armazenar os pedidos.

A aplicação suporta conexão por variáveis individuais de ambiente no Docker Compose ou por `DATABASE_URL` em produção.

## Deploy

A aplicação está hospedada no Render, utilizando Docker e PostgreSQL.

## Autor

Desenvolvido como projeto de portfólio para prática de desenvolvimento Backend com Node.js.