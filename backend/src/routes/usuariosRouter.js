const express = require('express');
const { getAllUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuariosController');

const router = express.Router();

// Definir las rutas
router.get('/', getAllUsuarios);
router.get('/:id', getUsuario);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router; // Exportar el enrutador
