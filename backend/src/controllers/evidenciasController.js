const Evidencia = require('../models/evidenciaModel');

// CRUD básico para Evidenciaes
const getAllEvidencias = async (req, res) => {
    try {
        const evidencias = await Evidencia.findAll();
        res.status(200).json(evidencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEvidencia = async (req, res) => {
    try {
        const { id } = req.params;
        const evidencia = await Evidencia.findByPk(id);
        evidencia ? res.status(200).json(evidencia) : res.status(404).json({ message: 'Evidencia no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEvidencia = async (req, res) => {
    try {
        const newEvidencia = await Evidencia.create(req.body);
        res.status(201).json(newEvidencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEvidencia = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Evidencia.update(req.body, { where: { idevidencia: id } });
        updated ? res.status(200).json({ message: 'Evidencia actualizado' }) : res.status(404).json({ message: 'Evidencia no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEvidencia = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Evidencia.destroy({ where: { idevidencia: id } });
        deleted ? res.status(204).send() : res.status(404).json({ message: 'Evidencia no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllEvidencias, getEvidencia, createEvidencia, updateEvidencia, deleteEvidencia };
