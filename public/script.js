const productoForm = document.getElementById('productoForm');
const productoId = document.getElementById('productoId');
const nombre = document.getElementById('nombre');
const precio = document.getElementById('precio');
const stock = document.getElementById('stock');
const imagen = document.getElementById('imagen');

const errorNombre = document.getElementById('errorNombre');
const errorPrecio = document.getElementById('errorPrecio');
const errorStock = document.getElementById('errorStock');
const errorImagen = document.getElementById('errorImagen');

const tablaProductos = document.getElementById('tablaProductos');
const cancelarEdicion = document.getElementById('cancelarEdicion');
const btnGuardar = document.getElementById('btnGuardar');
const btnLimpiar = document.getElementById('btnLimpiar');
const formTitle = document.getElementById('formTitle');
const alerta = document.getElementById('alerta');
const totalProductos = document.getElementById('totalProductos');
const totalStock = document.getElementById('totalStock');

const API_URL = '/api/productos';

let filaEditandoId = null;

function mostrarAlerta(mensaje, tipo = 'info') {
  alerta.textContent = mensaje;
  alerta.className = `alerta ${tipo}`;
  alerta.style.display = 'block';

  setTimeout(() => {
    alerta.style.display = 'none';
  }, 3000);
}

function limpiarErrores() {
  errorNombre.textContent = '';
  errorPrecio.textContent = '';
  errorStock.textContent = '';
  errorImagen.textContent = '';

  nombre.classList.remove('input-error');
  precio.classList.remove('input-error');
  stock.classList.remove('input-error');
  imagen.classList.remove('input-error');
}

function validarFormulario() {
  limpiarErrores();
  let valido = true;

  const nombreValor = nombre.value.trim();
  const precioValor = precio.value.trim();
  const stockValor = stock.value.trim();
  const imagenValor = imagen.value.trim();

  if (nombreValor === '') {
    errorNombre.textContent = 'El nombre del producto es obligatorio.';
    nombre.classList.add('input-error');
    valido = false;
  } else if (nombreValor.length < 3) {
    errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres.';
    nombre.classList.add('input-error');
    valido = false;
  }

  if (precioValor === '') {
    errorPrecio.textContent = 'El precio es obligatorio.';
    precio.classList.add('input-error');
    valido = false;
  } else if (Number(precioValor) <= 0) {
    errorPrecio.textContent = 'El precio debe ser mayor que 0.';
    precio.classList.add('input-error');
    valido = false;
  }

  if (stockValor === '') {
    errorStock.textContent = 'El stock es obligatorio.';
    stock.classList.add('input-error');
    valido = false;
  } else if (!Number.isInteger(Number(stockValor)) || Number(stockValor) < 0) {
    errorStock.textContent = 'El stock debe ser un número entero mayor o igual a 0.';
    stock.classList.add('input-error');
    valido = false;
  }

  if (imagenValor !== '' && imagenValor.length < 3) {
    errorImagen.textContent = 'El nombre de imagen no es válido.';
    imagen.classList.add('input-error');
    valido = false;
  }

  return valido;
}

async function cargarProductos() {
  try {
    const respuesta = await fetch(API_URL);
    const productos = await respuesta.json();

    tablaProductos.innerHTML = '';

    if (!productos.length) {
      tablaProductos.innerHTML = `
        <tr>
          <td colspan="6" class="empty">No hay productos registrados.</td>
        </tr>
      `;
      totalProductos.textContent = 'Total productos: 0';
      totalStock.textContent = 'Stock total: 0';
      return;
    }

    let sumaStock = 0;

    productos.forEach((producto) => {
      sumaStock += Number(producto.stock);

      const fila = document.createElement('tr');
      fila.id = `fila-${producto.id}`;

      fila.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>S/ ${Number(producto.precio).toFixed(2)}</td>
        <td>${producto.stock}</td>
        <td>${producto.imagen || '-'}</td>
        <td>
          <button class="btn btn-edit" onclick="editarProducto(${producto.id}, '${escapeHtml(producto.nombre)}', '${producto.precio}', '${producto.stock}', '${escapeHtml(producto.imagen || '')}')">
            Editar
          </button>
          <button class="btn btn-delete" onclick="eliminarProducto(${producto.id})">
            Eliminar
          </button>
        </td>
      `;

      tablaProductos.appendChild(fila);
    });

    totalProductos.textContent = `Total productos: ${productos.length}`;
    totalStock.textContent = `Stock total: ${sumaStock}`;
  } catch (error) {
    mostrarAlerta('Error al cargar productos.', 'error');
  }
}

function escapeHtml(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

productoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validarFormulario()) {
    mostrarAlerta('Corrige los campos marcados antes de continuar.', 'error');
    return;
  }

  const producto = {
    nombre: nombre.value.trim(),
    precio: Number(precio.value),
    stock: Number(stock.value),
    imagen: imagen.value.trim()
  };

  try {
    if (productoId.value) {
      const respuesta = await fetch(`${API_URL}/${productoId.value}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo actualizar el producto.');
      }

      mostrarAlerta('Producto actualizado correctamente.', 'success');
    } else {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo registrar el producto.');
      }

      mostrarAlerta('Producto registrado correctamente.', 'success');
    }

    limpiarFormulario();
    cargarProductos();
  } catch (error) {
    mostrarAlerta(error.message || 'Ocurrió un error inesperado.', 'error');
  }
});

function editarProducto(id, nombreProducto, precioProducto, stockProducto, imagenProducto) {
  limpiarErrores();

  productoId.value = id;
  nombre.value = nombreProducto;
  precio.value = precioProducto;
  stock.value = stockProducto;
  imagen.value = imagenProducto;

  formTitle.textContent = 'Editar producto';
  btnGuardar.textContent = 'Actualizar producto';
  cancelarEdicion.style.display = 'inline-block';

  if (filaEditandoId) {
    const filaAnterior = document.getElementById(`fila-${filaEditandoId}`);
    if (filaAnterior) filaAnterior.classList.remove('editing-row');
  }

  filaEditandoId = id;
  const filaActual = document.getElementById(`fila-${id}`);
  if (filaActual) filaActual.classList.add('editing-row');

  mostrarAlerta('Modo edición activado.', 'info');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

cancelarEdicion.addEventListener('click', () => {
  limpiarFormulario();
  mostrarAlerta('Edición cancelada.', 'info');
});

btnLimpiar.addEventListener('click', () => {
  limpiarFormulario();
  mostrarAlerta('Formulario limpiado.', 'info');
});

async function eliminarProducto(id) {
  const confirmar = confirm('¿Seguro que deseas eliminar este producto?');

  if (!confirmar) return;

  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!respuesta.ok) {
      throw new Error('No se pudo eliminar el producto.');
    }

    if (Number(productoId.value) === id) {
      limpiarFormulario();
    }

    await cargarProductos();
    mostrarAlerta('Producto eliminado correctamente.', 'success');
  } catch (error) {
    mostrarAlerta(error.message || 'Ocurrió un error al eliminar.', 'error');
  }
}

function limpiarFormulario() {
  productoId.value = '';
  nombre.value = '';
  precio.value = '';
  stock.value = '';
  imagen.value = '';

  limpiarErrores();

  formTitle.textContent = 'Registrar producto';
  btnGuardar.textContent = 'Guardar producto';
  cancelarEdicion.style.display = 'none';

  if (filaEditandoId) {
    const fila = document.getElementById(`fila-${filaEditandoId}`);
    if (fila) fila.classList.remove('editing-row');
  }

  filaEditandoId = null;
}

cargarProductos();