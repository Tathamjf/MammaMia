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

function italianoParaBinario(valor) {
  let resultado = [];

  for (let i = 0; i < valor.length; i++) {
    let index = chars.indexOf(valor[i].toUpperCase());
    if (index === -1) return "Erro";

    let bin = index.toString(2).padStart(5, "0");
    resultado.push(bin);
  }

  return resultado.join(" ");
}

function italianoParaHex(valor) {
  let decimal = italianoParaDecimal(valor);
  if (isNaN(decimal)) return "-";
  return decimal.toString(16).toUpperCase();
}

function italianoParaOctal(valor) {
  let decimal = italianoParaDecimal(valor);
  if (isNaN(decimal)) return "-";
  return decimal.toString(8);
}

function atualizar() {
  document.getElementById("display").innerText = valor || "0";

  if (valor === "") {
    setAll("0", "A", "00000", "0", "0");
    return;
  }

  let decimal = italianoParaDecimal(valor);

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
  valor += v;
  atualizar();
}

function deletar() {
  valor = valor.slice(0, -1);
  atualizar();
}

function setAll(dec, ita, bin, hex, oct) {
  document.getElementById("dec").innerText = dec;
  document.getElementById("ita").innerText = ita;
  document.getElementById("bin").innerText = bin;
  document.getElementById("hex").innerText = hex;
  document.getElementById("oct").innerText = oct;
}

// inicial
trocarModo();
gerarTeclado();