const EquipoUsuario = require('../models/equipoUsuarioModel');

// Obtener todos los registros de EquipoUsuario
const getAllEquipoUsuario = async (req, res) => {
    try {
        const equipoUsuario = await EquipoUsuario.findAll();
        res.status(200).json(equipoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo registro de EquipoUsuario
const createEquipoUsuario = async (req, res) => {
    try {
        const newEquipoUsuario = await EquipoUsuario.create(req.body);
        res.status(201).json(newEquipoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un registro de EquipoUsuario por IdEquipo e IdUsuario
const deleteEquipoUsuario = async (req, res) => {
    try {
        const { IdEquipo, IdUsuario } = req.body;
        const deleted = await EquipoUsuario.destroy({
            where: { IdEquipo, IdUsuario },
        });
        deleted ? res.status(204).send() : res.status(404).json({ message: 'Relación no encontrada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllEquipoUsuario, createEquipoUsuario, deleteEquipoUsuario };
