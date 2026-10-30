const express = require("express");
const pedidoController = require("../controllers/pedidoController");

const router = express.Router();

router.get("/", pedidoController.listar);
router.post("/", pedidoController.criar);

module.exports = router;