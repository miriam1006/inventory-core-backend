📦 Inventory Core Backend

API RESTful empresarial para la gestión integral de inventarios, desarrollada bajo principios de arquitectura limpia, seguridad robusta y escalabilidad.

Este proyecto simula un backend productivo real, aplicando buenas prácticas modernas en autenticación, modelado relacional, contenedorización y separación de responsabilidades.

🎯 Objetivo del Proyecto

Construir una API sólida y escalable que permita:

Gestión de productos y stock

Autenticación segura con control de roles

Persistencia relacional optimizada

Manejo estructurado de archivos

Despliegue portable mediante contenedores

Enfocado en demostrar dominio de backend profesional con Node.js y TypeScript.

🛠️ Tech Stack
Backend (Core API)

Framework: NestJS

Runtime: Node.js

Lenguaje: TypeScript

Arquitectura: Modular (Controllers, Services, Modules)

Seguridad

JSON Web Tokens (JWT)

Role-Based Access Control (RBAC)

Bcrypt para hash de contraseñas

Guards y estrategias personalizadas

Persistencia

PostgreSQL

TypeORM (ORM relacional)

Relaciones entre entidades y validaciones estructuradas

Infraestructura

Docker

Docker Compose

Variables de entorno configurables

🚀 Características Principales
🔐 Autenticación y Autorización

Registro y login de usuarios

Generación y validación de JWT

Protección de rutas mediante Guards

Control de acceso basado en roles (Admin / User)

📦 Gestión de Inventario

CRUD completo de productos

Control de stock

Validaciones mediante DTOs

Relaciones entre entidades

📁 Gestión de Archivos

Subida de archivos asociados a productos

Validación de tipos de archivo

Manejo estructurado dentro del backend

🐳 Contenedorización

Configuración lista para levantar entorno completo (App + DB)

Entornos consistentes para desarrollo y pruebas

Separación de servicios mediante Docker Compose

📂 Estructura del Proyecto
inventory-core-backend/
├── src/
│   ├── auth/        # Autenticación y protección de rutas
│   ├── users/       # Gestión de usuarios
│   ├── products/    # CRUD de productos y control de stock
│   ├── files/       # Módulo de carga de archivos
│   └── common/      # DTOs, interfaces y utilidades compartidas
│
├── docker-compose.yml  # Orquestación de servicios
├── Dockerfile
└── .env.template

Arquitectura modular siguiendo principios de inyección de dependencias y separación de responsabilidades.

⚙️ Instalación y Uso
1️⃣ Clonar el repositorio
git clone https://github.com/miriam1006/inventory-core-backend.git
cd inventory-core-backend
2️⃣ Configurar variables de entorno
cp .env.template .env

Configurar:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_NAME=inventory_db
JWT_SECRET=tu_secret
3️⃣ Levantar servicios con Docker
docker-compose up -d

La API estará disponible en:

http://localhost:3000/api
📌 Endpoints Principales

POST /auth/login

POST /auth/register

GET /products

POST /products

PATCH /products/:id

DELETE /products/:id

🧠 Conceptos Aplicados

Clean Architecture (modularización por dominio)

Inyección de dependencias

Validación con DTOs

Seguridad basada en roles

Persistencia relacional con ORM

Contenedorización profesional

🔮 Posibles Mejoras Futuras

Tests unitarios y e2e (Jest)

Rate limiting

Logs estructurados (Winston)

Integración con almacenamiento externo (S3)

CI/CD pipeline

Documentación automática con Swagger

👩‍💻 Sobre el Proyecto

Desarrollado por Miriam G. como proyecto de portafolio enfocado en backend empresarial con Node.js.
