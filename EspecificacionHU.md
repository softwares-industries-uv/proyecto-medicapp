# Especificación de Historia de Usuario
 
## HU-15: poder iniciar sesion como medico
Como médico, quiero iniciar sesión en la aplicación, para acceder a sus funcionalidades
 
 
## Criterios de aceptación
- CA1: Dado que el médico ingresa un RUT, contraseña e institución médica válidos, cuando intenta iniciar sesión, entonces el sistema autentica sus credenciales y le permite acceder a la interfaz correspondiente a su rol
- CA2: Dado que el médico ha iniciado sesión correctamente, cuando navega por la aplicación, entonces el sistema mantiene la sesión activa hasta que cierre sesión o esta expire
- CA3: Dado que el médico ingresa datos inválidos o incompletos, cuando intenta iniciar sesión, entonces el sistema muestra un mensaje de error indicando que las credenciales ingresadas no son válidas
 
## Definition of Done (criterios que garsntizan que se ha desarrollado bien, como uso de PR, revisión de code smells, etc)
1. El medico es capaz de iniciar sesion en MedicApp usando un inicio de sesión separado al del usuario, una vez iniciada sesion, el medico puede acceder a una interfaz correpondiente a su rol, distinta a la del usuario común
2. La lógica de negocio queda separada en routes/, controllers/ y services/, cada capa con una sola responsabilidad
3. El frontend es HTML + fetch vanilla, sin frameworks, servido por el mismo servidor Express
4. La API responde con códigos HTTP semánticamente correctos: 201 al crear, 400 para datos inválidos, 404 si no existe, 500 para errores del servidor


