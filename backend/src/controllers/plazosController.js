const Plazo = require('../models/plazoModel');

// CRUD básico para Plazoes
const getAllPlazos = async (req, res) => {
    try {
        const plazos = await Plazo.findAll();
        res.status(200).json(plazos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPlazo = async (req, res) => {
    try {
        const { id } = req.params;
        const plazo = await Plazo.findByPk(id);
        console.log(plazo)
        plazo ? res.status(200).json(Plazo) : res.status(404).json({ message: 'Plazo no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPlazo = async (req, res) => {
    try {
        const newPlazo = await Plazo.create(req.body);
        res.status(201).json(newPlazo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePlazo = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Plazo.update(req.body, { where: { idplazo: id } });
        updated ? res.status(200).json({ message: 'Plazo actualizado' }) : res.status(404).json({ message: 'Plazo no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePlazo = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Plazo.destroy({ where: { idplazo: id } });
        deleted ? res.status(204).send() : res.status(404).json({ message: 'Plazo no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllPlazos, getPlazo, createPlazo, updatePlazo, deletePlazo };
