# Especificación de Historia de Usuario

## US-15: Iniciar sesión como médico
Como médico registrado, quiero iniciar sesión en la aplicación con mis credenciales, para acceder a las funcionalidades del sistema reservadas para profesionales de la salud.

---

## Criterios de aceptación

- CA1: El sistema permite al médico ingresar su RUT, contraseña e institución médica para autenticarse.
- CA2: Si las credenciales son correctas, el sistema responde con los datos del médico autenticado (id, nombre, RUT e institución) y un mensaje de éxito.
- CA3: Si el RUT, la contraseña o la institución médica son incorrectos o no coinciden, el sistema responde con un error 401 y un mensaje indicando credenciales inválidas.
- CA4: Si alguno de los tres campos obligatorios (RUT, contraseña, institución médica) no está presente en la solicitud, el sistema responde con un error 400 indicando que los datos están incompletos.
- CA5: El endpoint de login es accesible en `POST /api/medicos/login` y acepta cuerpo en formato JSON.

---

## Definition of Done

1. El endpoint `POST /api/medicos/login` está implementado y responde correctamente a los casos de éxito y error descritos en los criterios de aceptación.
2. La lógica de autenticación está separada en capas: la ruta delega al controlador, el controlador delega al servicio, y el servicio accede a la base de datos.
3. Los cambios fueron desarrollados en una rama separada de `main` y se integraron mediante un Pull Request.
4. El Pull Request fue revisado por al menos un integrante del equipo antes de hacer merge.
5. Se verificó manualmente el funcionamiento del endpoint usando Thunder Client, con al menos un caso de éxito y un caso de error documentados.
6. No se introducen contraseñas ni datos sensibles hardcodeados en el código fuente de producción (solo en scripts de seed).
7. El código no presenta code smells evidentes: sin funciones duplicadas, nombres descriptivos, manejo de errores en todos los handlers.
