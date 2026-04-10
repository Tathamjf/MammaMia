const CHARS = "ABCDEFGHILMNOPQRSTUVZ";
let valor = "";


// teclado
function gerarTeclado() {
  const teclado = document.getElementById("teclado");
  teclado.innerHTML = "";

  CHARS.split("").forEach(letra => {
    const btn = document.createElement("button");
    btn.innerText = letra;
    btn.onclick = () => add(letra);
    teclado.appendChild(btn);
  });

  // deletar
  const del = document.createElement("button");
  del.innerText = "⌫";
  del.classList.add("delete");
  del.onclick = deletar;
  teclado.appendChild(del);

  const clear = document.createElement("button");
  clear.innerText = "C";
  clear.classList.add("clear");
  clear.onclick = limpar;
  teclado.appendChild(clear);
}



// italiano → decimal
function italianoParaDecimal(valor) {
  let resultado = 0;

  for (let i = 0; i < valor.length; i++) {
    const index = CHARS.indexOf(valor[i].toUpperCase());
    if (index === -1) return NaN;

    resultado = resultado * 21 + index;
  }

  return resultado;
}

// decimal → italiano
function decimalParaItaliano(num) {
  if (num === 0) return "A";

  let resultado = "";

  while (num > 0) {
    const resto = num % 21;
    resultado = CHARS[resto] + resultado;
    num = Math.floor(num / 21);
  }

  return resultado;
}

// italiano → binário 
function italianoParaBinario(valor) {
  return valor
    .toUpperCase()
    .split("")
    .map(letra => {
      const index = CHARS.indexOf(letra);
      if (index === -1) return "?????";
      return index.toString(2).padStart(5, "0");
    })
    .join(" ");
}

// italiano → hexadecimal
function italianoParaHex(valor) {
  const decimal = italianoParaDecimal(valor);
  return isNaN(decimal) ? "-" : decimal.toString(16).toUpperCase();
}

// italiano → octal
function italianoParaOctal(valor) {
  const decimal = italianoParaDecimal(valor);
  return isNaN(decimal) ? "-" : decimal.toString(8);
}


function atualizar() {
  const display = document.getElementById("display");

  display.innerText = valor || "0";

  if (valor === "") {
    setAll("0", "A", "00000", "0", "0");
    return;
  }

  const decimal = italianoParaDecimal(valor);

  if (isNaN(decimal)) {
    setAll("-", "-", "-", "-", "-");
    return;
  }

  document.getElementById("dec").innerText = decimal;
  document.getElementById("ita").innerText = valor.toUpperCase();
  document.getElementById("bin").innerText = italianoParaBinario(valor);
  document.getElementById("hex").innerText = italianoParaHex(valor);
  document.getElementById("oct").innerText = italianoParaOctal(valor);
}


function add(v) {
  valor += v.toUpperCase();
  atualizar();
}

function deletar() {
  valor = valor.slice(0, -1);
  atualizar();
}

// setar valores
function setAll(dec, ita, bin, hex, oct) {
  document.getElementById("dec").innerText = dec;
  document.getElementById("ita").innerText = ita;
  document.getElementById("bin").innerText = bin;
  document.getElementById("hex").innerText = hex;
  document.getElementById("oct").innerText = oct;
}

gerarTeclado();