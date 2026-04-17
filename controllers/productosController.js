const connection = require('../config/db');

exports.crearProducto = (req, res) => {
  const producto = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    stock: req.body.stock,
    imagen: req.body.imagen || ''
  };

  connection.query('INSERT INTO productos SET ?', producto, (err, result) => {
    if (err) {
      console.error('Error al crear producto:', err);
      return res.status(500).json({ error: 'Error al crear producto' });
    }

    res.json({
      mensaje: 'Producto creado exitosamente',
      id: result.insertId
    });
  });
};

exports.listarProductos = (req, res) => {
  connection.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('Error al listar productos:', err);
      return res.status(500).json({ error: 'Error al listar productos' });
    }

    res.json(results);
  });
};

exports.obtenerProductoPorId = (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al obtener producto:', err);
      return res.status(500).json({ error: 'Error al obtener producto' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(results[0]);
  });
};

exports.actualizarProducto = (req, res) => {
  const id = req.params.id;

  const productoActualizado = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    stock: req.body.stock,
    imagen: req.body.imagen || ''
  };

  connection.query(
    'UPDATE productos SET ? WHERE id = ?',
    [productoActualizado, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar producto:', err);
        return res.status(500).json({ error: 'Error al actualizar producto' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      res.json({ mensaje: 'Producto actualizado exitosamente' });
    }
  );
};

exports.eliminarProducto = (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar producto:', err);
      return res.status(500).json({ error: 'Error al eliminar producto' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado exitosamente' });
  });
};