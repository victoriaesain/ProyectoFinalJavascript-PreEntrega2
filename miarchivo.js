let listaProductos = [
  { nombre: "Microfono", precio: 8000, id: 1 },
  { nombre: "Bateria", precio: 120000, id: 2 },
  { nombre: "Atril", precio: 4000, id: 3 },
  { nombre: "Guitarra", precio: 20000, id: 4 },
  { nombre: "Teclado", precio: 30000, id: 5 },
  { nombre: "Flauta", precio: 6000, id: 6 },
  { nombre: "Parlante", precio: 5000, id: 7 },
];

alert(
  "Hola! gracias por visitar nuestra pagina, a continuacion te muestro nuestro catalogo de productos"
);

alert(
  " Item 1: Microfono - Precio: $8000 \n Item 2: Bateria - Precio: $120000 \n Item 3: Atril - Precio: 4000 \n Item 4: Guitarra - Precio: $20000 \n Item 5: Teclado - Precio: $30000 \n Item 6: Flauta - Precio: $6000 \n Item 7: Parlante - Precio: $5000"
);

function mostrarProductos() {
  for (const producto of productosSeleccionados) {
    console.log(
      "Item seleccionado: " + producto.nombre + " - precio: $" + producto.precio
    );
  }
}

let productosSeleccionados = [];

function agregarProducto() {
  let i = true;
  while (i == true) {
    let itemSeleccionado = parseInt(
      prompt(
        "Que producto desea adquirir? Indique el numero de item del producto a seleccionar: (0 para finalizar la compra)"
      )
    );
    for (const item of listaProductos) {
      if (item.id === itemSeleccionado) {
        productosSeleccionados.push(item);
      }
    }
    if (itemSeleccionado === 0) {
      mostrarProductos();
      i = false;

      let formaDePago = parseInt(
        prompt(
          "Que medio de pago desea utilizar? (seleccione una opcion) \n 1: tarjeta de credito (3 cuotas sin interes) \n 2: tarjeta de credito (6 cuotas sin interes) \n 3: efectivo en la tienda (10% dcto)"
        )
      );
      if (formaDePago === 1) {
        alert(
          "El total a abonar con tarjeta de credito es de: $" +
            totalCompra() +
            " (3 cuotas sin interes de $" +
            parseInt(totalCompra() / 3) +
            ")"
        );
      } else if (formaDePago === 2) {
        alert(
          "El total a abonar con tarjeta de credito es de: $" +
            totalCompra() +
            " (6 cuotas sin interes de $" +
            parseInt(totalCompra() / 6) +
            ")"
        );
      } else if (formaDePago === 3) {
        alert(
          "El total a abonar en efectivo (10% de descuento) es de: $" +
            (totalCompra() - totalCompra() * 0.1)
        );
      }
      alert("Muchas gracias por su compra!");
    }
  }
}

function totalCompra() {
  let suma = 0;
  for (const item of productosSeleccionados) {
    suma += item.precio;
  }
  return suma;
}

agregarProducto();
