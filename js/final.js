const apiKey = "e7e7638cb0e14d9c809791051abf1156";
const cotizaciones = document.getElementById("cotizaciones");

function armarCotizaciones({ ARS, BTC, EUR }, timestamp) {
  let preciobtcfinal = (1 / BTC) * ARS;
  let precioEURfinal = (1 / EUR) * ARS;
  let fecha = new Date(timestamp * 1000);
  fecha = fecha.toLocaleString("es-Es");
  let html = `
    <div class="col-4 ">
        <div class="card w-100" >
            <div class="card-body">
                <h5 class="card-title fs-2">Dolar</h5>
                <p class="card-text fs-4">$${ARS.toFixed(2)}</p>
                <h6 class="card-subtitle mb-2 text-body-secondary text-end">${fecha}</h6>
            </div>
        </div>
    </div>
    <div class="col-4  ">
        <div class="card w-100" >
            <div class="card-body">
                <h5 class="card-title fs-2">Euro</h5>
                <p class="card-text fs-4">$${precioEURfinal.toFixed(2)}</p>
                <h6 class="card-subtitle mb-2 text-body-secondary text-end">${fecha}</h6>
            </div>
        </div>
    </div>
    <div class="col-4  ">
        <div class="card w-100" >
            <div class="card-body">
                <h5 class="card-title fs-2">Bitcoin</h5>
                <p class="card-text fs-4">$${preciobtcfinal.toFixed(2)}</p>
                <h6 class="card-subtitle mb-2 text-body-secondary text-end">${fecha}</h6>
            </div>
        </div>
    </div>`;

  cotizaciones.innerHTML = html;
}

async function getData() {
  let resp = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&symbols=ARS,EUR,BTC`
  );
  const data = await resp.json();
  armarCotizaciones(data.rates, data.timestamp);
}
getData();
