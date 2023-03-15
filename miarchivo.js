// si el cliente selecciona 2 productos de mi lista de productos, se le ofrece un 5% de descuento abonando en
//efectivo o 3 o 6 cuotas sin interes abonando con tarjeta, si elige 4 o mas se le ofrece un 10% de descuento y
// 3 o 6 cuotas sin interes

//tengo que a traves de prompts pedirle al usuario que ingrese los productos que desea comprar, y si desea abonar
// en efectivo o con tarjeta, a partir de que cantidad de productos seleccione el usuario, mi simulador tiene
// que determinar cual seria el precio final teniendo en cuenta los descuentos, en caso de que abone en efectivo
// o cual es el monto de las cuotas en caso de abonar con tarjeta.

let listaProductos = [
  { nombre: "Microfono", precio: 8000 },
  { nombre: "Bateria", precio: 120000 },
  { nombre: "Atril", precio: 4000 },
  { nombre: "Guitarra", precio: 20000 },
  { nombre: "Teclado", precio: 30000 },
];

let productosSeleccionados = [];
let cantidadProductosAAdquirir = parseInt(
  prompt("Hola! cuantos productos desea adquirir?")
);

for (let i = 1; i <= cantidadProductosAAdquirir; i++) {
  agregarProductosSeleccionados();
}

let formaDePago = parseInt(
  prompt(
    "Si desea abonar en efectivo ingrese: 1, si desea abonar con tarjeta ingrese: 2"
  )
);

if (formaDePago == 1) {
  mostrarTotalAAbonar();
} else if (formaDePago == 2) {
  let numeroCuotas = parseInt(
    prompt(
      "Si eligio la opcion de abonar con tarjeta, ingrese el numero de cuotas (3 o 6):"
    )
  );
  if (numeroCuotas == 3) {
    alert(
      "El total a abonar son 3 cuotas sin interes de: $" + totalCompra() / 3
    );
  } else if (numeroCuotas == 6) {
    alert(
      "El total a abonar son 6 cuotas sin interes de: $" + totalCompra() / 6
    );
  }
}

function totalCompra() {
  let suma = 0;
  for (const item of productosSeleccionados) {
    suma += item.precio;
  }
  return suma;
}

function mostrarTotalAAbonar() {
  if (productosSeleccionados.length === 2) {
    let suma = 0;
    for (const item of productosSeleccionados) {
      suma += item.precio;
    }
    descuentoCinco(suma);
  } else if (productosSeleccionados.length >= 4) {
    let suma = 0;
    for (const item of productosSeleccionados) {
      suma += item.precio;
    }
    descuentoDiez(suma);
  }
}

function descuentoCinco(total) {
  total = total - total * 0.05;
  return alert("El total a abonar (incluido el 5%) es: $" + total);
}

function descuentoDiez(total) {
  total = total - total * 0.1;
  return alert("El total a abonar (incluido el 10%) es: $" + total);
}

function agregarProductosSeleccionados() {
  let producto = prompt("Ingrese el producto que desea adquirir: ");
  for (const elemento of listaProductos) {
    if (elemento.nombre == producto) {
      productosSeleccionados.push(elemento);
    }
  }
}
