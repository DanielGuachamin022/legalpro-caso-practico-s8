const Perfil = require('../models/perfilModel');

// CRUD básico para Perfiles
const getAllPerfiles = async (req, res) => {
    try {
        const perfiles = await Perfil.findAll();
        res.status(200).json(perfiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const perfil = await Perfil.findByPk(id);
        perfil ? res.status(200).json(perfil) : res.status(404).json({ message: 'Perfil no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPerfil = async (req, res) => {
    try {
        const newPerfil = await Perfil.create(req.body);
        res.status(201).json(newPerfil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Perfil.update(req.body, { where: { idperfil: id } });
        updated ? res.status(200).json({ message: 'Perfil actualizado' }) : res.status(404).json({ message: 'Perfil no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Perfil.destroy({ where: { idperfil: id } });
        deleted ? res.status(204).send() : res.status(404).json({ message: 'Perfil no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllPerfiles, getPerfil, createPerfil, updatePerfil, deletePerfil };
