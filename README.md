# 📦 Inventory Core Backend

API RESTful empresarial para la gestión integral de inventarios, desarrollada bajo principios de arquitectura limpia, seguridad robusta y escalabilidad.

Este proyecto forma parte de mi portafolio backend y demuestra implementación profesional de autenticación, control de acceso, modelado relacional y contenedorización.

---

## 🎯 Objetivo del Proyecto

Construir una API sólida y escalable que permita:

* Gestión completa de productos y stock
* Autenticación segura con JWT
* Control de acceso basado en roles (RBAC)
* Persistencia relacional optimizada
* Entornos consistentes mediante Docker

Enfocado en demostrar dominio backend con NestJS y TypeScript.

---

## 🛠️ Tech Stack

### Backend (Core API)

* **Framework:** NestJS
* **Runtime:** Node.js
* **Lenguaje:** TypeScript
* **Arquitectura:** Modular (Controllers, Services, Modules)

### Seguridad

* JSON Web Tokens (JWT)
* Role-Based Access Control (RBAC)
* Bcrypt para hash de contraseñas
* Guards y estrategias personalizadas

### Persistencia

* PostgreSQL
* TypeORM (ORM relacional)
* Relaciones entre entidades y validaciones estructuradas

### Infraestructura

* Docker
* Docker Compose
* Variables de entorno configurables

---

## 🚀 Características Principales

### 🔐 Autenticación y Autorización

* Registro y login de usuarios
* Generación y validación de JWT
* Protección de rutas mediante Guards
* Control de acceso basado en roles

---

### 📦 Gestión de Inventario

* CRUD completo de productos
* Control de stock
* Validaciones mediante DTOs
* Relaciones entre entidades

---

### 📁 Gestión de Archivos

* Subida de archivos asociados a productos
* Validación de tipos de archivo
* Manejo estructurado dentro del backend

---

### 🐳 Contenedorización

* Configuración lista para levantar entorno completo (App + DB)
* Entornos consistentes para desarrollo y pruebas
* Separación de servicios mediante Docker Compose

---

## 📂 Estructura del Proyecto

```bash
inventory-core-backend/
├── src/
│   ├── auth/        # Autenticación y protección de rutas
│   ├── users/       # Gestión de usuarios
│   ├── products/    # CRUD de productos y control de stock
│   ├── files/       # Módulo de carga de archivos
│   └── common/      # DTOs, interfaces y utilidades compartidas
│
├── docker-compose.yml   # Orquestación de servicios (App + DB)
├── Dockerfile
└── .env.template
```

Arquitectura modular siguiendo principios de inyección de dependencias y separación de responsabilidades.

---

## ⚙️ Instalación y Uso

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/miriam1006/inventory-core-backend.git
cd inventory-core-backend
```

---

### 2️⃣ Configurar variables de entorno

```bash
cp .env.template .env
```

Editar el archivo `.env` con tus credenciales:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_NAME=inventory_db
JWT_SECRET=tu_secret
```

---

### 3️⃣ Levantar servicios con Docker

```bash
docker-compose up -d
```

---

## 🌐 Acceso

La API estará disponible en:

```
http://localhost:3000/api
```

---

## 📌 Endpoints Principales

```
POST   /auth/login
POST   /auth/register
GET    /products
POST   /products
PATCH  /products/:id
DELETE /products/:id
```

---

## 🧠 Conceptos Aplicados

* Arquitectura modular con NestJS
* Inyección de dependencias
* Validación estructurada con DTOs
* Seguridad basada en roles
* Persistencia relacional con ORM
* Contenedorización profesional

---

## 🔮 Mejoras Futuras

* Tests unitarios y e2e con Jest
* Rate limiting
* Logs estructurados (Winston o Pino)
* Integración con almacenamiento externo (S3)
* Documentación automática con Swagger
* Pipeline CI/CD

---

## 👩‍💻 Sobre el Proyecto

Desarrollado por **Miriam G.** como proyecto enfocado en backend empresarial con Node.js.
