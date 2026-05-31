const express      = require('express');
const db           = require('./db');
const swaggerUi    = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

// Configuración básica limpia para evitar errores de lectura
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { 
      title: 'MedicApp API', 
      version: '1.0.0',
      description: 'API de MedicApp' 
    },
    servers: [{ url: 'https://proyecto-medicapp.onrender.com' }]
  },
  apis: ['./index.js']
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /efectos:
 * get:
 * summary: Listar efectos
 * responses:
 * 200:
 * description: OK
 */
app.get('/efectos', (req, res) => {
  res.json(db.prepare('SELECT * FROM efectos_secundarios ORDER BY fecha_registro DESC').all());
});

/**
 * @swagger
 * /efectos:
 * post:
 * summary: Crear efecto
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * medicamento: { type: string }
 * reaccion: { type: string }
 * responses:
 * 201:
 * description: Creado
 */
app.post('/efectos', (req, res) => {
  const { medicamento, reaccion } = req.body;
  if (!medicamento || !reaccion) return res.status(400).json({ error: 'Campos obligatorios' });
  
  const r = db.prepare('INSERT INTO efectos_secundarios (medicamento, reaccion) VALUES (?, ?)').run(medicamento, reaccion);
  res.status(201).json({ id: r.lastInsertRowid, medicamento, reaccion });
});

/**
 * @swagger
 * /efectos/verificar/{nombreMedicamento}:
 * get:
 * summary: Verificar medicamento
 * parameters:
 * - in: path
 * name: nombreMedicamento
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: OK
 */
app.get('/efectos/verificar/:nombreMedicamento', (req, res) => {
  const registro = db.prepare('SELECT * FROM efectos_secundarios WHERE UPPER(medicamento) = UPPER(?)').get(req.params.nombreMedicamento);
  if (registro) {
    return res.json({ riesgo: true, advertencia: `⚠️ ADVERTENCIA: Efecto previo (${registro.reaccion}).` });
  }
  res.json({ riesgo: false, mensaje: 'Seguro.' });
});

app.listen(3000, () => console.log('Servidor corriendo'));