// routes/partidoRoutes.js

const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partidoController');

// Rutas específicas primero
router.post('/competencias_individuales', partidoController.crearCompetenciaIndividual);
router.put('/:id/puntuacion', partidoController.actualizarPuntuacion);
router.put('/:id/finalizar', partidoController.finalizarPartido);
router.put('/:id', partidoController.actualizarPartido);
router.delete('/:id', partidoController.eliminarPartido);
router.post('/', partidoController.crearPartido); // Mover al final para evitar conflictos

// Rutas GET al final
router.get('/equipos', partidoController.obtenerEquipos);
router.get('/torneos', partidoController.obtenerTorneos);
router.get('/disciplinas', partidoController.obtenerDisciplinas);
router.get('/categorias', partidoController.obtenerCategorias);
router.get('/torneo_disciplinas', partidoController.obtenerTorneoDisciplinas);
router.get('/disciplina_categorias', partidoController.obtenerDisciplinaCategorias);
router.get('/', partidoController.obtenerPartidos);


module.exports = router;

