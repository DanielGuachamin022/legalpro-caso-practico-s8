const CasoUsuario = require('../models/casoUsuarioModel');
const Usuario = require('../models/usuarioModel')
const CabeceraCaso = require('../models/cabeceraCasoModel')
const Perfil = require('../models/perfilModel')

// Obtener todas las asignaciones de CasoUsuario
const getAllCasoUsuario = async (req, res) => {
    try {
        const casoUsuario = await CasoUsuario.findAll({
            include: [
                { 
                    model: Usuario, 
                    attributes: ['idusuario', 'nombreusuario', 'correousuario'] 
                },
                { 
                    model: CabeceraCaso, 
                    attributes: ['idcabeceracaso', 'codigocaso', 'nombrecliente'] 
                }
            ],
        });
        res.status(200).json(casoUsuario);
    } catch (error) {
        console.error('Error al obtener las asignaciones:', error);
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva asignación de CasoUsuario
const createCasoUsuario = async (req, res) => {
    try {
        const { idcabeceracaso, idusuario } = req.body;

        // Verificar si ya existe la relación
        const existingAssignment = await CasoUsuario.findOne({ where: { idcabeceracaso, idusuario } });
        if (existingAssignment) {
            return res.status(400).json({ message: 'La relación ya existe.' });
        }

        const newCasoUsuario = await CasoUsuario.create({ idcabeceracaso, idusuario });
        res.status(201).json(newCasoUsuario);
    } catch (error) {
        console.error('Error al crear la asignación:', error);
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una asignación de CasoUsuario
const deleteCasoUsuario = async (req, res) => {
    try {
        const { idcabeceracaso, idusuario } = req.body;
        const deleted = await CasoUsuario.destroy({
            where: { idcabeceracaso, idusuario },
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Relación no encontrada.' });
        }
    } catch (error) {
        console.error('Error al eliminar la asignación:', error);
        res.status(500).json({ error: error.message });
    }
};

const getCasoUsuarioByIdUsuario = async (req, res) => {
    try {
        const { idusuario } = req.params;

        // Buscar las relaciones de caso para un usuario específico
        const casoUsuario = await CasoUsuario.findAll({
            where: { idusuario },
            include: [
                {
                    model: CabeceraCaso,
                    attributes: ['idcabeceracaso', 'codigocaso', 'nombrecliente'],
                },
                {
                    model: Usuario,
                    attributes: ['idusuario', 'nombreusuario', 'correousuario'],
                    include: [
                        {
                            model: Perfil, // Incluye el modelo de perfil relacionado
                            attributes: ['idperfil', 'nombreperfil'],
                        },
                    ],
                },
            ],
        });

        if (casoUsuario.length === 0) {
            return res.status(404).json({ message: 'No se encontraron casos asignados para este usuario.' });
        }

        res.status(200).json(casoUsuario);
    } catch (error) {
        console.error('Error al obtener los casos del usuario:', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getAllCasoUsuario, createCasoUsuario, deleteCasoUsuario, getCasoUsuarioByIdUsuario };