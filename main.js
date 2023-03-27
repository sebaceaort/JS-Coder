const movimientos = [];

class Movimiento {
  constructor(tipo, nombre, monto) {
    this.tipo = tipo;
    this.nombre = nombre;
    this.monto = monto;
  }
}

function crearMovimiento() {
  const tipo = document.getElementById("tipo").value;
  const nombre = document.getElementById("nombre").value.trim();
  const monto = parseFloat(document.getElementById("monto").value);

  if (validar(tipo, nombre, monto)) {
    movimientos.push(new Movimiento(tipo, nombre, monto));
    limpiaForm();
  }

  mostrarMovimientos(movimientos);
}

function mostrarMovimientos(array) {
  const movimientosDiv = document.getElementById("Movimientos");
  movimientosDiv.innerHTML = "";

  armaEncabezado(movimientosDiv);

  armaMovimientos(movimientosDiv, array);

  armaTrailer(movimientosDiv, array);
}

function buscarMovimientos() {
  const buscarInput = document.getElementById("buscar");
  const buscarTexto = buscarInput.value.trim().toLowerCase();
  const movimientosFiltrados = movimientos.filter((movimiento) =>
    movimiento.nombre.toLowerCase().includes(buscarTexto)
  );
  mostrarMovimientos(movimientosFiltrados);
}

function limpiaForm() {
  document.getElementById("tipo").selectedIndex = 0;
  document.getElementById("nombre").value = "";
  document.getElementById("monto").value = "";
}

function validar(tipo, nombre, monto) {
  let isValid = false;

  if (tipo !== "1" && tipo !== "2") {
    alert("Seleccione un tipo de movimiento válido.");
    return isValid;
  }
  if (nombre === "") {
    alert("Ingrese un nombre para el movimiento.");
    return isValid;
  }
  if (monto <= 0 || isNaN(monto)) {
    alert("Ingrese un monto mayor a cero.");
    return isValid;
  }
  isValid = true;
  return isValid;
}

function armaEncabezado(div) {
  const encabezadoDiv = document.createElement("div");
  encabezadoDiv.classList.add("encabezado-fila");
  encabezadoDiv.innerHTML = `
      <div class="encabezado-celda">Tipo</div>
      <div class="encabezado-celda">Nombre</div>
      <div class="encabezado-celda">Monto</div>`;
  div.appendChild(encabezadoDiv);
}

function armaMovimientos(div, array) {
  array.forEach((movimiento) => {
    const movimientoDiv = document.createElement("div");
    movimientoDiv.classList.add("movimiento-fila");
    movimientoDiv.innerHTML = `
              <div class="movimiento-celda">${movimiento.tipo === "1" ? "Gasto" : "Ingreso"}</div>
              <div class="movimiento-celda">${movimiento.nombre}</div>
              <div class="movimiento-celda">$${movimiento.monto.toFixed(2)}</div>`;
    div.appendChild(movimientoDiv);
  });
}

function armaTrailer(div, array) {
  const totalesDiv = document.createElement("div");
  totalesDiv.classList.add("totales-fila");
  let acum = array
    .map((mov) => (mov.tipo === "1" ? mov.monto * -1 : mov.monto))
    .reduce((a, b) => a + b, 0);
  totalesDiv.innerHTML = `
        <div class="totales-celda">Total</div>
        <div class="totales-celda">Cantidad Movimientos: ${array.length}</div>
        <div class="totales-celda">$${acum.toFixed(2)}</div>
      `;
  div.appendChild(totalesDiv);
}
