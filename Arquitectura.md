Estilo adoptado: Cliente-Servidor

Justificación basada en REF priorizados:

REF ID: REF-01
Descripción: El sistema debe enviar notificaciones de toma de medicamentos en menos de 2 segundos bajo condiciones de alta concurrencia (hasta 1000 usuarios activos simultáneos)
Prioridad: Alta
Como aborda el estilo: El servidor centraliza el procesamiento de alertas, permitiendo escalar la capacidad de envío sin depender de cada dispositivo cliente

REF ID: REF-02
Descripción: El sistema debe estar disponible el 99.9% del tiempo bajo operación normal, para garantizar que el acceso a recetas de emergencia no se vea interrumpido
Prioridad: Alta
Como aborda el estilo: La centralización en el servidor permite implementar redundancia, monitoreo y recuperación ante fallos de forma independiente al cliente

REF ID: REF-03
Descripción: Centralización de datos y fuente de verdad única para recetas médicas y pedidos de farmacia
Prioridad: Alta
Como aborda el estilo: El servidor actúa como única fuente de verdad, evitando duplicidad de datos entre dispositivos y garantizando consistencia en los registros médicos

Explicación textual:

Se eligió arquitectura Cliente-Servidor porque la prioridad principal del sistema es la centralización de datos y la escalabilidad. 
El sistema debe gestionar recetas médicas y pedidos de farmacia que requieren una fuente de verdad única en el servidor para evitar duplicidad,
permitiendo que la app del paciente sea ligera mientras el servidor procesa la lógica pesada de los pedidos.

Al elegir Cliente-Servidor, se añade dependencia de la red, ya que las funciones de telemedicina y compra de medicamentos no funcionarán sin internet. 
Este costo se acepta porque la integridad de las recetas médicas y la coordinación en tiempo real con los repartidores son más críticas que la operación offline,
la cual se cubrirá parcialmente delegando los recordatorios básicos al almacenamiento local del móvil.

Conexiones: Frontend → API (HTTPS/JSON) → Base de Datos (SQL/ORM)

Fundamentación: Descomposición por dominio funcional, agrupando responsabilidades según las grandes funciones del sistema identificadas en el análisis de requerimientos.

Módulo 1: Gestión de Tratamientos

- Responsabilidad: Administrar los horarios, dosis y adherencia de los medicamentos del paciente
- Datos que maneja: Nombre del remedio, frecuencia, duración del tratamiento y registro de tomas realizadas
- Ofrece a otros módulos: Estado de cumplimiento del paciente y disparadores de alertas para las tomas
- Depende de: Módulo de Notificaciones (para disparar recordatorios), Módulo de Marketplace (para recibir actualizaciones de stock).

Módulo 2: Marketplace y Farmacia

- Responsabilidad: Gestionar el catálogo de medicamentos, la compra y el despacho a domicilio
- Datos que maneja: Inventario de farmacias, precios, direcciones de entrega y estado del repartidor
- Ofrece a otros módulos: Confirmación de compra y actualización de stock de medicamentos en el hogar
- Depende de: Módulo de Gestión de Tratamientos (para registrar llegada de nuevas cajas de remedios), Módulo de Notificaciones (para avisar al paciente sobre el estado del despacho)

Módulo 3: Telemedicina

- Responsabilidad: Gestionar la comunicación entre médicos y pacientes y la emisión de recetas
- Datos que maneja: Agenda de citas, perfiles médicos, historial de consultas y recetas digitales (PDF/QR)
- Ofrece a otros módulos: Nuevas recetas para automatizar la configuración del tratamiento
- Depende de: Módulo de Gestión de Tratamientos (para revisar si el paciente ha seguido sus tomas antes de la cita), Módulo de Marketplace (para permitir la compra directa del medicamento recetado)

Módulo 4: Notificaciones

- Responsabilidad: Asegurar que las alertas críticas lleguen al usuario en el tiempo exacto
- Datos que maneja: Tokens de dispositivo y cola de mensajes pendientes (Push/Locales)
- Ofrece a otros módulos: Servicio de mensajería inmediata para recordatorios y avisos de entrega
- Depende de: Módulo de Gestión de Tratamientos (recibe disparadores de recordatorio de tomas), Módulo de Marketplace (recibe avisos de estado del repartidor)

Conexiones Principales entre Módulos:

- Módulo Telemedicina -> Módulo Gestión de Tratamientos: Consulta el historial de tomas para revisar si el paciente ha seguido su tratamiento antes de la cita
- Módulo Telemedicina -> Módulo Marketplace: Envía la receta para permitir la compra directa del medicamento recetado
- Módulo Gestión de Tratamientos -> Módulo Notificaciones: Solicita el disparo de alertas de recordatorio en el celular a la hora exacta
- Módulo Marketplace -> Módulo Gestión de Tratamientos: Actualiza el stock para registrar la llegada de nuevas cajas de remedios tras la entrega
- Módulo Marketplace -> Módulo Notificaciones: Envía aviso para informar que el repartidor está cerca del domicilio

Decisiones de Diseño:

Decisión 1: Estilo Arquitectónico Cliente-Servidor

- Decisión: Adoptar arquitectura Cliente-Servidor como estilo principal del sistema
- Motivación: La prioridad principal es la centralización de datos (REF-03) y la escalabilidad para soportar alta concurrencia (REF-01). Se requiere una fuente de verdad única para recetas médicas y pedidos de farmacia
- Alternativas consideradas: Microservicios (mayor complejidad operacional para el equipo actual), Monolítico (menor escalabilidad ante crecimiento de usuarios)
- Impacto: Todos los módulos exponen sus servicios a través de la API central; el frontend permanece ligero y sin lógica de negocio compleja

Decisión 2: Trade-off — Dependencia de Red vs. Integridad de Datos

- Decisión: Aceptar dependencia obligatoria de red para las funciones principales (telemedicina, compra de medicamentos), cubriendo operación offline solo para recordatorios básicos mediante almacenamiento local del móvil
- Motivación: La integridad de las recetas médicas y la coordinación en tiempo real con repartidores (REF-02) son más críticas que la operación offline completa
- Alternativas consideradas: Modo offline completo con sincronización posterior (mayor complejidad de resolución de conflictos en datos médicos
- Impacto: Mejora la consistencia y disponibilidad de datos médicos críticos; limita el uso del sistema en zonas sin conectividad, mitigado parcialmente con recordatorios locales

Decisión 3: Requisitos Arquitectónicamente Significativos (ASR)

- ASR 1: El sistema debe enviar notificaciones de toma de medicamentos en menos de 2 segundos bajo condiciones de alta concurrencia (hasta 1000 usuarios activos simultáneos).
  Abordado mediante el Módulo de Notificaciones centralizado con cola de mensajes
- ASR 2: El sistema debe estar disponible el 99.9% del tiempo bajo operación normal, para garantizar que el acceso a recetas de emergencia no se vea interrumpido.
  Abordado mediante la centralización en servidor con capacidad de redundancia y monitoreo
