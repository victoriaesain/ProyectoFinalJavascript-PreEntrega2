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
        <img src= "./imagenes/inst${producto.id}.jpg" id ="imagen-instrumento" alt="instrumento musical">
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

const finalizarCompra = document.getElementById("finalizar-compra");

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
  let productosAAlmacenar = JSON.stringify(carrito);
  localStorage.setItem("producto", productosAAlmacenar);
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
  Swal.fire({
    title: "Estas seguro que quieres vaciar el carrito?",
    text: "No podras revertirlo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, estoy seguro!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Listo!", "El carrito esta vacio", "success");
      carrito = [];
      mostrarCarrito();
    }
  });
});

const informacionMediosDePago = document.getElementById(
  "mostrar-medios-de-pago"
);

function mostrarTotal() {
  const totalCarrito = document.getElementById("total-carrito");
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio * carrito[i].cantidad;
  }
  totalCarrito.innerText = total;
  const botonMediosDePago = document.getElementById("medios-de-pago");
  botonMediosDePago.addEventListener("click", mostrarInfoMediosDePago);
  async function mostrarInfoMediosDePago() {
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          "Efectivo (10% off)": "Efectivo (10% off)",
          "3 cuotas sin interes": "3 cuotas sin interes",
          "6 cuotas sin interes": "6 cuotas sin interes",
        });
      }, 1000); 
    });

    const { value: medioPago } = await Swal.fire({
      title: "Seleccionar medio de pago",
      input: "radio",
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Necesitas seleccionar una opcion!";
        }
      },
    });

    if (medioPago) {
      Swal.fire({ html: `Seleccionaste: ${medioPago}` });
    }
  }
}

finalizarCompra.addEventListener("click", () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title:
      "Su compra ha sido exitosa, le enviaremos la factura a su mail lo mas pronto posible, muchas gracias!",
    showConfirmButton: false,
    timer: 4000,
  });
});

mostrarProductos();
