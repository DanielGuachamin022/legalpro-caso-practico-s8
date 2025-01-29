const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

// Ruta para el login
router.post('/', AuthController.login);

module.exports = router;
