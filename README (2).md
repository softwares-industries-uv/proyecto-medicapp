# Proyecto MedicApp

## Lista de historias de usuario

| ID   | Nombre                                                | Issue |
|------|-------------------------------------------------------|-------|
| HU01 | Registrar Duracion tratamiento                        |  #12  |
| HU02 | Recibir recordatorios o notificaciones                |  #13  |
| HU03 | Ver stock y medicamentos registrados                  |  #14  |
| HU04 | Ver el historial de medicamentos y dosis              |  #16  |
| HU05 | Registrar alergias/efectos al medicamento             |  #17  |
| HU06 | Ver estado de salud del paciente                      |  #18  |
| HU07 | Ver disponibilidad en hospitales/clinicas             |  #20  |
| HU08 | Informacion sobre consulta medica                     |  #21  |
| HU09 | Dar acceso a informacion medica a otros               |  #22  |
| HU10 | Poder registrarse en la app como usuario              |  #24  |
| HU11 | Poder iniciar sesion en la app como usuario           |  #25  |
| HU12 | Editar duracion del tratamiento                       |  #26  |
| HU13 | Ver cumplimiento tratamiento del paciente             |  #27  |
| HU14 | Poder registrarse en la app como medico               |  #28  |
| HU15 | Poder iniciar sesion en la app como medico            |  #29  |
| HU16 | Acceder al perfil del paciente                        |  #30  |

---

## Responsabilidades del equipo (Entrega 2)

| Integrante             | Rol           | Items de la rubrica a cargo                        |
|------------------------|---------------|----------------------------------------------------|
| Fabián Gamboa          | Developer     | Historias usuario y Clarita Review                 |
| Sebastián Rodriguez    | Scrum Master  | Github Workflow y Revisión                         |
| Benjamin Quesada       | Developer     | APIs y Thunder Client                              |
| Renato Pereira         | Product Owner | Revisión de cambios                                |

---

## Descripcion del sistema

**MedicApp** es una aplicacion que permite a pacientes gestionar sus tratamientos medicos, ya sean ligeros o severos, mediante recordatorios, control de medicamentos y seguimiento del historial medico. Está dirigida principalmente a personas sometidas a un tratamiento medico, pero también está disponible para familiares o el publico en general.

Funcionalidades principales:
- **Recordatorio de medicamentos:** notificaciones para alertar al usuario a tiempo y mejorar el cumplimiento del tratamiento
- **Gestion de tratamientos:** registro de dosis, frecuencia y duracion
- **Historial medico:** almacena informacion de los tratamientos para facilitar el seguimiento y uso en consultas medicas
- **Acceso para familiares:** otorga acceso a terceros autorizados para apoyar y mantener historial medico del paciente
- **Busqueda de centros medicos:** muestra centros de salud cercanos usando la ubicacion del usuario
- **Informacion sobre medicamentos:** busqueda de informacion relevante para un uso informado y seguro

---

## Instalacion y ejecucion

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm (incluido con Node.js)

### Pasos

**1. Clonar el repositorio**

```bash
git clone https://github.com/softwares-industries-uv/proyecto-medicapp.git
cd proyecto-medicapp
```

**2. Instalar dependencias**

```bash
npm install
```

> Esto instalara todas las dependencias listadas en `package.json`, incluyendo `express`, `better-sqlite3` y `swagger-ui-express`.

**3. Iniciar el servidor**

```bash
npm start
```

El servidor queda disponible en: `http://localhost:3000`

**4. Verificar funcionamiento**

Abre el navegador en `http://localhost:3000`. Si la autenticacion esta activa (por defecto), redirigira al login de medico.

La documentacion Swagger de la API esta disponible en: `http://localhost:3000/docs`

### Variables de entorno (opcionales)

| Variable       | Descripcion                                               | Valor por defecto |
|----------------|-----------------------------------------------------------|-------------------|
| `AUTH_ENABLED` | Activa o desactiva el flujo de autenticacion (`true/false`) | `true`            |

Ejemplo para desactivar la autenticacion durante desarrollo:

```bash
AUTH_ENABLED=false npm start
```

### Datos de prueba incluidos

La base de datos se inicializa automaticamente con datos de prueba al primer arranque:

- **Medico:** RUT `12345678-9`, password `admin123`, institución `Hospital Princeton-Plainsboro`
- **Pacientes:** Benjamín Quezada (RUT `21234567-8`) y Antonella Silva (RUT `22345678-9`)

---

## Workflow GitHub

Se realizo el uso de branches para apoyar el desarrollo colaborativo del proyecto. Las funcionalidades se desarrollaron en ramas separadas (`sub-main`, `workflow-final`) y se integraron a `main` mediante Pull Requests revisados por el equipo.
