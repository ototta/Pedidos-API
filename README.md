# Pedidos API

API REST para gerenciamento de pedidos, desenvolvida com Node.js, Express e PostgreSQL.

O projeto permite cadastrar e consultar pedidos, validar dados, controlar resultados por paginação e proteger endpoints contra requisições excessivas.

## Tecnologias utilizadas

- Node.js 22
- JavaScript
- Express 5
- PostgreSQL
- Docker e Docker Compose
- Helmet
- Express Rate Limit
- CORS
- Node.js Test Runner
- GitHub Actions
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
- Cabeçalhos HTTP de segurança com Helmet.
- Limitação de requisições por IP.
- Controle de acesso por origem com CORS.
- Testes automatizados.
- Integração contínua com GitHub Actions.
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

Parâmetros de paginação:

`GET /pedidos?page=1&limit=10`

- `page`: número da página. Padrão: 1.
- `limit`: quantidade de registros por página. Padrão: 10.
- Limite máximo: 100 registros por página.

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

Retorna o pedido cadastrado com HTTP 201.

## Validações

A API verifica:

- Preenchimento dos campos obrigatórios.
- Nome do cliente válido.
- CEPs contendo exatamente 8 números.
- Peso numérico maior que zero.
- Parâmetros de paginação válidos.

Requisições inválidas retornam HTTP 400.

## Segurança

- Helmet configura cabeçalhos HTTP de segurança.
- Express Rate Limit limita o número de requisições por IP.
- Limite padrão: 100 requisições por IP a cada 15 minutos.
- CORS permite configurar origens autorizadas por variável de ambiente.
- O corpo das requisições JSON possui limite de 10 KB.

## Testes automatizados

Os testes utilizam o módulo nativo `node:test`.

Para executar:

```bash
npm test
```

Os testes verificam o health check, a listagem, a paginação e a validação de dados.

## Integração contínua

O GitHub Actions executa automaticamente os testes em cada push para a branch `main` e em pull requests direcionados a essa branch.

O workflow utiliza PostgreSQL para executar os testes em um ambiente controlado.

## Executar localmente

### Pré-requisitos

- Node.js 22
- Docker
- Docker Compose
- Git

### Clonar o repositório

```bash
git clone https://github.com/ototta/Pedidos-API.git
cd Pedidos-API
```

### Configurar variáveis de ambiente

Crie um arquivo `.env` com as configurações necessárias:

```env
PORT=3000
NODE_ENV=development

DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=pedidos_db

CORS_ORIGIN=
```

Deixe `CORS_ORIGIN` vazio para permitir qualquer origem. Em produção, configure as origens autorizadas conforme necessário.

### Iniciar a aplicação

```bash
docker compose up -d --build
```

A API estará disponível em:

`http://localhost:3000`

### Executar os testes

```bash
npm test
```

## Autor

Desenvolvido como projeto de estudo e portfólio Backend.