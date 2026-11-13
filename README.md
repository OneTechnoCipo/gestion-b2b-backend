```markdown
# Sistema de Gestion B2B / Clinica Ocupacional

proyecto desarrollado para la materia de Practicas Profesionalizantes de la Tecnicatura Superior en Desarrollo de Software Full Stack. consiste en una aplicacion web full-stack orientada al ambito empresarial y de salud ocupacional, permitiendo administrar clientes corporativos, autenticacion segura y gestion de archivos adjuntos.

---

## Stack Tecnico y Caracteristicas

- **Backend:** Node.js v22 & Express con TypeScript (`tsx watch`).
- **Base de Datos & ORM:** PostgreSQL corriendo en contenedor Docker con TypeORM, entidades y soporte para busquedas.
- **Seguridad & Autenticacion:** JWT (JSON Web Tokens) para control de sesiones y proteccion de rutas mediante middleware.
- **Validacion de Datos:** Joi para validacion estricta de variables de entorno y esquemas, junto con validacion de inputs para frenar payloads invalidos.
- **Gestion de Archivos:** Multer para la subida de logos y documentacion corporativa con almacenamiento local y ruta estatica.
- **Frontend:** HTML5, Tailwind CSS y JavaScript vanilla servido de forma estatica desde el propio servidor Express.

---

## Por que un proyecto propio en lugar de otra propuesta?

Para esta cursada decidi enfocar el desarrollo hacia un sistema de gestion B2B orientado a una clinica ocupacional. La razon principal fue la oportunidad de resolver una necesidad real del sector corporativo y de salud laboral, automatizando el control de empresas clientes, fichas y reportes.

Aunque se estructuro desde cero como un proyecto independiente, se diseno y adapto estrictamente para cumplir con todos los requerimientos academicos solicitados por la catedra (arquitectura modular, ORM, seguridad con JWT y validaciones robustas), logrando asi equilibrar una aplicacion funcional del mundo real con los criterios de evaluacion de las practicas profesionalizantes.

---

## Explicacion de los Puntos Solicitados por la Catedra (Backend)

### 1. Autenticacion y Seguridad con JWT
El sistema cuenta con un modulo completo de autenticacion (`/api/auth/register` y `/api/auth/login`). Al iniciar sesion con credenciales validas, el backend genera un token cifrado (JWT) que permite validar las rutas protegidas y mantener la sesion del usuario activa de forma segura en el cliente.

### 2. Validacion de Datos con Joi
Para garantizar la integridad de la informacion que ingresa al sistema (como el registro de usuarios o la creacion de nuevas empresas), se implementaron middlewares de validacion utilizando Joi. Esto rechaza cualquier solicitud que no cumpla con el formato o los tipos de datos esperados antes de llegar a la base de datos.

### 3. Persistencias con TypeORM y PostgreSQL
La conexion con la base de datos esta gestionada mediante TypeORM utilizando entidades tipadas en TypeScript. Se estructuro una base de datos relacional en PostgreSQL (ejecutada mediante Docker) para administrar las tablas de usuarios y de empresas clientes de manera limpia y mantenible.

### 4. Carga de Archivos con Multer
El sistema incluye la capacidad de subir archivos (como logotipos o documentacion adjunta de las empresas) mediante `multer`. Los archivos se almacenan en una carpeta estatica del servidor (`/uploads`), permitiendo asociar su ruta directamente al registro de la empresa en la base de datos.

---

## Instrucciones de Instalacion y Ejecucion

sigue estos pasos para levantar el proyecto localmente en tu maquina:

1. **Clonar el repositorio e instalar dependencias:**
   ```bash
   git clone [https://github.com/OneTechnoCipo/gestion-b2b-backend.git](https://github.com/OneTechnoCipo/gestion-b2b-backend.git)
   cd gestion-b2b-backend
   npm install

```

2. **Configurar las variables de entorno:**
crea un archivo `.env` en la raiz del proyecto basandote en el entorno local (asegurate de configurar el puerto de la base de datos segun tu Docker, por ejemplo el `5434`):
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5434
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=gestion_b2b
JWT_SECRET=un_secreto_super_seguro

```


3. **Levantar la base de datos con Docker:**
```bash
docker compose up -d

```


4. **Levantar el servidor de desarrollo:**
```bash
npm run dev

```



una vez hecho esto, ya podes ingresar desde el navegador a `http://localhost:3000` para ver la interfaz, registrarte y empezar a gestionar las empresas.

```

```