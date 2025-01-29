const express = require('express');
const router = express.Router();
const { getAllTipoCasos, getTipoCaso, createTipoCaso, updateTipoCaso, deleteTipoCaso } = require('../controllers/tipoCasosController');

router.get('/', getAllTipoCasos);
router.get('/:id', getTipoCaso);
router.post('/', createTipoCaso);
router.put('/:id', updateTipoCaso);
router.delete('/:id', deleteTipoCaso);

module.exports = router;
