const express = require('express');
const router = express.Router();
const { getAllPlazos, getPlazo, createPlazo, updatePlazo, deletePlazo } = require('../controllers/plazosController');

router.get('/', getAllPlazos);
router.get('/:id', getPlazo);
router.post('/', createPlazo);
router.put('/:id', updatePlazo);
router.delete('/:id', deletePlazo);

module.exports = router;
