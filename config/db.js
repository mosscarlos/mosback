const mysql = require('mysql2/promise'); // Usa mysql2 con soporte para promesas
require('dotenv').config({ path: '../.env' }); // Ajusta la ruta si es necesario

console.log("🚀 Verificando variables de entorno:");
console.log("DB_HOST:", process.env.DB_HOST || "NO DEFINIDO");
console.log("DB_USER:", process.env.DB_USER || "NO DEFINIDO");
console.log("DB_PORT:", process.env.DB_PORT || "NO DEFINIDO");
console.log("DB_NAME:", process.env.DB_NAME || "NO DEFINIDO");

// Validar que las variables de entorno estén definidas
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME || !process.env.DB_PORT) {
  console.error("❌ ERROR: Faltan variables de entorno en el archivo .env");
  process.exit(1); // Detiene la ejecución si hay un error
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // 3306 es el puerto común para MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para probar la conexión y obtener datos
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conectado a MySQL correctamente');

    // Prueba de consulta (cambia 'usuarios' por una tabla válida de tu BD)
    const [rows] = await connection.query('SELECT * FROM usuarios LIMIT 5');
    console.log('📊 Datos obtenidos de la base de datos:', rows);

    connection.release(); // Libera la conexión
  } catch (err) {
    console.error('❌ Error conectando a la BD:', err.message);
    console.error('Detalles del error:', err);
  }
}

// Llamar a la función de prueba
testConnection();

module.exports = pool;
