# Gestor de Opiniones

## 📋 Descripción

**Gestor de Opiniones** es una aplicación backend desarrollada en JavaScript/Node.js que proporciona una API RESTful para gestionar opiniones, publicaciones, usuarios y comentarios. Este proyecto es una actividad académica que implementa un sistema completo de gestión de contenido con autenticación de usuarios.

## 🎯 Características Principales

- ✅ **Gestión de Usuarios**: Registro, autenticación y gestión de perfiles de usuario
- ✅ **Publicaciones**: Crear, leer, actualizar y eliminar publicaciones
- ✅ **Comentarios**: Sistema de comentarios en publicaciones
- ✅ **Autenticación**: Sistema seguro de autenticación de usuarios
- ✅ **API RESTful**: Interfaz estándar para consumir los servicios

## 🛠️ Tecnologías Utilizadas

- **Runtime**: Node.js
- **Lenguaje**: JavaScript
- **Dependencias**: Ver archivo `package.json`
- **Herramientas de Prueba**: Postman (incluida la colección de pruebas)

## 📁 Estructura del Proyecto

```
GestorDeOpiniones/
├── src/
│   ├── user/              # Módulo de gestión de usuarios
│   ├── register/          # Módulo de registro
│   ├── publication/       # Módulo de publicaciones
│   └── comments/          # Módulo de comentarios
├── configs/               # Archivos de configuración
├── index.js              # Archivo principal de la aplicación
├── package.json          # Dependencias del proyecto
├── package-lock.json     # Lock file de dependencias
├── .env                  # Variables de entorno
└── Gestor de Opiniones.postman_collection.json  # Colección de pruebas Postman
```

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js (v12 o superior)
- npm (viene con Node.js)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/EduardoLG/GestorDeOpiniones.git
   cd GestorDeOpiniones
   ```

2. **Instalar las dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar el archivo .env con tus configuraciones
   ```

4. **Iniciar la aplicación**
   ```bash
   npm start
   ```

La aplicación estará disponible en `http://localhost:PORT` (verifica la configuración en el archivo `.env`)

## 📚 Uso de la API

### Endpoints Principales

#### Usuarios
- `POST /users/register` - Registrar nuevo usuario
- `POST /users/login` - Iniciar sesión
- `GET /users/:id` - Obtener información del usuario
- `PUT /users/:id` - Actualizar perfil de usuario

#### Publicaciones
- `GET /publications` - Obtener todas las publicaciones
- `POST /publications` - Crear nueva publicación
- `GET /publications/:id` - Obtener publicación específica
- `PUT /publications/:id` - Actualizar publicación
- `DELETE /publications/:id` - Eliminar publicación

#### Comentarios
- `GET /publications/:id/comments` - Obtener comentarios de una publicación
- `POST /publications/:id/comments` - Agregar comentario
- `DELETE /comments/:id` - Eliminar comentario

## 🧪 Pruebas con Postman

Se incluye una colección de Postman (`Gestor de Opiniones.postman_collection.json`) que contiene ejemplos de todas las solicitudes API.

### Importar la colección:
1. Abre Postman
2. Click en "Import"
3. Selecciona el archivo `Gestor de Opiniones.postman_collection.json`
4. Los endpoints estarán listos para probar

## 🔐 Seguridad

- La aplicación implementa autenticación de usuarios
- Las variables sensibles deben guardarse en el archivo `.env`
- **Nunca** commits archivos `.env` con datos sensibles al repositorio

## 📦 Dependencias

Para ver todas las dependencias del proyecto, revisa el archivo `package.json`:

```bash
npm list
```

## 👨‍💻 Desarrollo

### Estructura del Código
- Modularización por características (users, publications, comments, register)
- Separación de concerns
- Fácil mantenimiento y escalabilidad

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📧 Contacto

- **Autor**: EduardoLG
- **GitHub**: [@EduardoLG](https://github.com/EduardoLG)

## 🎓 Recursos Útiles

- [Documentación de Node.js](https://nodejs.org/docs/)
- [Guía de Express.js](https://expressjs.com/)
- [REST API Best Practices](https://restfulapi.net/)
- [Documentación de Postman](https://learning.postman.com/)