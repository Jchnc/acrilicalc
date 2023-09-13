const PREDETERMINADO = {
  ACRILICO_ANCHO:   2400,
  ACRILICO_ALTO:    1800,
  ACRILICO_PRECIO:  70000,
  ACRILICO_MANOBRA: 30,
  BISAGRAS_PRECIO:  750,
};

const ELEMENTOS = {
	// ACRILICO
	ACRILICO_ANCHO:   document.getElementById("acrilico_ancho"),
	ACRILICO_ALTO:    document.getElementById("acrilico_alto"),
	ACRILICO_PRECIO:  document.getElementById("acrilico_precio"),
  ACRILICO_MANOBRA: document.getElementById("acrilico_manobra"),
  BISAGRAS_PRECIO: document.getElementById("bisagras_precio"),
  // CLIENTE
  CLIENTE_ANCHO:    document.getElementById("cliente_ancho"),
  CLIENTE_ALTO:     document.getElementById("cliente_alto"),
  CLIENTE_PROFUNDO: document.getElementById("cliente_profundidad"),
  CLIENTE_BISAGRAS: document.getElementById("cliente_bisagras"),
  CLIENTE_CANTIDAD: document.getElementById("cliente_cant"),
  // EXTRAS
  ELEMENTOS:        document.getElementById("elemento"),
  CALCULOS:         document.getElementById("calculos"),
  RESULTADOS:       document.getElementById("resultado"),
  // BOTONES
  BOTON_CALCULAR:   document.getElementById("calcular"),
  BOTON_REINICIAR:  document.getElementById("borrar")
};

const INPUTS = {
	// ACRILICO
	ACRILICO_ANCHO:   ELEMENTOS.ACRILICO_ANCHO.value,
	ACRILICO_ALTO:    ELEMENTOS.ACRILICO_ALTO.value,
	ACRILICO_PRECIO:  ELEMENTOS.ACRILICO_PRECIO.value,
  ACRILICO_MANOBRA: ELEMENTOS.ACRILICO_MANOBRA.value,
  // CLIENTE
  CLIENTE_ANCHO:    ELEMENTOS.CLIENTE_ANCHO.value,
  CLIENTE_ALTO:     ELEMENTOS.CLIENTE_ALTO.value,
  CLIENTE_PROFUNDO: ELEMENTOS.CLIENTE_PROFUNDO.value,
  BISAGRAS_PRECIO:  ELEMENTOS.CLIENTE_BISAGRAS.value,
  
  // EXTRAS 
  ELEMENTOS: ELEMENTOS.ELEMENTOS.value
};

// funcion para reiniciar todos los inputs
function reiniciar() {
  for (const key in ELEMENTOS) {
    if (ELEMENTOS.hasOwnProperty(key)) {
      ELEMENTOS[key].animate([
        { transform: 'scaleY(0)' },
        { transform: 'scaleY(1.2)' },
        { transform: 'scaleY(1)' }
      ], {
        duration: 200, 
        iterations: 1
      });
  
      if (key === "ACRILICO_ANCHO" || key === "ACRILICO_ALTO" || key === "ACRILICO_PRECIO") {
        continue;
      }
  
      ELEMENTOS[key].value = "";
      
      if (key === "CLIENTE_BISAGRAS") {
        ELEMENTOS[key].value = "0";
      }

      if (key === "BISAGRAS_PRECIO") {
        ELEMENTOS[key].value = PREDETERMINADO.BISAGRAS_PRECIO;
      }
      if (key === "ACRILICO_MANOBRA") {
        ELEMENTOS[key].value = PREDETERMINADO.ACRILICO_MANOBRA;
      }

      if (key === "RESULTADOS") {
        ELEMENTOS[key].innerHTML = "<blockquote><p><strong>$0</strong></p></blockquote>"; 
      }

      document.getElementById("cliente_cant_container").style.display = "none";
      document.getElementById("cliente_profundidad_container").style.display = "block";

      if (key === "ELEMENTOS") {
        ELEMENTOS[key].value = "1";
      }
      if (key === "CALCULOS") {
        ELEMENTOS[key].innerHTML = `
        <details>
          <summary>Info</summary>
          <p>Informacion de interes...</p>
        </details>`;
      }
    }
  }
}

// VALORES PREDETERMINADOS
document.addEventListener("DOMContentLoaded", function() {
  INPUTS.ACRILICO_ANCHO = PREDETERMINADO.ACRILICO_ANCHO;
  INPUTS.ACRILICO_ALTO = PREDETERMINADO.ACRILICO_ALTO;
  INPUTS.ACRILICO_PRECIO = PREDETERMINADO.ACRILICO_PRECIO;
  INPUTS.ACRILICO_MANOBRA = PREDETERMINADO.ACRILICO_MANOBRA;
  INPUTS.BISAGRAS_PRECIO = PREDETERMINADO.BISAGRAS_PRECIO;
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    reiniciar();
  }
  if (event.key === "Enter") {
    ELEMENTOS.BOTON_CALCULAR.click();
  }
});

ELEMENTOS.BOTON_REINICIAR.addEventListener("click", function() {
  reiniciar();
});

document.getElementById("elemento").addEventListener("change", function() {
  
  const cantidadContainer = document.getElementById("cliente_cant_container");
  const profundidadContainer = document.getElementById("cliente_profundidad_container");

  if (this.value == "1") {
    cantidadContainer.style.display = "none";
    profundidadContainer.style.display = "block";
  }
  if (this.value == "2") {
    profundidadContainer.style.display = "none";
    cantidadContainer.style.display = "block";
  }

});

// FUNCIONES IMPORTANTES
// Calcular Pieza Individual
function calcularTrozo(ancho, alto, cant) {
  let a = alto / ELEMENTOS.ACRILICO_ANCHO.value;
  let b = ancho / ELEMENTOS.ACRILICO_ALTO.value;
  let c = a * b;
  let d = c * ELEMENTOS.ACRILICO_PRECIO.value * 2;
  return (cant) ? d * ELEMENTOS.CLIENTE_CANTIDAD.value : d;
}

// Calcular Caja
function calcularCaja(ancho, alto, profundo) {
  let a = calcularTrozo(ancho, alto, false);
  let b = calcularTrozo(ancho, profundo, false);
  let c = calcularTrozo(alto, profundo, false);
  let d = a + b + c;
  return d * 2;
}

function formatoDinero(number) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(number);
}

function formatoNumero(number) {
  return new Intl.NumberFormat('es-CL').format(number);
}


ELEMENTOS.BOTON_CALCULAR.addEventListener("click", function() {

  if(ELEMENTOS.ELEMENTOS.value == "1") {

    // chequear si hay algun input vacio
    for (const key in ELEMENTOS) {

      if (ELEMENTOS.hasOwnProperty(key)) {
        if (ELEMENTOS[key].value === "" && ELEMENTOS[key].tagName === "INPUT") {
          if (key === "CLIENTE_CANTIDAD") {
            continue;
          }
          ELEMENTOS[key].animate([
            { transform: 'scaleY(1)' },
            { transform: 'scaleY(1.2)' },
            { transform: 'scaleY(1)' }
          ], {
            duration: 200,
            iterations: 1
          });
          ELEMENTOS[key].focus();
          return;
        }
      }

    }

    let resultado = formatoDinero(
      (calcularCaja(ELEMENTOS.CLIENTE_ANCHO.value, ELEMENTOS.CLIENTE_ALTO.value, ELEMENTOS.CLIENTE_PROFUNDO.value)
      + (ELEMENTOS.CLIENTE_BISAGRAS.value * ELEMENTOS.BISAGRAS_PRECIO.value))
      * (1 + (ELEMENTOS.ACRILICO_MANOBRA.value / 100))
    );

    let paso = {
      1: `Informacion adicional:`,
      2: `${formatoNumero(calcularTrozo(ELEMENTOS.CLIENTE_ANCHO.value, ELEMENTOS.CLIENTE_ALTO.value, false))} (Ancho &times; Alto)`,
      3: `${formatoNumero(calcularTrozo(ELEMENTOS.CLIENTE_ANCHO.value, ELEMENTOS.CLIENTE_PROFUNDO.value, false))} (Ancho &times; Profundo)`,
      4: `${formatoNumero(calcularTrozo(ELEMENTOS.CLIENTE_ALTO.value, ELEMENTOS.CLIENTE_PROFUNDO.value, false))} (Alto &times; Profundo)`,
    }

    ELEMENTOS.CALCULOS.innerHTML = `
    <details>
      <summary>Info</summary>
      <p>${paso[1]}</p>
      <p>${paso[2]}</p>
      <p>${paso[3]}</p>
      <p>${paso[4]}</p>      
    </details>
    `;

    ELEMENTOS.RESULTADOS.innerHTML = `<blockquote><p><strong>${resultado}</strong></p></blockquote>`;
    ELEMENTOS.RESULTADOS.animate([
      { transform: 'scaleY(0)' },
      { transform: 'scaleY(1.2)' },
      { transform: 'scaleY(1)' }
    ], {
      duration: 200,
      iterations: 1
    });
  }

  if(ELEMENTOS.ELEMENTOS.value == "2") {
  
    // chequear si hay algun input vacio
    for (const key in ELEMENTOS) {

      if (ELEMENTOS.hasOwnProperty(key)) {
        if (ELEMENTOS[key].value === "" && ELEMENTOS[key].tagName === "INPUT" && key !== "CLIENTE_PROFUNDO") {
          ELEMENTOS[key].animate([
            { transform: 'scaleY(1)' },
            { transform: 'scaleY(1.2)' },
            { transform: 'scaleY(1)' }
          ], {
            duration: 200,
            iterations: 1
          });
          ELEMENTOS[key].focus();
          return;
        }
      }

    }

    let resultado = formatoDinero(
      (calcularTrozo(ELEMENTOS.CLIENTE_ANCHO.value, ELEMENTOS.CLIENTE_ALTO.value, true)
      + (ELEMENTOS.CLIENTE_BISAGRAS.value * ELEMENTOS.BISAGRAS_PRECIO.value))
      * (1 + (ELEMENTOS.ACRILICO_MANOBRA.value / 100))
    );

    let paso = {
      1: `Informacion adicional:`,
      2: `${formatoNumero(calcularTrozo(ELEMENTOS.CLIENTE_ANCHO.value, ELEMENTOS.CLIENTE_ALTO.value, true))} (Ancho &times; Alto)`,
    }


    ELEMENTOS.CALCULOS.innerHTML = `
    <details>
      <summary>Info</summary>
      <p>${paso[1]}</p>
      <p>${paso[2]}</p>    
    </details>
    `;

    ELEMENTOS.RESULTADOS.innerHTML = `<blockquote><p><strong>${resultado}</strong></p></blockquote>`;
    ELEMENTOS.RESULTADOS.animate([
      { transform: 'scaleY(0)' },
      { transform: 'scaleY(1.2)' },
      { transform: 'scaleY(1)' }
    ], {
      duration: 200,
      iterations: 1
    });
  }

});