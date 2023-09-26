// Establecer opciones de mapa latitud: 19.432599, longitud: -99.133205 //latitud: 38.346, longitud: -0.4907
var miLatitudYLongitud = { lat: 24.301415, lng: -102.694618 };
var opcionesDelMapa = {
  center: miLatitudYLongitud,
  zoom: 6,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};
var map = new google.maps.Map(
  document.getElementById("googleMap"),
  opcionesDelMapa
);
//Crear un objeto de servicio Directions para utilizar el método Route y obtener un resultado para nuestra solicitud
var directionsService = new google.maps.DirectionsService();
//Crear un objeto DirectionsRenderer que utilizaremos para mostrar la ruta
var directionsDisplay = new google.maps.DirectionsRenderer();
//Enlazar las direccionesRenderer al mapa
directionsDisplay.setMap(map);
//funcion
function calcRoute() {
  //Crear request
  let request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  };
  //Pass the request to the method
  directionsService.route(request, (result, status) => {
    // Calculadora de Presupuesto
    const forma = document.getElementById("forma");
    let sueldo = forma["sueldo"];
    let transporte = forma["transporte"];
    let costoGas = forma["costoGas"];
    let caseta = forma["caseta"];

    if (status == google.maps.DirectionsStatus.OK) {
      var distanceN = parseInt(result.routes[0].legs[0].distance.text);
      var kilometro = distanceN * 1.60934;
      let desgasteLlantas1 = 150000 - kilometro;
      let desgasteLlantas2 = 80000 - kilometro;
      let desgasteLlantas3 = 120000 - kilometro;
      let desgasteLlantas4 = 60000 - kilometro;
      let desgasteLlantas5 = 150000 - kilometro;

      console.log(`Distanacia en kilómetros ${kilometro.toFixed(2)}`);
      //getm distance and time
      const output = document.querySelector("#output");
      output.innerHTML = `
      <style>
        table, th, td {
          border: 5px solid black;
        }
      </style>
      <div class='alert-info'>
        <table style="width:100%">
          <tr>
            <td> Origen: </td>
            <td>${document.getElementById("from").value}.</td>
          </tr>
          <tr>
            <td>Destino:</td>
            <td>${document.getElementById("to").value}.</td>
          </tr>
          <tr>
            <td>Distancia de manejo: </td>
            <td> ${kilometro} km.</td>
          </tr>
          <tr>
            <td>Duración:</td>
            <td>${result.routes[0].legs[0].duration.text}. </td>
          </tr>
          <tr>
            <td>Vida util de las llantas:  </td>
            <td>${desgasteLlantas1} Km.  </td>
          </tr>
        </table>
      </div>`;
      //display
      directionsDisplay.setDirections(result);
    } else {
      //delete route from map
      directionsDisplay.setDirections({ routes: [] });
      // center map in Mexico
      map.setCenter(miLatitudYLongitud);
      //show error message // Could not retrieve distance
      output.innerHTML =
        "<div class='alert-danger'><i class='fa-solid fa-triangle-exclamation'></i> No se pudo recuperar la distancia. </div>";
    }

    switch (transporte.value) {
      case "VEHÍCULO ARTICULADO DE CARGA GENERAL EN TRANSPORTE INTERNACIONAL":
        let sueldoConductor = kilometro * parseInt(sueldo.value);
        let formulaGasolina = (1000 / kilometro) * 100;
        let precioGasolina = formulaGasolina * parseInt(costoGas.value);
        let resultado =
          sueldoConductor + precioGasolina + parseInt(caseta.value);
        console.log(`Formula gasolina ${formulaGasolina}`);
        console.log(`Precio de gasolina ${precioGasolina}`);

        if (isNaN(resultado)) {
          document.getElementById(
            "respuesta"
          ).innerHTML = `<div class='alert-danger' ><i class='fa-solid fa-triangle-exclamation'></i> Ingrese los datos completos. </div>`;
          resultado = "Ingrese los datos completos";
        } else {
          document.getElementById("respuesta").innerHTML = `
              <style>
                table, th, td {
                  border: 5px solid black;
                }
              </style>
              <div class='alert-info' >
                <table style="width:100%">
                  <tr>
                      <p style='color: red; font-size: 30px'><b>Presupuesto</b></p>  
                  </tr>
                  <tr>
                    <td>Precio gasolina:</td>
                    <td> $ ${precioGasolina.toFixed(2)} </td>
                  </tr>
                  <tr>
                    <td>Sueldo conductor:</td>
                    <td> $ ${sueldoConductor.toFixed(2)} </td>
                  </tr>
                  <tr>
                    <td> Costo de casetas:  </td>
                    <td> $ ${parseInt(caseta.value)}</td>
                  </tr>
                  <tr>
                    <td> Total:  </td>
                    <td> $ ${resultado.toFixed(2)}</td>
                  </tr>
                </table>
              </div>`;
          console.log(`Presupuesto ${resultado.toFixed(2)}`);
        }
        console.log(
          "VEHÍCULO ARTICULADO DE CARGA GENERAL EN TRANSPORTE INTERNACIONAL"
        );
        console.log(resultado);
        break;
      case "CAMION DE 2 EJES":
        let sueldoConductor2 = kilometro * parseInt(sueldo.value);
        let formulaGasolina2 = (1200 / kilometro) * 100;
        let precioGasolina2 = formulaGasolina2 * parseInt(costoGas.value);
        let resultado2 =
          sueldoConductor2 + precioGasolina2 + parseInt(caseta.value);
        console.log(`Formula gasolina ${formulaGasolina2}`);
        console.log(`Precio de gasolina ${precioGasolina2}`);

        if (isNaN(resultado2)) {
          document.getElementById(
            "respuesta"
          ).innerHTML = `<div class='alert-danger' ><i class='fa-solid fa-triangle-exclamation'></i> Ingrese los datos completos. </div>`;
          resultado2 = "Ingrese los datos completos";
        } else {
          document.getElementById("respuesta").innerHTML = `
              <style>
                table, th, td {
                  border: 5px solid black;
                }
              </style>
              <div class='alert-info' >
                <table style="width:100%">
                  <tr>
                      <p style='color: red; font-size: 30px'><b>Presupuesto</b></p>  
                  </tr>
                  <tr>
                    <td>Precio gasolina:</td>
                    <td> $ ${precioGasolina2.toFixed(2)} </td>
                  </tr>
                  <tr>
                    <td>Sueldo conductor:</td>
                    <td> $ ${sueldoConductor2.toFixed(2)} </td>
                  </tr>
                  <tr>
                    <td> Costo de casetas:  </td>
                    <td> $ ${parseInt(caseta.value)}</td>
                  </tr>
                  <tr>
                    <td> Total:  </td>
                    <td> $ ${resultado2.toFixed(2)}</td>
                  </tr>
                </table>
              </div>`;
          console.log(`Presupuesto ${resultado2.toFixed(2)}`);
        }
        console.log("CAMION DE 2 EJES");
        break;
      case "CAMION DE 3 EJES":
        let sueldoConductor3 = kilometro * parseInt(sueldo.value);
        let formulaGasolina3 = (1400 / kilometro) * 100;
        let precioGasolina3 = formulaGasolina3 * parseInt(costoGas.value);
        let resultado3 =
          sueldoConductor3 + precioGasolina3 + parseInt(caseta.value);
        console.log(`Formula gasolina ${formulaGasolina3}`);
        console.log(`Precio de gasolina ${precioGasolina3}`);

        if (isNaN(resultado3)) {
          document.getElementById(
            "respuesta"
          ).innerHTML = `<div class='alert-danger' ><i class='fa-solid fa-triangle-exclamation'></i> Ingrese los datos completos. </div>`;
          resultado3 = "Ingrese los datos completos";
        } else {
          document.getElementById("respuesta").innerHTML = `
              <style>
                table, th, td {
                  border: 5px solid black;
                }
              </style>
              <div class='alert-info' >
                <table style="width:100%">
                  <tr>
                      <p style='color: red; font-size: 30px'><b>Presupuesto</b></p>  
                  </tr>
                  <tr>
                    <td>Precio gasolina:</td>
                    <td> $ ${precioGasolina3.toFixed(2)} </td>
                  </tr>
                  <tr>
                    <td>Sueldo conductor:</td>
                    <td> $ ${sueldoConductor3.toFixed(2)} </td>
                  </tr>
                  <tr>
                    <td> Costo de casetas:  </td>
                    <td> $ ${parseInt(caseta.value)}</td>
                  </tr>
                  <tr>
                    <td> Total:  </td>
                    <td> $ ${resultado3.toFixed(2)}</td>
                  </tr>
                </table>
              </div>`;
          console.log(`Presupuesto ${resultado3.toFixed(2)}`);
        }
        console.log("CAMION DE 3 EJES");
        break;
      case "FURGONETA":
        let sueldoConductor4 = kilometro * parseInt(sueldo.value);
        let formulaGasolina4 = (80 / kilometro) * 100;
        let precioGasolina4 = formulaGasolina4 * parseInt(costoGas.value);
        let resultado4 =
          sueldoConductor4 + precioGasolina4 + parseInt(caseta.value);
        console.log(`Formula gasolina ${formulaGasolina4}`);
        console.log(`Precio de gasolina ${precioGasolina4}`);

        if (isNaN(resultado4)) {
          document.getElementById(
            "respuesta"
          ).innerHTML = `<div class='alert-danger' ><i class='fa-solid fa-triangle-exclamation'></i> Ingrese los datos completos. </div>`;
          resultado4 = "Ingrese los datos completos";
        } else {
          document.getElementById("respuesta").innerHTML = `
              <style>
                table, th, td {
                  border: 5px solid black;
                }
              </style>
              <div class='alert-info' >
                <table style="width:100%">
                  <tr>
                      <p style='color: red; font-size: 30px'><b>Presupuesto</b></p>  
                  </tr>
                  <tr>
                    <td>Precio gasolina:</td>
                    <td> $ ${precioGasolina4.toFixed(2)} </td>
                  </tr>
                  <tr>
                    <td>Sueldo conductor:</td>
                    <td> $ ${sueldoConductor4.toFixed(2)} </td>
                  </tr>
                  <tr>
                    <td> Costo de casetas:  </td>
                    <td> $ ${parseInt(caseta.value)}</td>
                  </tr>
                  <tr>
                    <td> Total:  </td>
                    <td> $ ${resultado4.toFixed(2)}</td>
                  </tr>
                </table>
              </div>`;
          console.log(`Presupuesto ${resultado4.toFixed(2)}`);
        }
        console.log("FURGONETA");
        break;
      case "VEHÍCULO CISTERNA ARTICULADO DE MERCANCÍAS PELIGROSAS (QUÍMICOS)":
        let sueldoConductor5 = kilometro * parseInt(sueldo.value);
        let formulaGasolina5 = (1600 / kilometro) * 100;
        let precioGasolina5 = formulaGasolina5 * parseInt(costoGas.value);
        let resultado5 =
          sueldoConductor5 + precioGasolina5 + parseInt(caseta.value);
        console.log(`Formula gasolina ${formulaGasolina5}`);
        console.log(`Precio de gasolina ${precioGasolina5}`);

        if (isNaN(resultado5)) {
          document.getElementById(
            "respuesta"
          ).innerHTML = `<div class='alert-danger' ><i class='fa-solid fa-triangle-exclamation'></i> Ingrese los datos completos. </div>`;
          resultado5 = "Ingrese los datos completos";
        } else {
          document.getElementById("respuesta").innerHTML = `
              <style>
                table, th, td {
                  border: 5px solid black;
                }
              </style>
              <div class='alert-info' >
                <table style="width:100%">
                  <tr>
                      <p style='color: red; font-size: 30px'><b>Presupuesto</b></p>  
                  </tr>
                  <tr>
                    <td>Precio gasolina:</td>
                    <td> $ ${precioGasolina5.toFixed(2)} </td>
                  </tr>
                  <tr>
                    <td>Sueldo conductor:</td>
                    <td> $ ${sueldoConductor5.toFixed(2)} </td>
                  </tr>
                  <tr>
                    <td> Costo de casetas:  </td>
                    <td> $ ${parseInt(caseta.value)}</td>
                  </tr>
                  <tr>
                    <td> Total:  </td>
                    <td> $ ${resultado5.toFixed(2)}</td>
                  </tr>
                </table>
              </div>`;
          console.log(`Presupuesto ${resultado5.toFixed(2)}`);
        }
        console.log(
          "VEHÍCULO CISTERNA ARTICULADO DE MERCANCÍAS PELIGROSAS (QUÍMICOS)"
        );
        break;
      default:
        console.log("Debe de ingresar un Tipo de Transporte ");
        break;
    }
  });
}
// create autocompletre objects for all input

const options = {
  fields: ["formatted_address", "geometry", "name"],
  strictBounds: false,
  types: ["establishment"],
};
var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
