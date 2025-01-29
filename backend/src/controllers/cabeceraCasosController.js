const CabeceraCaso = require('../models/cabeceraCasoModel');

// Obtener todos los CabeceraCasos
const getAllCabeceraCasos = async (req, res) => {
    try {
        const cabeceraCasos = await CabeceraCaso.findAll();
        res.status(200).json(cabeceraCasos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un CabeceraCaso por ID
const getCabeceraCaso = async (req, res) => {
    try {
        const { id } = req.params;
        const cabeceraCaso = await CabeceraCaso.findByPk(id);
        cabeceraCaso ? res.status(200).json(cabeceraCaso) : res.status(404).json({ message: 'CabeceraCaso no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo CabeceraCaso
const createCabeceraCaso = async (req, res) => {
    try {
        const newCabeceraCaso = await CabeceraCaso.create(req.body);
        res.status(201).json(newCabeceraCaso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un CabeceraCaso por ID
const updateCabeceraCaso = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await CabeceraCaso.update(req.body, { where: { idcabeceracaso: id } });
        updated ? res.status(200).json({ message: 'CabeceraCaso actualizado' }) : res.status(404).json({ message: 'CabeceraCaso no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un CabeceraCaso por ID
const deleteCabeceraCaso = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await CabeceraCaso.destroy({ where: { idcabeceracaso: id } });
        deleted ? res.status(204).send() : res.status(404).json({ message: 'CabeceraCaso no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllCabeceraCasos, getCabeceraCaso, createCabeceraCaso, updateCabeceraCaso, deleteCabeceraCaso };
