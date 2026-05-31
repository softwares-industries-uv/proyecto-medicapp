const express      = require('express');
const db           = require('./db');
const swaggerUi    = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { 
      title: 'MedicApp API', 
      version: '1.0.0',
      description: 'API para la gestión de medicamentos y registros de salud del paciente' 
    },
    servers: [
      { url: 'https://proyecto-medicapp.onrender.com', description: 'Produccion (Render)' },
      { url: 'http://localhost:3000', description: 'Local' }
    ]
  },
  apis: ['./index.js']
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /efectos:
 * get:
 * summary: Criterio 3 - Muestra la lista de efectos secundarios guardados en el historial
 * responses:
 * 200:
 * description: Lista de efectos secundarios registrados por el paciente
 */
app.get('/efectos', (req, res) => {
  res.json(db.prepare('SELECT * FROM efectos_secundarios ORDER BY fecha_registro DESC').all());
});

/**
 * @swagger
 * /efectos:
 * post:
 * summary: Criterio 1 - Registra un medicamento y su reacción adversa
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - medicamento
 * - reaccion
 * properties:
 * medicamento: { type: string, example: "Ibuprofeno" }
 * reaccion:    { type: string, example: "Gastritis severa y ronchas en la piel" }
 * responses:
 * 201:
 * description: Efecto secundario guardado exitosamente en el historial
 */
app.post('/efectos', (req, res) => {
  const { medicamento, reaccion } = req.body;
  
  if (!medicamento || !reaccion) {
    return res.status(400).json({ error: 'El nombre del medicamento y la reacción son obligatorios' });
  }

  const r = db.prepare(
    'INSERT INTO efectos_secundarios (medicamento, reaccion) VALUES (?, ?)'
  ).run(medicamento, reaccion);
  
  res.status(201).json({ 
    id: r.lastInsertRowid, 
    medicamento, 
    reaccion,
    mensaje: 'Registro guardado en el historial' 
  });
});

/**
 * @swagger
 * /efectos/verificar/{nombreMedicamento}:
 * get:
 * summary: Criterio 2 - Verifica si un medicamento tiene riesgos antes de asociarlo en otra funcionalidad
 * parameters:
 * - in: path
 * name: nombreMedicamento
 * required: true
 * schema: { type: string }
 * responses:
 * 200:
 * description: Devuelve si el medicamento es peligroso o seguro basado en el historial
 */
app.get('/efectos/verificar/:nombreMedicamento', (req, res) => {
  const { nombreMedicamento } = req.params;
  
  const registro = db.prepare(
    'SELECT * FROM efectos_secundarios WHERE UPPER(medicamento) = UPPER(?)'
  ).get(nombreMedicamento);

  if (registro) {
    return res.json({ 
      riesgo: true, 
      advertencia: `⚠️ ADVERTENCIA: Este medicamento ya registró un efecto secundario previo (${registro.reaccion}). Evite su uso.` 
    });
  }

  res.json({ riesgo: false, mensaje: 'No hay registros de efectos secundarios para este medicamento.' });
});

/**
 * @swagger
 * /efectos/{id}:
 * delete:
 * summary: Elimina un registro del historial de efectos secundarios
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema: { type: integer }
 * responses:
 * 200:
 * description: Registro eliminado correctamente
 * 404:
 * description: Registro no encontrado
 */
app.delete('/efectos/:id', (req, res) => {
  const i = db.prepare('DELETE FROM efectos_secundarios WHERE id=?').run(req.params.id);
  if (i.changes === 0) return res.status(404).json({ error: 'Registro no encontrado' });
  res.json({ mensaje: 'Registro de efecto secundario eliminado' });
});

app.listen(3000, () => console.log('MedicApp API corriendo en http://localhost:3000'));