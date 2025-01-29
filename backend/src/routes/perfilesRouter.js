const express = require('express');
const router = express.Router();
const { getAllPerfiles, getPerfil, createPerfil, updatePerfil, deletePerfil } = require('../controllers/perfilesController');

router.get('/', getAllPerfiles);
router.get('/:id', getPerfil);
router.post('/', createPerfil);
router.put('/:id', updatePerfil);
router.delete('/:id', deletePerfil);

module.exports = router;
