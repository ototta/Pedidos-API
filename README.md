
## Endpoints

### Verificar funcionamento

`GET /`

Retorna uma mensagem indicando que a API está funcionando.

### Health check

`GET /health`

Retorna o estado da aplicação.

### Listar pedidos

`GET /pedidos`

Retorna os pedidos cadastrados com paginação.

Parâmetros:
- `page`: número da página. Padrão: 1.
- `limit`: quantidade de registros. Padrão: 10.
- Limite máximo: 100.

Exemplo:

`GET /pedidos?page=1&limit=10`

### Buscar pedido por ID

`GET /pedidos/:id`

Retorna um pedido específico.

Exemplo:

`GET /pedidos/1`

### Criar pedido

`POST /pedidos`

Exemplo:

```json
{
  "cliente_nome": "Joao",
  "cep_origem": "96810000",
  "cep_destino": "90010000",
  "peso": 2.5
}
```

Retorna HTTP 201.

### Atualizar pedido

`PUT /pedidos/:id`

Atualiza todos os campos do pedido.

Exemplo:

`PUT /pedidos/1`

Utiliza o mesmo JSON do cadastro.

Retorna HTTP 200.

### Excluir pedido

`DELETE /pedidos/:id`

Exclui um pedido específico.

Retorna HTTP 204.

### Códigos HTTP

- `200`: operação realizada.
- `201`: pedido criado.
- `204`: pedido excluído.
- `400`: dados inválidos.
- `404`: pedido não encontrado.
- `500`: erro interno do servidor.
