## 1. Cambio solicitado 

Agregar tele-medicina con videollamada entre paciente y doctor, grabacion de sesiones, y acceso controlado por roles.

Este cambio será una mejora para complementar la relación medico-paciente al permitirles comunicarse a distancia en un horario establecido. También se guardarán hasta un máximo de 3 sesiones anteriores por si el paciente gusta de revisarlas. Para seguridad agregará un firewall y un método de autenticación de usuario. Por ultimo se agregará una función para que la videollamada no obstruya toda la pantalla, dándole un permiso para que pueda estar activa sobre la pantalla

## 2. Nuevas historias de usuario 

### US-01: Fabian 

Como paciente, quiero que se mejore la seguridad de mis datos para que no haya riesgo de robo de informacion personal  

- CA1: dado que un paciente inicia seson, cuando hay inactividad prolongada, entonces se cerrara la sesion
- CA2: Dado que un paciente ingresa erroneamente los datos multiples veces, cuando quiere iniciar sesion, encontes el sistema envia un sms de alenrta al usuario dueño de la cuenta

### US-02: Antonella

Como usuario, me gustaría tener contacto más directo con el doctor, para informar por si hay cambios al doctor
- CA1: Dado que el usuario quiere contactar al doctor, cuando vaya a los chats, entonces abra una opción para tener charla directa con el doctor
-	CA2: Dado que el usuario tiene chat con el doctor, cuando necesiten contacto más directo, entonces estará habilitada la opción de llamada normal o videollamada

## 3. Impacto en requisitos extrafuncionales 

| REF ID | Descripción                    | Prioridad anterior | Prioridad nueva | Cambio / Motivo           | 
|--------|--------------------------------|--------------------|-----------------|---------------------------| 
| REF-01 | Privacidad de los datos        | Alta               | Alta            | Sin cambio                | 
| REF-02 | Escalabilidad                  | Alta             | Alta            | Sin cambio | 
| REF-03 | Desacoplamiento | —                 | Alta            | Nuevo requisito           | 
| REF-04 | Seguridad                | - | Alta | Nuevo requisito

## 4. Impacto en entidades del dominio 

Nueva entidades: 

videollamada:
  - Duracion, fecha, estado de la llamada

Grabacion:
  - Duracion, fecha, tamaño archivo

Usuario/doctor (llama) -> videollamada
videollamada (funcion) -> grabacion

## 5. Impacto en mockups 

Se crea el apartado de "Agendo de hora" para paceintes, chat con doctores, doctor puede realizar videoconferencia, mensajes de seguridad por menu.
https://www.figma.com/design/4ohFM0wISzs91vRRGuoM9z/Medicapp?node-id=0-1&t=hyFypcJx0AJGZbrF-1 

## 6. Impacto en arquitectura 

### 6.1 ¿Cambia el estilo arquitectónico? 

No, sigue siendo arquitectura cliente-servidor, lo unico que hay que agregarle son más modulos, principalmente de seguridad, desacoplamiento en la videollamada

### 6.2 Relación REF (repriorizado) con decisiones de arquitectura 


| REF ID | Prioridad nueva | Decisión de arquitectura que lo aborda         | 
|--------|-----------------|------------------------------------------------| 
| REF-03 | Alta            | La parte de videollamada debe estar aparte y no afectar el uso de la aplicacion  | 
| REF-04 | Alta            | No debe haber fuga de datos, para esto se debe reforzar la seguridad           | 

## 7. Impacto en módulos 

| Módulo             | Tipo de impacto    | Responsabilidad actualizada        | Ofrece a otros (actualizado)   | 
|--------------------|--------------------|------------------------------------|--------------------------------| 
| videollamada | nuevo        | manejo de llamada         | comunicacion entre paciente y doctor      | 
| grabaciones    | nuevo              | almacenamiento de llamada | archivo de gravacion de la llamada                    | 


Fundamentación de cambios modulares: 
Se agregan estos modulos porque al anlizar la solucion propuesta, funcionan para ayudar a mejorar la experiencia del usuario. 

## 8. Nuevas decisiones de diseño 

### Decisión 1 

Decisión 1
Decisión: se decio añadir tres módulos nuevo(telecomunicación,calendario de registro,y chat dr)
Motivación: Se decio añadir esto para darle mas practicidad la app , para que los usuarios. Tengan distintas formas de ser atendidas y esto ayudaría a la gente que tiene movilidad reducida,etc 
Alternativas consideradas: El calendario se puede ver si hay horas disponibles o ocupadas o directamente si el doctor no trabja, las video conferencias son individuales pero no restringen la utilidad de la app.
Impacto: No afecta ningún requerimiento ya que se pudo adaptar con los requerimientos ya tenidos

 

## 9. Trazabilidad actualizada 

| Historia | REF relacionado | Módulo     | Mockup  | 
|----------|-----------------|------------|---------| 
| US-01    | REF-04          | videollamada   | videollamada  | 
| US-02    | REF-03          | grabacion   | grabacion   |  

## 10. Justificación global y trade-offs 
La solución propuesta es coherente con el sistema ya que la arquitectura que tenias planteada es compatible con los nuevos cambios realizados.
No hubieron trade-offs realizados ya que solo implementamos nuevos aspectos y modulos.
Se gana mas seguridad a la información de los usuarios de la app y mayor accesibilidad a doctores sobre el estado del paciente. No se necesito ningun tipo de sacrificio.
