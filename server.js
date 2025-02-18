require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const db = require('./config/db');

// Importación de rutas existentes
const torneoRoutes = require('./routes/torneoRoutes');
const equipoRoutes = require('./routes/equipoRoutes');
const partidoRoutes = require('./routes/partidoRoutes');
const jugadorRoutes = require('./routes/jugadorRoutes');
const authRoutes = require('./routes/authRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const resultadoRoutes = require('./routes/resultadoRoutes');
const evidenciaRoutes = require('./routes/evidenciaRoutes');
const torneoDisciplinaRoutes = require('./routes/torneoDisciplinaRoutes');
const disciplinaCategoriaRoutes = require('./routes/disciplinaCategoriaRoutes');  
const uploadRoutes = require('./routes/uploadRoutes');
const competicionRoutes = require('./routes/competicionRoutes');
const puntajesRoutes = require('./routes/puntajeRoutes');
const estadisticaRoutes = require('./routes/estadisticaRoutes');
const extrasRoutes = require('./routes/extrasRoutes');

// Configuración de middleware
app.use(cors());
app.set('db', db);

// Configuración de límites para el parsing de solicitudes
// Aumentado a 100mb para manejar cargas más grandes
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ 
    limit: '100mb', 
    extended: true,
    parameterLimit: 50000 
}));

// Rutas
app.use('/api/torneos', torneoRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/api/partidos', partidoRoutes);
app.use('/api/jugadores', jugadorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/disciplinas', disciplinaRoutes);
app.use('/api/resultados', resultadoRoutes);
app.use('/api/evidencias', evidenciaRoutes);
app.use('/api/competicion', competicionRoutes);
app.use('/api/puntajes', puntajesRoutes);
app.use('/api/estadisticas', estadisticaRoutes);
app.use('/api/torneo-disciplinas', torneoDisciplinaRoutes);
app.use('/api/disciplina-categorias', disciplinaCategoriaRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/extras', extrasRoutes);

app.listen(5000, () => {
  console.log('Servidor iniciado en http://localhost:5000');
});

module.exports = app;