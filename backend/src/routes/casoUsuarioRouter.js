const express = require('express');
const router = express.Router();
const { getAllCasoUsuario, createCasoUsuario, deleteCasoUsuario, getCasoUsuarioByIdUsuario } = require('../controllers/casoUsuarioController');

router.get('/', getAllCasoUsuario);
router.post('/', createCasoUsuario);
router.delete('/:id', deleteCasoUsuario);
router.get('/:idusuario', getCasoUsuarioByIdUsuario);

module.exports = router;
