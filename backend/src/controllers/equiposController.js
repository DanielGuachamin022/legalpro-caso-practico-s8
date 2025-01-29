const Equipo = require('../models/equipoModel');

// CRUD básico para Equipoes
const getAllEquipos = async (req, res) => {
    try {
        const equipos = await Equipo.findAll();
        res.status(200).json(equipos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const equipo = await Equipo.findByPk(id);
        equipo ? res.status(200).json(Equipo) : res.status(404).json({ message: 'Equipo no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEquipo = async (req, res) => {
    try {
        const newEquipo = await Equipo.create(req.body);
        res.status(201).json(newEquipo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Equipo.update(req.body, { where: { idequipo: id } });
        updated ? res.status(200).json({ message: 'Equipo actualizado' }) : res.status(404).json({ message: 'Equipo no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Equipo.destroy({ where: { idequipo: id } });
        deleted ? res.status(204).send() : res.status(404).json({ message: 'Equipo no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllEquipos, getEquipo, createEquipo, updateEquipo, deleteEquipo };
