const express      = require('express');
const db           = require('./db');
const swaggerUi    = require('swagger-ui-express');

const app = express();
app.use(express.json());

// JSON directo con la configuración de Swagger (Cero comentarios mañosos)
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "MedicApp API",
    version: "1.0.0",
    description: "API para la gestión de medicamentos y registros de salud del paciente"
  },
  servers: [
    { url: "https://proyecto-medicapp.onrender.com" }
  ],
  paths: {
    "/efectos": {
      "get": {
        "summary": "Muestra la lista de efectos secundarios guardados en el historial",
        "responses": {
          "200": { "description": "Lista de efectos devuelta con éxito" }
        }
      },
      "post": {
        "summary": "Registra un medicamento y su reacción adversa",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "medicamento": { "type": "string", "example": "Ibuprofeno" },
                  "reaccion": { "type": "string", "example": "Gastritis severa" }
                }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Registro guardado" }
        }
      }
    },
    "/efectos/verificar/{nombreMedicamento}": {
      "get": {
        "summary": "Verifica si un medicamento tiene riesgos registrados",
        "parameters": [
          { "name": "nombreMedicamento", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Verificación completada" }
        }
      }
    }
  }
};

// Servimos la documentación usando el objeto directo
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ---- RUTAS LÓGICAS DE TU APLICACIÓN ----

app.get('/efectos', (req, res) => {
  res.json(db.prepare('SELECT * FROM efectos_secundarios ORDER BY fecha_registro DESC').all());
});

app.post('/efectos', (req, res) => {
  const { medicamento, reaccion } = req.body;
  if (!medicamento || !reaccion) {
    return res.status(400).json({ error: 'El nombre del medicamento y la reacción son obligatorios' });
  }
  const r = db.prepare('INSERT INTO efectos_secundarios (medicamento, reaccion) VALUES (?, ?)').run(medicamento, reaccion);
  res.status(201).json({ id: r.lastInsertRowid, medicamento, reaccion, mensaje: 'Registro guardado en el historial' });
});

app.get('/efectos/verificar/:nombreMedicamento', (req, res) => {
  const registro = db.prepare('SELECT * FROM efectos_secundarios WHERE UPPER(medicamento) = UPPER(?)').get(req.params.nombreMedicamento);
  if (registro) {
    return res.json({ riesgo: true, advertencia: `⚠️ ADVERTENCIA: Este medicamento ya registró un efecto secundario previo (${registro.reaccion}). Evite su uso.` });
  }
  res.json({ riesgo: false, mensaje: 'No hay registros de efectos secundarios para este medicamento.' });
});

app.listen(3000, () => console.log('MedicApp API corriendo con éxito'));