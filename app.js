const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const productosRoutes = require('./routes/productos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', productosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});