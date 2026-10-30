# Pedidos API

API REST para gerenciamento de pedidos, desenvolvida com Node.js, Express e PostgreSQL.

O projeto permite cadastrar pedidos, consultar registros e controlar os resultados por paginação. Também possui validação de dados, tratamento centralizado de erros e configuração com Docker.

## Tecnologias utilizadas

- Node.js
- JavaScript
- Express
- PostgreSQL
- Docker
- Docker Compose
- Git e GitHub
- Render

## API em produção

https://pedidos-api-hv0c.onrender.com

## Funcionalidades

- Cadastro de pedidos.
- Listagem de pedidos.
- Paginação de resultados.
- Validação dos dados recebidos.
- Tratamento centralizado de erros.
- Persistência de dados com PostgreSQL.
- Ambiente local configurado com Docker.
- Deploy em ambiente de produção.

## Endpoints

### Verificar funcionamento

`GET /`

Retorna uma mensagem indicando que a API está funcionando.

### Health check

`GET /health`

Retorna o estado da aplicação.

### Listar pedidos

`GET /pedidos`

Retorna os pedidos cadastrados.

Também aceita parâmetros de paginação:

`GET /pedidos?page=1&limit=10`

Parâmetros:

- `page`: número da página. Padrão: 1.
- `limit`: quantidade de registros por página. Padrão: 10.
- Limite máximo: 100 registros por página.

Exemplo de resposta:

```json
{
  "dados": [
    {
      "id": 1,
      "cliente_nome": "Joao",
      "cep_origem": "96810000",
      "cep_destino": "90010000",
      "peso": "2.50",
      "status": "pendente",
      "created_at": "2026-10-30T18:40:33.523Z"
    }
  ],
  "paginacao": {
    "pagina": 1,
    "limite": 10,
    "total": 1,
    "totalPaginas": 1
  }
}
```

### Criar pedido

`POST /pedidos`

Exemplo de requisição:

```json
{
  "cliente_nome": "Joao",
  "cep_origem": "96810000",
  "cep_destino": "90010000",
  "peso": 2.5
}
```

Exemplo de resposta:

```json
{
  "id": 1,
  "cliente_nome": "Joao",
  "cep_origem": "96810000",
  "cep_destino": "90010000",
  "peso": "2.50",
  "status": "pendente",
  "created_at": "2026-10-30T18:40:33.523Z"
}
```

## Validações

A API verifica:

- Preenchimento dos campos obrigatórios.
- Nome do cliente válido.
- CEPs contendo exatamente 8 números.
- Peso numérico maior que zero.
- Parâmetros de paginação válidos.

Requisições inválidas retornam HTTP 400.

## Executar localmente

### Pré-requisitos

- Node.js
- Docker
- Docker Compose
- Git

### Clonar o repositório

```bash
git clone https://github.com/ototta/Pedidos-API.git
```

Entrar na pasta:

```bash
cd Pedidos-API
```

### Configurar variáveis de ambiente

Crie um arquivo `.env` com as configurações necessárias:

```env
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=pedidos_db
```

### Iniciar a aplicação

```bash
docker compose up -d --build
```

A API estará disponível em