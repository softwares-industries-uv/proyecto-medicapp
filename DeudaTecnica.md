# Deuda Técnica, Code Smells y Mejoras de Diseño

## 1. Code smells / deuda técnica identificada

| ID    | Ubicación (archivo/módulo)              | Descripción del problema                                                                                                                                          | Propuesta de mejora                                                                                                              |
|-------|-----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| DT-01 | `db.js`                                 | Las contraseñas se almacenan y comparan en texto plano. El seed inserta directamente `'admin123'` sin ningún hash, y `doctorService.js` las consulta igual en SQL. | Usar `bcrypt` para hashear al registrar y `bcrypt.compare()` al autenticar. Nunca almacenar ni comparar contraseñas en claro.    |
| DT-02 | `db.js`                                 | Los datos de prueba (pacientes y médico) se insertan dentro del módulo de inicialización de la BD, mezclando responsabilidades de configuración y seed.            | Mover el seed a un script separado (`scripts/seed.js`) ejecutable con `npm run seed`, sin que corra en el arranque normal.       |
| DT-03 | `patientRoutes.js`                      | Todos los endpoints de pacientes (`GET /:id`, `POST /historial`, `POST /efectos`, `GET /efectos/:id`) son públicos sin ningún middleware de autenticación.         | Implementar JWT en el login del médico y un middleware `authMiddleware` que verifique el token antes de cada ruta protegida.     |
| DT-04 | `controllers/patientController.js`      | El método `getEffects` no tiene try/catch, a diferencia de `addHistory` y `addEffect` del mismo controlador. Un fallo en la BD causaría un crash sin respuesta controlada. | Envolver `getEffects` en try/catch o implementar un middleware de errores centralizado en Express para todos los handlers.       |
| DT-05 | `index.js`                              | El objeto `swaggerDocument` tiene `paths: {}` vacío. La dependencia `swagger-ui-express` está instalada pero la documentación en `/docs` no refleja ningún endpoint real. | Completar `paths` con los endpoints existentes, o migrar a anotaciones JSDoc con `swagger-jsdoc` (ya incluido en `package.json`). |

---

## 2. Mejoras de diseño futuras

- **Autenticación con JWT:** El sistema actual no mantiene sesión tras el login; cada request posterior no verifica identidad. Implementar tokens JWT permitiría proteger todos los endpoints, controlar expiración de sesiones y escalar el sistema sin estado en el servidor.

- **Separación de entornos con variables de entorno:** No existe archivo `.env` ni distinción entre entornos de desarrollo y producción. Usar `dotenv` con archivos `.env.development` y `.env.production` permitiría configurar la BD, el puerto y las credenciales sin modificar código fuente.

- **Pruebas automatizadas:** No hay ningún test unitario ni de integración. Agregar Jest con Supertest permitiría verificar automáticamente los endpoints en cada PR, reduciendo el riesgo de regresiones al avanzar en el proyecto.

- **Validación de inputs en capa de servicio:** Actualmente solo se valida si los campos están presentes, pero no su formato ni tipo (por ejemplo, que `paciente_id` sea un número entero positivo, o que el RUT tenga formato válido). Usar una librería como `zod` o `joi` permitiría validaciones más robustas y mensajes de error consistentes.
