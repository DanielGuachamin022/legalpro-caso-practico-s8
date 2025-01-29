const express = require('express');
const router = express.Router();
const { getAllDetalleCasos, getDetalleCasoByCabecera, createDetalleCaso, updateDetalleCaso, deleteDetalleCaso } = require('../controllers/detalleCasosController');

router.get('/', getAllDetalleCasos);
router.get('/:idcabeceracaso', getDetalleCasoByCabecera);
router.post('/', createDetalleCaso);
router.put('/:id', updateDetalleCaso);
router.delete('/:id', deleteDetalleCaso);

module.exports = router;
