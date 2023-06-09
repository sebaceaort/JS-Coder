const divForm = document.getElementById('divForm');
const divBuscar = document.getElementById('divBuscar');
const buscar = document.getElementById('buscar');
divBuscar.style.display='none'
divForm.style.display='none'
const btnBuscar = document.getElementById('search');
const btnAdd = document.getElementById('add');


btnBuscar.addEventListener("click",()=>toggleDisplay(divBuscar));
btnAdd.addEventListener("click",()=>toggleDisplay(divForm));
buscar.addEventListener("keyup",()=>buscarMovimientos());

const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
mostrarMovimientos(movimientos);
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
    localStorage.setItem("movimientos", JSON.stringify(movimientos));
    limpiaForm();
    toggleDisplay(divForm)
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
    Swal.fire({
      icon: "warning",
      text: "Seleccione un tipo de movimiento válido.",
    });
    return isValid;
  }
  if (nombre === "") {
    Swal.fire({
      icon: "warning",
      text: "Ingrese un nombre para el movimiento.",
    });
    return isValid;
  }
  if (monto <= 0 || isNaN(monto)) {
    Swal.fire({
      icon: "warning",
      text: "Ingrese un monto mayor a cero.",
    });
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
      <div class="encabezado-celda">Monto</div>
      <button class="encabezado-celda clear">Borrar todo</>`;
  div.appendChild(encabezadoDiv);

  const clearBtn = encabezadoDiv.querySelector(".clear");
  clearBtn.addEventListener("click", () => {
    limpiarTodo();
  });
}

function armaMovimientos(div, array) {
  array.forEach((movimiento) => {
    const movimientoDiv = document.createElement("div");
    movimientoDiv.classList.add("movimiento-fila");
    movimientoDiv.innerHTML = `
              <div class="movimiento-celda">${
                movimiento.tipo === "1" ? "Gasto" : "Ingreso"
              }</div>
              <div class="movimiento-celda">${movimiento.nombre}</div>
              <div class="movimiento-celda">$${movimiento.monto.toFixed(
                2
              )}</div>
              <button class="borrar-btn movimiento-celda" >x</button>`;
    div.appendChild(movimientoDiv);

    const borrarBtn = movimientoDiv.querySelector(".borrar-btn");
    borrarBtn.addEventListener("click", () => {
      borrarMovimiento(movimiento);
    });
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
        <div class="totales-celda tot-esp"></div>
      `;
  div.appendChild(totalesDiv);
}

function borrarMovimiento(movimiento) {
  const index = movimientos.indexOf(movimiento);
  if (index !== -1) {
    movimientos.splice(index, 1);
  }
  mostrarMovimientos(movimientos);
  localStorage.setItem("movimientos", JSON.stringify(movimientos));
}

function limpiarTodo() {
  movimientos.splice(0, movimientos.length);
  localStorage.clear();
  mostrarMovimientos([]);
}


function toggleDisplay(elemento){
  if (elemento.style.display === "none") {
    elemento.style.display = "block";
  } else {
    elemento.style.display = "none";
  }
}