var linguagens = [
	"PYTHON",
  "JAVASCRIPT",
  "MONGODB",
  "JSON",
  "JAVA",
  "HTML",
  "CSS",
  "C",
  "CSHARP",
  "GOLANG",
  "KOTLIN",
  "PHP",
  "SQL",
  "RUBY"
]

var resposta = '';
var limiteErros = 6;
var erros = 0;
var chutes = [];
var palavraStatus = null;
var invalidas = '';

function palavraAleatoria() {
  resposta = linguagens[Math.floor(Math.random() * linguagens.length)];
}

function geradorDeBotoes() {
  var buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVXYZ'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="lidaComChute('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('teclado').innerHTML = buttonsHTML;
}

function lidaComChute(letraEscolhida) {
  chutes.indexOf(letraEscolhida) === -1 ? chutes.push(letraEscolhida) : null;
  document.getElementById(letraEscolhida).setAttribute('disabled', true);
  

  if (resposta.indexOf(letraEscolhida) >= 0) {
    chutePalavra();
    checkIfGameWon();
  } else if (resposta.indexOf(letraEscolhida) === -1) {
    erros++;
    updateErros();
    checkIfGameLost();
    updateImgForca();
    document.getElementById('invalidas').innerHTML += letraEscolhida;
  }
}

function updateImgForca() {
  document.getElementById('imgForca').src = './images/' + erros + '.jpg';
}

function checkIfGameWon() {
  if (palavraStatus === resposta) {
      document.getElementById('teclado').innerHTML = 'Você Venceu. Parabéns!';
      document.getElementById('imgForca').src = './images/ganhou.jpg';
  }
}


function checkIfGameLost() {
  if (erros === limiteErros) {
    document.getElementById('wordSpotlight').innerHTML = 'A resposta era: ' + resposta;
    document.getElementById('teclado').innerHTML = 'Fim de jogo';
  }
}

function chutePalavra() {
  palavraStatus = resposta.split('').map(letter => (chutes.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = palavraStatus;
}

function updateErros() {
  document.getElementById('erros').innerHTML = erros;
}

function reset() {
  erros = 0;
  chutes = [];
  document.getElementById('imgForca').src = './images/0.jpg';
  document.getElementById('invalidas').innerHTML = '';

  palavraAleatoria();
  chutePalavra();
  updateErros();
  geradorDeBotoes();
}

document.getElementById('limiteErros').innerHTML = limiteErros;