<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

# 🚀 Teslo API

## ▶️ Pasos para iniciar el proyecto

1. 📂 **Clonar el proyecto**
   ```bash
   git clone <url-del-repo>
- 📦 Instalar dependencias
  ```bash
  npm install
- ⚙️ Configurar variables de entorno
- Clonar el archivo .env.template
- Renombrarlo como .env
- Ajustar las variables necesarias
- 🐳 Levantar la base de datos con Docker
  ```bash
  docker-compose up -d
- 💻 Ejecutar el proyecto en modo desarroll
  ```bash
  npm run start:dev
- 🌱 Ejecutar el seed de datos
- Abrir en el navegador: http://localhost:3000/api/seed

____

# 📝 Notas para desarrollo
## 📦 Librerías necesarias
### 🔐 Autenticación y seguridad
- 🔑 bcrypt → Hash de contraseñas
- 🛡️ passport → Middleware de autenticación
- 🛡️ @nestjs/passport → Integración con NestJS
- 🎫 passport-jwt → Estrategia JWT
- 🎫 @nestjs/jwt → Módulo JWT de NestJS
- 🔐 jsonwebtoken → Manejo de tokens JWT

### 🗄️ Base de datos
- 🗃️ @nestjs/typeorm → Integración con TypeORM
- 🗃️ typeorm → ORM
- 🐘 pg → Driver PostgreSQL
(o mysql2 si usas MariaDB/MySQL)

### ⚙️ Utilidades y soporte
- ✅ class-validator → Validaciones en DTOs
- 🔄 class-transformer → Transformaciones en DTOs
- 🌍 dotenv → Variables de entorno
- ⚙️ @nestjs/config → Configuración centralizada
- 🆔 uuid → Identificadores únicos
- 📂 multer → Subida de archivos
- 📦 @nestjs/serve-static → Archivos estáticos


### 🧪 Desarrollo y testing
- 🧪 jest → Testing framework
- 🔍 supertest → Pruebas de integración
- ⚡ ts-node → Ejecución de TypeScript
- 📑 @types/* → Tipados (@types/bcrypt, @types/passport-jwt, @types/uuid)

### 🚀 Instalación rápida
  ```bash
  npm install bcrypt passport @nestjs/passport passport-jwt @nestjs/jwt jsonwebtoken \
  @nestjs/typeorm typeorm pg class-validator class-transformer dotenv @nestjs/config uuid multer @nestjs/serve-static
  ```

- Y para tipados en desarrollo:
  ```bash
  npm install -D @types/bcrypt @types/passport-jwt @types/uuid
  ```






