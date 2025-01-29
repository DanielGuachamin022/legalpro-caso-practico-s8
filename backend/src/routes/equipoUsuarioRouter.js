const express = require('express');
const router = express.Router();
const { getAllEquipoUsuario, createEquipoUsuario, deleteEquipoUsuario } = require('../controllers/equipoUsuarioController');

router.get('/', getAllEquipoUsuario);
router.get('/:id', createEquipoUsuario);
router.delete('/:id', deleteEquipoUsuario);

module.exports = router;