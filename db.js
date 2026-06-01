const Database = require('better-sqlite3');
const db = new Database('medicapp.db');

// 1. Tabla de Pacientes (Para la HU del Médico)
db.prepare(`
  CREATE TABLE IF NOT EXISTS pacientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    edad INTEGER,
    rut TEXT UNIQUE NOT NULL
  )
`).run();

// 2. Tabla de Efectos Secundarios (HU #17 - Paciente)
db.prepare(`
  CREATE TABLE IF NOT EXISTS efectos_secundarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER NOT NULL,
    medicamento TEXT NOT NULL,
    reaccion TEXT NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(paciente_id) REFERENCES pacientes(id)
  )
`).run();

// 3. Tabla de Historial Médico (HU #30 - Médico)
db.prepare(`
  CREATE TABLE IF NOT EXISTS historial_medico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    diagnostico TEXT NOT NULL,
    observaciones TEXT,
    fecha_atencion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(paciente_id) REFERENCES pacientes(id)
  )
`).run();

// Insertar datos de prueba si la tabla está vacía (Para que pruebes al tiro)
const infoPacientes = db.prepare('SELECT COUNT(*) as total FROM pacientes').get();
if (infoPacientes.total === 0) {
  db.prepare("INSERT INTO pacientes (nombre, edad, rut) VALUES ('Benjamín Quezada', 21, '21234567-8')").run();
  db.prepare("INSERT INTO pacientes (nombre, edad, rut) VALUES ('Antonella Silva', 22, '22345678-9')").run();
}

module.exports = db;