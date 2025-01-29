const express = require('express');
const router = express.Router();
const { getAllEvidencias, getEvidencia, createEvidencia, updateEvidencia, deleteEvidencia } = require('../controllers/evidenciasController');

router.get('/', getAllEvidencias);
router.get('/:id', getEvidencia);
router.post('/', createEvidencia);
router.put('/:id', updateEvidencia);
router.delete('/:id', deleteEvidencia);

module.exports = router;
