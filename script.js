const chars = "ABCDEFGHILMNOPQRSTUVZ";
let valor = "";

// gerar teclado completo
function gerarTeclado() {
  const teclado = document.getElementById("teclado");
  teclado.innerHTML = "";

  const botoes = [
    "1","2","3","4","5",
    "6","7","8","9","0",
    ...chars.split("")
  ];

  botoes.forEach(b => {
    let btn = document.createElement("button");
    btn.innerText = b;
    btn.onclick = () => add(b);
    teclado.appendChild(btn);
  });

  // deletar
  let del = document.createElement("button");
  del.innerText = "⌫";
  del.onclick = deletar;
  teclado.appendChild(del);

  // limpar
  let clear = document.createElement("button");
  clear.innerText = "C";
  clear.className = "clear";
  clear.onclick = limpar;
  teclado.appendChild(clear);
}

// adicionar valor
function add(v) {
  valor += v;
  atualizar();
}

// deletar último
function deletar() {
  valor = valor.slice(0, -1);
  atualizar();
}

// limpar tudo
function limpar() {
  valor = "";
  atualizar();
}

// italiano → decimal
function italianoParaDecimal(valor) {
  let resultado = 0;

  for (let i = 0; i < valor.length; i++) {
    let index = chars.indexOf(valor[i].toUpperCase());
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
    let resto = num % 21;
    resultado = chars[resto] + resultado;
    num = Math.floor(num / 21);
  }

  return resultado;
}

// italiano → binário (5 bits por letra)
function italianoParaBinario(valor) {
  let resultado = [];

  for (let i = 0; i < valor.length; i++) {
    let index = chars.indexOf(valor[i].toUpperCase());
    if (index === -1) continue;

    resultado.push(index.toString(2).padStart(5, "0"));
  }

  return resultado.join(" ");
}

// atualizar tela
function atualizar() {
  document.getElementById("display").innerText = valor || "0";

  if (valor === "") {
    setAll("0", "00000", "A");
    return;
  }

  let decimal;

  // se for número puro
  if (/^[0-9]+$/.test(valor)) {
    decimal = parseInt(valor);
  } else {
    decimal = italianoParaDecimal(valor);
  }

  if (isNaN(decimal)) {
    setAll("-", "-", "-");
    return;
  }

  document.getElementById("dec").innerText = decimal;
  document.getElementById("ita").innerText = decimalParaItaliano(decimal);
  document.getElementById("bin").innerText = italianoParaBinario(valor);
}

// set valores
function setAll(dec, bin, ita) {
  document.getElementById("dec").innerText = dec;
  document.getElementById("bin").innerText = bin;
  document.getElementById("ita").innerText = ita;
}

// iniciar
gerarTeclado();