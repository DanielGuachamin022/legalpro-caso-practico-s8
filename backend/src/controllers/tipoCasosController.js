const TipoCaso = require('../models/tipoCasoModel');

// CRUD básico para Perfiles
const getAllTipoCasos = async (req, res) => {
    try {
        const tiposCasos = await TipoCaso.findAll();
        res.status(200).json(tiposCasos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTipoCaso = async (req, res) => {
    try {
        const { id } = req.params;
        const perfil = await TipoCaso.findByPk(id);
        perfil ? res.status(200).json(perfil) : res.status(404).json({ message: 'TipoCaso no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTipoCaso = async (req, res) => {
    try {
        const newCaso = await TipoCaso.create(req.body);
        res.status(201).json(newCaso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTipoCaso = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Perfil.update(req.body, { where: { idtipocaso: id } });
        updated ? res.status(200).json({ message: 'TipoCaso actualizado' }) : res.status(404).json({ message: 'TipoCaso no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTipoCaso = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Perfil.destroy({ where: { idtipocaso: id } });
        deleted ? res.status(204).send() : res.status(404).json({ message: 'TipoCaso no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllTipoCasos, getTipoCaso, createTipoCaso, updateTipoCaso, deleteTipoCaso };
