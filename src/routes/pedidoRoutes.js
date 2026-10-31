
const express = require("express");
const pedidoController = require("../controllers/pedidoController");

const router = express.Router();

router.get("/", pedidoController.listar);
router.post("/", pedidoController.criar);

router.get("/:id", pedidoController.buscarPorId);
router.put("/:id", pedidoController.atualizar);
router.delete("/:id", pedidoController.excluir);

module.exports = router;
