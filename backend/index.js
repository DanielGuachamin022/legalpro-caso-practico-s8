const express = require('express');
const sequelize = require('./src/config/db'); // Importa la configuración de Sequelize
const usuariosRouter = require('./src/routes/usuariosRouter');
const perfilesRouter = require('./src/routes/perfilesRouter');
const equipoUsuarioRouter = require('./src/routes/equipoUsuarioRouter');
const tipoCasosRouter = require('./src/routes/tipoCasosRouter');
const evidenciasRouter = require('./src/routes/evidenciasRouter');
const plazosRouter = require('./src/routes/plazosRouter');
const equiposRouter = require('./src/routes/equiposRouter');
const cabeceraCasosRouter = require('./src/routes/cabeceraCasosRouter');
const detalleCasoRouter = require('./src/routes/detalleCasosRouter');
const casoUsuarioRouter = require('./src/routes/casoUsuarioRouter');
const authRouter = require('./src/routes/authRouter');

const cors = require('cors');

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173', // Dominios permitidos (tu frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));

app.options('*', cors()); // Permite solicitudes preflight para todos los endpoints


// Middleware para parsear JSON
app.use(express.json());

// Probar la conexión con la base de datos
(async () => {
    try {
        await sequelize.authenticate(); // Verificar conexión
        console.log('Conexión a la base de datos establecida correctamente.');

        // Sincronizar los modelos con la base de datos (opcional)
        // await sequelize.sync({ force: false });

    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        process.exit(1); // Finaliza el proceso en caso de error
    }
})();

// Definir rutas
app.use('/perfiles', perfilesRouter);
app.use('/usuarios', usuariosRouter);
app.use('/equipousuario', equipoUsuarioRouter);
app.use('/tipocasos', tipoCasosRouter);
app.use('/evidencias', evidenciasRouter);
app.use('/plazos', plazosRouter);
app.use('/equipos', equiposRouter);
app.use('/cabeceracasos', cabeceraCasosRouter);
app.use('/detallecasos', detalleCasoRouter);
app.use('/casousuario', casoUsuarioRouter);
app.use('/auth', authRouter)

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
