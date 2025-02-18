const request = require('supertest');
const app = require('../server');

// Tests para verificar que las rutas principales están funcionando
describe('API Endpoints', () => {
  
  // Test general para verificar que el servidor responde
  test('El servidor debe estar funcionando', async () => {
    const response = await request(app).get('/api/torneos');
    expect(response.status).not.toBe(404);
  });

  // Tests para la ruta de torneos
  describe('Rutas de Torneos', () => {
    test('GET /api/torneos debe retornar JSON', async () => {
      await request(app)
        .get('/api/torneos')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  // Tests para la ruta de equipos
  describe('Rutas de Equipos', () => {
    test('GET /api/equipos debe retornar JSON', async () => {
      await request(app)
        .get('/api/equipos')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  // Tests para la ruta de jugadores
  describe('Rutas de Jugadores', () => {
    test('GET /api/jugadores debe retornar JSON', async () => {
      await request(app)
        .get('/api/jugadores')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  // Tests para la ruta de disciplinas
  describe('Rutas de Disciplinas', () => {
    test('GET /api/disciplinas debe retornar JSON', async () => {
      await request(app)
        .get('/api/disciplinas')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  // Tests para la ruta de categorías
  describe('Rutas de Categorías', () => {
    test('GET /api/categorias debe retornar JSON', async () => {
      await request(app)
        .get('/api/categorias')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  // Tests para verificar límites de tamaño en las solicitudes
  describe('Límites de solicitud', () => {
    test('POST debe aceptar payload de hasta 100mb', async () => {
      const largeData = { data: 'a'.repeat(1000000) }; // 1MB de datos
      await request(app)
        .post('/api/torneos')
        .send(largeData)
        .expect(response => {
          expect(response.status).not.toBe(413); // 413 es "Payload Too Large"
        });
    });
  });

  // Tests para manejo de errores
  describe('Manejo de errores', () => {
    test('Ruta no existente debe retornar 404', async () => {
      await request(app)
        .get('/api/ruta-que-no-existe')
        .expect(404);
    });
  });
});

// Cerrar el servidor después de todos los tests
afterAll(done => {
  app.listen().close(done);
});