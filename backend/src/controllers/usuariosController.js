const Usuario = require('../models/usuarioModel');

// Obtener todos los usuarios
const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID
const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        usuario ? res.status(200).json(usuario) : res.status(404).json({ message: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
    try {
        const newUsuario = await Usuario.create(req.body);
        res.status(201).json(newUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un usuario por ID
const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Usuario.update(req.body, { where: { idusuario: id } });
        updated ? res.status(200).json({ message: 'Usuario actualizado' }) : res.status(404).json({ message: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un usuario por ID
const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Usuario.destroy({ where: { idusuario: id } });
        deleted ? res.status(204).send() : res.status(404).json({ message: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario };
