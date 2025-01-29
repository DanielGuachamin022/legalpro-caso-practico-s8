const express = require('express');
const router = express.Router();
const { getAllCabeceraCasos, getCabeceraCaso, createCabeceraCaso, updateCabeceraCaso, deleteCabeceraCaso } = require('../controllers/cabeceraCasosController');

router.get('/', getAllCabeceraCasos);
router.get('/:id', getCabeceraCaso);
router.post('/', createCabeceraCaso);
router.put('/:id', updateCabeceraCaso);
router.delete('/:id', deleteCabeceraCaso);

module.exports = router;