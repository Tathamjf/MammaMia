const chars = "ABCDEFGHILMNOPQRSTUVZ";
let valor = "";
let modo = "italiano";

function trocarModo() {
  modo = document.getElementById("modo").value;
  valor = "";
  atualizar();
  gerarTeclado();
}

function gerarTeclado() {
  const teclado = document.getElementById("teclado");
  teclado.innerHTML = "";

  const botoes = chars.split(""); // só letras italianas

  botoes.forEach(b => {
    let btn = document.createElement("button");
    btn.innerText = b;
    btn.onclick = () => add(b);
    teclado.appendChild(btn);
  });

  let del = document.createElement("button");
    del.innerText = "⌫";
del.onclick = deletar;
teclado.appendChild(del);
}

function italianoParaDecimal(valor) {
  let resultado = 0;

  for (let i = 0; i < valor.length; i++) {
    let index = chars.indexOf(valor[i].toUpperCase());
    if (index === -1) return NaN;

    resultado = resultado * 21 + index;
  }

  return resultado;
}

function decimalParaItaliano(num) {
  if (num === 0) return "A";

  let resultado = "";

  while (num > 0) {
    let resto = num % 21;
    resultado = chars[resto] + resultado;
    num = Math.floor(num / 21);
  }

  return resultado;
}

function atualizar() {
  document.getElementById("display").innerText = valor || "0";

  if (valor === "") {
    setAll("0", "A");
    return;
  }

  let decimal;

  if (modo === "numero") {
    // interpreta letras como posição (A=0, B=1...)
    decimal = italianoParaDecimal(valor);
  } else {
    decimal = italianoParaDecimal(valor);
  }

  if (isNaN(decimal)) {
    setAll("-", "-");
    return;
  }

  document.getElementById("dec").innerText = decimal;
  document.getElementById("ita").innerText = valor.toUpperCase();
}

function add(v) {
  valor += v;
  atualizar();
}

function deletar() {
  valor = valor.slice(0, -1);
  atualizar();
}

function setAll(dec, ita) {
  document.getElementById("dec").innerText = dec;
  document.getElementById("ita").innerText = ita;
}

// inicial
trocarModo();
gerarTeclado();