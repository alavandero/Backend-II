# BackEnd II - Entrega N° 1

## Sistema Completo de Autenticación y Autorización con JWT

### Descripción
Implementación completa de un sistema de autenticación y autorización con JWT (JSON Web Tokens) que incluye un CRUD completo de usuarios, implementado con Express.js, MongoDB (Mongoose), Passport.js y bcrypt para el hash de contraseñas.

## Características Implementadas

### ✅ 1. Modelo de Usuario
- **first_name**: String (requerido)
- **last_name**: String (requerido)
- **email**: String (único, requerido)
- **age**: Number (requerido)
- **password**: String (hash con bcrypt)
- **cart**: ObjectId (referencia a Carts)
- **role**: String (valor por defecto: 'user')

### ✅ 2. Encriptación de Contraseñas
- Utiliza `bcrypt.hashSync()` para encriptar contraseñas
- Métodos `createHash()` y `validatePassword()` implementados en `utils.js`
- Salt rounds: 10 para máxima seguridad

### ✅ 3. Estrategias de Passport
- **JWT Strategy**: Para autenticación con tokens
- **Local Strategy**: Para login y registro
- Configuración completa en `passport.config.js`

### ✅ 4. Sistema de Login/Register
- Endpoints para registro y login de usuarios
- Generación automática de JWT tokens
- Almacenamiento seguro en cookies httpOnly

### ✅ 5. Ruta de Validación
- Endpoint `/api/sessions/current` para validar usuario logueado
- Extracción y validación de datos del JWT

### ✅ 6. CRUD de Usuarios
- **GET** `/api/users` - Obtener todos los usuarios
- **GET** `/api/users/:id` - Obtener usuario por ID
- **POST** `/api/users` - Crear usuario (solo admin)
- **PUT** `/api/users/:id` - Actualizar usuario
- **DELETE** `/api/users/:id` - Eliminar usuario (solo admin)

## Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd BackEnd-II
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar MongoDB**
- Asegúrate de tener MongoDB corriendo localmente en el puerto 27017
- La base de datos se creará automáticamente: `backend_ii_complete`

4. **Ejecutar el servidor**
```bash
npm start
# o
npm run dev
```

El servidor estará disponible en `http://localhost:8080`

## Endpoints de la API

### Sesiones (`/api/sessions`)

#### POST `/api/sessions/register`
Registra un nuevo usuario.

**Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "age": 25,
  "password": "password123"
}
```

#### POST `/api/sessions/login`
Inicia sesión con un usuario existente.

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/sessions/current`
Obtiene los datos del usuario actualmente autenticado.

**Headers:** Requiere cookie `access_token`

#### POST `/api/sessions/logout`
Cierra la sesión del usuario.

### Usuarios (`/api/users`)

#### GET `/api/users`
Obtiene todos los usuarios (requiere autenticación).

#### GET `/api/users/:id`
Obtiene un usuario específico por ID (requiere autenticación).

#### POST `/api/users`
Crea un nuevo usuario (solo administradores).

#### PUT `/api/users/:id`
Actualiza un usuario (admin o propio usuario).

#### DELETE `/api/users/:id`
Elimina un usuario (solo administradores).

## Estructura del Proyecto

```
BackEnd II/
├── package.json              # Dependencias del proyecto
├── README.md                 # Documentación
├── .gitignore               # Git ignore file
└── src/
    ├── server.js             # Servidor principal
    ├── utils.js              # Utilidades (bcrypt, JWT)
    ├── config/
    │   └── passport.config.js # Configuración de Passport
    ├── models/
    │   └── user.model.js     # Modelo de Usuario
    └── routes/
        ├── sessions.router.js # Rutas de autenticación
        └── users.router.js    # Rutas CRUD de usuarios
```

## Seguridad

- **Contraseñas**: Encriptadas con bcrypt (salt rounds: 10)
- **JWT**: Tokens firmados con clave privada
- **Cookies**: httpOnly para prevenir XSS
- **Validación**: Campos requeridos y únicos
- **Autorización**: Control de roles (user/admin)

## Ejemplos de Uso

### 1. Registrar un usuario
```bash
curl -X POST http://localhost:8080/api/sessions/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "age": 25,
    "password": "password123"
  }'
```

### 2. Iniciar sesión
```bash
curl -X POST http://localhost:8080/api/sessions/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

### 3. Obtener usuario actual
```bash
curl -X GET http://localhost:8080/api/sessions/current \
  -b cookies.txt
```

### 4. Obtener todos los usuarios
```bash
curl -X GET http://localhost:8080/api/users \
  -b cookies.txt
```

## Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Passport.js** - Middleware de autenticación
- **JWT** - JSON Web Tokens
- **bcrypt** - Encriptación de contraseñas
- **cookie-parser** - Parseo de cookies

## Criterios de Evaluación Cumplidos

✅ **Modelo de Usuario y Encriptación**: Modelo completo con todos los campos requeridos y encriptación con bcrypt

✅ **Estrategias de Passport**: JWT y Local strategies configuradas correctamente

✅ **Sistema de Login y JWT**: Login funcional con generación de tokens JWT

✅ **Endpoint Current**: `/api/sessions/current` implementado y funcional

✅ **Validación de Usuario**: Extracción precisa de datos del JWT y manejo de errores

✅ **CRUD de Usuarios**: Operaciones completas de Create, Read, Update, Delete

✅ **Autorización**: Control de acceso basado en roles (user/admin) 