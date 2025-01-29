const DetalleCaso = require('../models/detalleCasoModel');

// Obtener todos los DetalleCasos
const getAllDetalleCasos = async (req, res) => {
    try {
        const detalleCasos = await DetalleCaso.findAll();
        res.status(200).json(detalleCasos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un DetalleCaso por ID
const getDetalleCasoByCabecera = async (req, res) => {
    try {
        const { idcabeceracaso } = req.params;

        const detalleCaso = await DetalleCaso.findOne({
            where: {
                idcabeceracaso,
                estadodetallecaso: true
            },
            order: [['iddetallecaso', 'ASC']] // Opcional: Obtener el primero por orden
        });

        detalleCaso 
            ? res.status(200).json(detalleCaso) 
            : res.status(404).json({ message: 'No se encontró un DetalleCaso activo para la cabecera' });

    } catch (error) {
        console.error('Error al obtener el DetalleCaso:', error);
        res.status(500).json({ error: error.message });
    }
};


// Crear un nuevo DetalleCaso
const createDetalleCaso = async (req, res) => {
    try {
        const newDetalleCaso = await DetalleCaso.create(req.body);
        res.status(201).json(newDetalleCaso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un DetalleCaso por ID
const updateDetalleCaso = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await DetalleCaso.update(req.body, { where: { iddetallecaso: id } });
        updated ? res.status(200).json({ message: 'DetalleCaso actualizado' }) : res.status(404).json({ message: 'DetalleCaso no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un DetalleCaso por ID
const deleteDetalleCaso = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await DetalleCaso.destroy({ where: { iddetallecaso: id } });
        deleted ? res.status(204).send() : res.status(404).json({ message: 'DetalleCaso no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllDetalleCasos, getDetalleCasoByCabecera, createDetalleCaso, updateDetalleCaso, deleteDetalleCaso };
