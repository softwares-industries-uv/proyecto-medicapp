# Casos de Prueba – US-29 Inicio de Sesión Médico

| ID    | Qué se debe hacer (acción / entrada)                                                | Salida esperada                                                                                                |
| ----- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| CP-01 | Ingresar RUT, contraseña e institución médica válidos y presionar "Iniciar Sesión". | El sistema autentica al médico, crea la sesión y redirige al panel médico mostrando el mensaje de bienvenida.  |
| CP-02 | Ingresar RUT válido pero contraseña incorrecta.                                     | El sistema rechaza el acceso y muestra un mensaje indicando que las credenciales son inválidas.                |
| CP-03 | Dejar uno o más campos vacíos e intentar iniciar sesión.                            | El sistema impide el inicio de sesión y muestra un mensaje indicando que todos los campos son obligatorios.    |
| CP-04 | Iniciar sesión correctamente y navegar por las distintas vistas del panel médico.   | La sesión permanece activa y el usuario mantiene acceso a las funcionalidades autorizadas.                     |
