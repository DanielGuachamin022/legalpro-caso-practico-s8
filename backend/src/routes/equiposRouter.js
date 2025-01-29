const express = require('express');
const router = express.Router();
const { getAllEquipos, getEquipo, createEquipo, updateEquipo, deleteEquipo } = require('../controllers/equiposController');

router.get('/', getAllEquipos);
router.get('/:id', getEquipo);
router.post('/', createEquipo);
router.put('/:id', updateEquipo);
router.delete('/:id', deleteEquipo);

module.exports = router;
