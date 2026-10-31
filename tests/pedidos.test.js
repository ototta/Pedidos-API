
const { test } = require("node:test");
const assert = require("node:assert/strict");

const API_URL = process.env.API_URL || "http://localhost:3000";

test("API deve responder ao health check", async () => {
    const resposta = await fetch(`${API_URL}/health`);
    const dados = await resposta.json();

    assert.equal(resposta.status, 200);
    assert.equal(dados.status, "ok");
});

test("Deve listar pedidos com paginação", async () => {
    const resposta = await fetch(
        `${API_URL}/pedidos?page=1&limit=10`
    );

    const dados = await resposta.json();

    assert.equal(resposta.status, 200);
    assert.ok(Array.isArray(dados.dados));
    assert.equal(dados.paginacao.pagina, 1);
    assert.equal(dados.paginacao.limite, 10);
    assert.ok(dados.paginacao.total >= 0);
});

test("Deve rejeitar página igual a zero", async () => {
    const resposta = await fetch(
        `${API_URL}/pedidos?page=0&limit=10`
    );

    assert.equal(resposta.status, 400);
});

test("Deve rejeitar limite acima de 100", async () => {
    const resposta = await fetch(
        `${API_URL}/pedidos?page=1&limit=101`
    );

    assert.equal(resposta.status, 400);
});

test("Deve rejeitar CEP inválido", async () => {
    const resposta = await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cliente_nome: "Teste Automatizado",
            cep_origem: "123",
            cep_destino: "90010000",
            peso: 2.5
        })
    });

    assert.equal(resposta.status, 400);
});

test("Deve rejeitar peso negativo", async () => {
    const resposta = await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cliente_nome: "Teste Automatizado",
            cep_origem: "96810000",
            cep_destino: "90010000",
            peso: -2
        })
    });

    assert.equal(resposta.status, 400);
});

test("Deve executar o CRUD completo de um pedido", async () => {
    // Criar
    const criacao = await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cliente_nome: "Teste CRUD Automatizado",
            cep_origem: "96810000",
            cep_destino: "90010000",
            peso: 2.5
        })
    });

    const pedidoCriado = await criacao.json();

    assert.equal(criacao.status, 201);
    assert.ok(pedidoCriado.id);

    const id = pedidoCriado.id;

    // Buscar
    const busca = await fetch(`${API_URL}/pedidos/${id}`);
    const pedidoEncontrado = await busca.json();

    assert.equal(busca.status, 200);
    assert.equal(pedidoEncontrado.id, id);

    // Atualizar
    const atualizacao = await fetch(`${API_URL}/pedidos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cliente_nome: "Pedido Atualizado",
            cep_origem: "96810000",
            cep_destino: "90010000",
            peso: 5
        })
    });

    const pedidoAtualizado = await atualizacao.json();

    assert.equal(atualizacao.status, 200);
    assert.equal(pedidoAtualizado.cliente_nome, "Pedido Atualizado");
    assert.equal(Number(pedidoAtualizado.peso), 5);

    // Excluir
    const exclusao = await fetch(`${API_URL}/pedidos/${id}`, {
        method: "DELETE"
    });

    assert.equal(exclusao.status, 204);

    // Confirmar exclusão
    const buscaAposExclusao = await fetch(`${API_URL}/pedidos/${id}`);

    assert.equal(buscaAposExclusao.status, 404);
});

test("Deve rejeitar ID inválido", async () => {
    const resposta = await fetch(`${API_URL}/pedidos/abc`);

    assert.equal(resposta.status, 400);
});
