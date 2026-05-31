const Database = require('better-sqlite3');
const db = new Database('medicapp.db');

// Creamos la tabla adaptada a la historia de usuario
db.prepare(`
  CREATE TABLE IF NOT EXISTS efectos_secundarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medicamento TEXT NOT NULL,
    reaccion TEXT NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = db;