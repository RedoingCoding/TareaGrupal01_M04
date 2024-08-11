/* Aduana de Chile, necesita crear un software que registre el ingreso de las distintas
empresas que realizan importaciones, además de clasificarlas por id de registro, nombre y
rut. Aduanas también requiere saber el total de importaciones de la empresa.

Por otro lado, se necesita dejar registro de lasimportaciones de cada empresa. Estas deben
ser registradas por id de importación, producto, número de productos y precio unitario.

REQUERIMIENTOS

1. Crear todo el código usando ES6. (1 punto)
2. Genera un diagrama UML de la relación de ambas Clases (se recomienda el uso de
www.drawio.com). (1 punto)
3. Crear una Clase para cada objeto. (2 puntos)
4. Instanciar cada objeto utilizando la instrucción new. (1 punto)
5. Implementar métodos getters y setters para poder acceder y modificar los datos
de las importaciones (3 puntos)
6. Crear los siguientes métodos: (3 puntos)
a. Agregar Importación
b. Suma total de importaciones
c. Suma total por el número de productos y su precio unitario

Requerimiento opcional
1. Genera un formulario en HTML que permita agregar datos de empresas e
importaciones para poder usarlos en las Clases del código
2. Mostrar en pantalla los resultados de los métodos 6.b y 6.c

El trabajo debe ser subido en formato zip, rar o archivo de texto con URL del repositorio */

class Empresa {
  constructor(id, nombre, rut) {
    this._id = id;
    this._nombre = nombre;
    this._rut = rut;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get rut() {
    return this._rut;
  }

  set rut(rut) {
    this._rut = rut;
  }
}

class Importacion {
  constructor(producto, stock, precioUnitario) {
    this._producto = producto;
    this._stock = stock;
    this._precioUnitario = precioUnitario;
    this.constructor.importaciones = this.constructor.importaciones || [];
  }

  get producto() {
    return this._producto;
  }

  set producto(producto) {
    this._producto = producto;
  }

  get stock() {
    return this._stock;
  }

  set stock(stock) {
    this._stock = stock;
  }

  get precioUnitario() {
    return this._precioUnitario;
  }

  set precioUnitario(precioUnitario) {
    this._precioUnitario = precioUnitario;
  }

  static agregarImportacion(importacion) {
    this.importaciones.push(importacion);
  }

  static sumaImportaciones() {
    return this.importaciones.reduce(
      (total, imp) => total + imp.stock * imp.precioUnitario,
      0
    );
  }

  static total() {
    return this.importaciones.reduce(
      (totales, imp) => {
        totales.producto += 1;
        totales.stock += imp.stock;
        totales.precioUnitario += imp.precioUnitario;
        return totales;
      },
      { producto: 0, stock: 0, precioUnitario: 0 }
    );
  }
}

// Manejo del formulario de Empresa
document
  .getElementById("empresaForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const id = document.getElementById("empresaId").value;
    const nombre = document.getElementById("empresaNombre").value;
    const rut = document.getElementById("empresaRut").value;
    const empresa = new Empresa(id, nombre, rut);
    console.log("Empresa agregada:", empresa);
  });

// Manejo del formulario de Importación
document
  .getElementById("importacionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const producto = document.getElementById("producto").value;
    const stock = parseInt(document.getElementById("stock").value);
    const precioUnitario = parseFloat(
      document.getElementById("precioUnitario").value
    );
    const importacion = new Importacion(producto, stock, precioUnitario);
    Importacion.agregarImportacion(importacion);
    console.log("Importación agregada:", importacion);
    mostrarResultados();
  });

function mostrarResultados() {
  const sumaImportaciones = Importacion.sumaImportaciones();
  const totales = Importacion.total();
  document.getElementById(
    "sumaImportaciones"
  ).innerText = `Suma total de importaciones: ${sumaImportaciones}`;
  document.getElementById(
    "totales"
  ).innerText = `Totales - Productos: ${totales.producto}, Stock: ${totales.stock}, Precio Unitario: ${totales.precioUnitario}`;
}
