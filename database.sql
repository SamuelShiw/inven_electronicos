CREATE DATABASE inventario_tienda;

USE inventario_tienda;

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  precio DECIMAL(10,2),
  stock INT,
  imagen VARCHAR(255)
);