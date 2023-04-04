const productos = [
  { id: 1, nombre: "Microfono", precio: 6500 },
  { id: 2, nombre: "Bateria", precio: 120000 },
  { id: 3, nombre: "Atril", precio: 4300 },
  { id: 4, nombre: "Guitarra", precio: 20000 },
  { id: 5, nombre: "Teclado", precio: 30000 },
  { id: 6, nombre: "Flauta", precio: 6000 },
  { id: 7, nombre: "Violin", precio: 10000 },
  { id: 8, nombre: "Trompeta", precio: 9500 },
  { id: 9, nombre: "Ukelele", precio: 7500 },
];

const listaProductos = document.getElementById("lista-productos");

function mostrarProductos() {
  listaProductos.innerHTML = "";
  for (const producto of productos) {
    const li = document.createElement("li");
    li.innerHTML = `
        <p>${producto.nombre} - $${producto.precio}</p>
      `;
    const boton = document.createElement("button");
    boton.innerText = "Agregar al carrito";
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id, producto.nombre, producto.precio);
    });
    li.append(boton);
    listaProductos.append(li);
  }
}

const listaCarrito = document.getElementById("lista-carrito");

const vaciarCarrito = document.getElementById("vaciar-carrito");

let carrito = [];

function agregarAlCarrito(id, nombre, precio) {
  const producto = {
    id: id,
    nombre: nombre,
    precio: precio,
    cantidad: 1,
  };
  const productoExistente = carrito.find((p) => p.id === producto.id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push(producto);
  }
  mostrarCarrito();
}

function mostrarCarrito() {
  listaCarrito.innerHTML = "";
  for (const producto of carrito) {
    const li = document.createElement("li");
    li.innerHTML = `
        <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
      `;
    const boton = document.createElement("button");
    boton.innerText = "Eliminar";
    boton.addEventListener("click", () => {
      eliminarProducto(producto.id);
    });
    li.append(boton);
    listaCarrito.append(li);
  }
  mostrarTotal();
}

function eliminarProducto(id) {
  carrito = carrito.filter((producto) => producto.id !== id);
  mostrarCarrito();
}

vaciarCarrito.addEventListener("click", () => {
  carrito = [];
  mostrarCarrito();
});

function mostrarTotal() {
  const totalCarrito = document.getElementById("total-carrito");
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio * carrito[i].cantidad;
  }
  totalCarrito.innerText = `$${total} \n\n OPCIONES DE PAGO: \n\nTarjeta de credito - 3 cuotas sin interes de: $${parseInt(
    total / 3
  )} \n\n Tarjeta de credito - 6 cuotas sin interes de: $${parseInt(
    total / 6
  )} \n\n Efectivo en la tienda (10% descuento): $${parseInt(
    total - total * 0.1
  )} `;
}

mostrarProductos();
