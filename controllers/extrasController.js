const db = require('../config/db');

exports.obtenerExtras = async (req, res) => {
  try {
    // Primero obtenemos todos los equipos
    const [equipos] = await db.query('SELECT id FROM equipos');
    
    // Luego obtenemos las puntuaciones existentes
    const query = `
      SELECT pe.*, e.nombre as equipo_nombre 
      FROM puntuaciones_extras pe
      RIGHT JOIN equipos e ON pe.equipo_id = e.id
      ORDER BY e.nombre
    `;
    
    const [puntuaciones] = await db.query(query);
    
    // Si no hay puntuaciones, creamos registros por defecto
    if (puntuaciones.length === 0) {
      const valoresDefault = equipos.map(equipo => ({
        equipo_id: equipo.id,
        inauguracion: 0,
        adicional: 0
      }));

      // Insertamos los valores por defecto
      for (const valor of valoresDefault) {
        await db.query(
          'INSERT INTO puntuaciones_extras (equipo_id, inauguracion, adicional) VALUES (?, ?, ?)',
          [valor.equipo_id, valor.inauguracion, valor.adicional]
        );
      }
      
      // Volvemos a obtener los datos
      const [puntuacionesNuevas] = await db.query(query);
      res.json(puntuacionesNuevas);
    } else {
      res.json(puntuaciones);
    }
  } catch (error) {
    console.error('Error al obtener puntuaciones extras:', error);
    res.status(500).json({ mensaje: 'Error al obtener puntuaciones extras' });
  }
};

exports.actualizarExtras = async (req, res) => {
  const { equipo_id, inauguracion, adicional } = req.body;
  
  try {
    // Verificar si existe el registro
    const [existe] = await db.query(
      'SELECT * FROM puntuaciones_extras WHERE equipo_id = ?',
      [equipo_id]
    );
    
    if (existe.length === 0) {
      // Si no existe, lo creamos
      await db.query(
        'INSERT INTO puntuaciones_extras (equipo_id, inauguracion, adicional) VALUES (?, ?, ?)',
        [equipo_id, inauguracion, adicional]
      );
    } else {
      // Si existe, lo actualizamos
      await db.query(
        'UPDATE puntuaciones_extras SET inauguracion = ?, adicional = ? WHERE equipo_id = ?',
        [inauguracion, adicional, equipo_id]
      );
    }
    
    res.json({ mensaje: 'Puntuaciones actualizadas correctamente' });
  } catch (error) {
    console.error('Error al actualizar puntuaciones:', error);
    res.status(500).json({ mensaje: 'Error al actualizar puntuaciones' });
  }
};