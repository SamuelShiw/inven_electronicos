# 🧾 Sistema de Inventario de Productos Electrónicos

Aplicación web desarrollada con **Node.js, Express y MySQL** que permite gestionar productos electrónicos mediante operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

---

## 🎯 Objetivo

Desarrollar un sistema backend conectado a una base de datos MySQL y exponer sus funcionalidades a través de una interfaz web simple para la gestión de inventario.

---

## ⚙️ Funcionalidades

- ✅ Registrar nuevos productos
- 📋 Listar productos almacenados
- ✏️ Editar productos existentes
- 🗑️ Eliminar productos
- ✔️ Validación de datos en formulario
- 🔔 Alertas visuales de éxito, error e información
- 📊 Contador de productos y stock total

---

## 🧱 Arquitectura del Proyecto

El sistema sigue una estructura modular basada en separación de responsabilidades:


crud-inventario-electronicos/
│
├── app.js # Servidor principal
├── config/
│ └── db.js # Conexión a MySQL
├── controllers/
│ └── productosController.js # Lógica CRUD
├── routes/
│ └── productos.js # Definición de rutas API
├── public/
│ ├── index.html # Interfaz web
│ ├── styles.css # Estilos
│ └── script.js # Lógica frontend
├── package.json
└── .gitignore


---

## 🧰 Tecnologías Utilizadas

- **Node.js** – Entorno de ejecución
- **Express** – Framework backend
- **MySQL** – Base de datos relacional
- **JavaScript (Frontend)** – Lógica del cliente
- **HTML5 + CSS3** – Interfaz de usuario

---

## 🗄️ Base de Datos

### Crear base de datos:

```sql
CREATE DATABASE inventario_tienda;
Seleccionar base de datos:
USE inventario_tienda;
Crear tabla:
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  precio DECIMAL(10,2),
  stock INT,
  imagen VARCHAR(255)
);
🚀 Instalación y Ejecución
1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/crud-inventario-nodejs.git
cd crud-inventario-nodejs
2. Instalar dependencias
npm install
3. Configurar conexión a MySQL

Editar el archivo:

config/db.js

Y configurar:

host: 'localhost',
user: 'root',
password: 'root',
database: 'inventario_tienda',
port: 3307
4. Ejecutar el servidor
npm start
5. Abrir en navegador
http://localhost:3000
🔌 API REST (Endpoints)
Método	Endpoint	Descripción
GET	/api/productos	Listar productos
GET	/api/productos/:id	Obtener producto por ID
POST	/api/productos	Crear producto
PUT	/api/productos/:id	Actualizar producto
DELETE	/api/productos/:id	Eliminar producto
🧪 Pruebas

El sistema fue probado utilizando:

Navegador web
Thunder Client (VS Code)
PowerShell (Invoke-RestMethod)
📈 Posibles Mejoras
🔐 Sistema de autenticación (login)
🔍 Búsqueda y filtrado de productos
📷 Subida real de imágenes
☁️ Deploy en servidor web
📊 Dashboard con métricas
👨‍💻 Autor

Samuel
Estudiante de Ingeniería de Software