const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.get('/', produtosController.listar);
router.get('/:id', produtosController.obter);

module.exports = router;
