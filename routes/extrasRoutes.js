// routes/extras.js
const express = require('express');
const router = express.Router();
const extrasController = require('../controllers/extrasController');

router.get('/', extrasController.obtenerExtras);
router.put('/:equipo_id', extrasController.actualizarExtras);

module.exports = router;