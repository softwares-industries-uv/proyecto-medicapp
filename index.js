const express      = require('express');
const db           = require('./db');
const swaggerUi    = require('swagger-ui-express');

const app = express();
app.use(express.json());

// Documentación JSON Plana (Cero riesgo de colapso en Render)
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "MedicApp API - Control Médico y Paciente",
    version: "2.0.0",
    description: "API para HU #17 (Efectos Secundarios) y HU #30 (Gestión de Perfil por Médicos)"
  },
  servers: [{ url: "https://proyecto-medicapp.onrender.com" }],
  paths: {
    "/pacientes/{id}": {
      "get": {
        "summary": "HU #30 - Médico accede al perfil del paciente para ver su info",
        "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }],
        "responses": { "200": { "description": "Perfil del paciente e historial clínico devuelto" } }
      }
    },
    "/historial": {
      "post": {
        "summary": "HU #30 - Médico ingresa y guarda información médica en el historial",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "paciente_id": { "type": "integer", "example": 1 },
                  "medico_id": { "type": "integer", "example": 99 },
                  "diagnostico": { "type": "string", "example": "Hipertensión Arterial" },
                  "observaciones": { "type": "string", "example": "Se sugiere suspender Ibuprofeno por reacciones" }
                }
              }
            }
          }
        },
        "responses": { "201": { "description": "Historial registrado correctamente" } }
      }
    },
    "/efectos": {
      "post": {
        "summary": "HU #17 - Paciente registra un efecto secundario",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "paciente_id": { "type": "integer", "example": 1 },
                  "medicamento": { "type": "string", "example": "Ibuprofeno" },
                  "reaccion": { "type": "string", "example": "Gastritis severa" }
                }
              }
            }
          }
        },
        "responses": { "201": { "description": "Efecto secundario guardado en el historial" } }
      }
    },
    "/efectos/paciente/{paciente_id}": {
      "get": {
        "summary": "HU #17 - Accede a la lista de efectos secundarios del paciente",
        "parameters": [{ "name": "paciente_id", "in": "path", "required": true, "schema": { "type": "integer" } }],
        "responses": { "200": { "description": "Lista de efectos secundarios" } }
      }
    }
  }
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ================= LÓGICA DE LAS HISTORIAS DE USUARIO =================

// HU #30: GET - Visualizar perfil e información completa del paciente
app.get('/pacientes/:id', (req, res) => {
  const paciente = db.prepare('SELECT * FROM pacientes WHERE id = ?').get(req.params.id);
  if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

  // Buscamos también sus antecedentes agregados por doctores y sus efectos registrados
  const historial = db.prepare('SELECT * FROM historial_medico WHERE paciente_id = ?').all(paciente.id);
  const efectos = db.prepare('SELECT * FROM efectos_secundarios WHERE paciente_id = ?').all(paciente.id);

  res.json({ infoPersonal: paciente, historialClinico: historial, alertasEfectos: efectos });
});

// HU #30: POST - Médico guarda registro en el historial clínico
app.post('/historial', (req, res) => {
  const { paciente_id, medico_id, diagnostico, observaciones } = req.body;
  if (!paciente_id || !medico_id || !diagnostico) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para el registro clínico' });
  }

  const r = db.prepare(
    'INSERT INTO historial_medico (paciente_id, medico_id, diagnostico, observaciones) VALUES (?, ?, ?, ?)'
  ).run(paciente_id, medico_id, diagnostico, observaciones);

  res.status(201).json({ id: r.lastInsertRowid, mensaje: 'Historial médico registrado correctamente' });
});

// HU #17: POST - Paciente registra efecto secundario
app.post('/efectos', (req, res) => {
  const { paciente_id, medicamento, reaccion } = req.body;
  if (!paciente_id || !medicamento || !reaccion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const r = db.prepare(
    'INSERT INTO efectos_secundarios (paciente_id, medicamento, reaccion) VALUES (?, ?, ?)'
  ).run(paciente_id, medicamento, reaccion);

  res.status(201).json({ id: r.lastInsertRowid, mensaje: 'Efecto secundario guardado en el historial' });
});

// HU #17: GET - Listar efectos de un paciente específico
app.get('/efectos/paciente/:paciente_id', (req, res) => {
  const lista = db.prepare('SELECT * FROM efectos_secundarios WHERE paciente_id = ? ORDER BY fecha_registro DESC').all(req.params.paciente_id);
  res.json(lista);
});

app.listen(3000, () => console.log('Servidor corriendo con éxito en el puerto 3000'));