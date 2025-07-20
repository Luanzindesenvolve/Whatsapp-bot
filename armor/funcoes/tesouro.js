const fs = require('fs');
const path = './arquivos/armor/tesouro/db';

if (!fs.existsSync(path)) {
  fs.mkdirSync(path, { recursive: true });
}

// Gera uma grade 4x4 com emojis aleatórios
function gerarGrade() {
  const emojis = ['💰', '💣', '🍀'];
  const grade = {};
  const letras = ['A', 'B', 'C', 'D'];
  for (const l of letras) {
    for (let n = 1; n <= 4; n++) {
      const pos = `${l}${n}`;
      const sorteado = emojis[Math.floor(Math.random() * emojis.length)];
      grade[pos] = sorteado;
    }
  }
  return grade;
}

// Inicia um novo jogo
function novoJogo(id, player1, player2) {
  const jogo = {
    player1,
    player2,
    turno: player1,
    status: 'PENDENTE',
    grade: gerarGrade(),
    reveladas: [],
    diam: {
      [player1]: 0,
      [player2]: 0
    },
    tent: {
      [player1]: 4,
      [player2]: 4
    }
  };

  fs.writeFileSync(`${path}/${id}.json`, JSON.stringify(jogo, null, 2));
  return jogo;
}

// Verifica se existe jogo ativo
function existe(id) {
  return fs.existsSync(`${path}/${id}.json`);
}

// Obtém o jogo
function get(id) {
  if (!existe(id)) return null;
  return JSON.parse(fs.readFileSync(`${path}/${id}.json`));
}

// Salva alterações
function save(id, jogo) {
  fs.writeFileSync(`${path}/${id}.json`, JSON.stringify(jogo, null, 2));
}

// Apaga o jogo
function del(id) {
  if (existe(id)) fs.unlinkSync(`${path}/${id}.json`);
}

// Renderiza o tabuleiro com base nas revelações
function renderizarTabuleiro(jogo) {
  const letras = ['A', 'B', 'C', 'D'];
  const header = '   1  2  3  4';
  let visual = [header];

  for (let i = 0; i < 4; i++) {
    let linha = `${letras[i]} `;
    for (let j = 1; j <= 4; j++) {
      const pos = `${letras[i]}${j}`;
      if (jogo.reveladas.includes(pos)) {
        linha += ` ${jogo.grade[pos]} `;
      } else {
        linha += ' ⬛ ';
      }
    }
    visual.push(linha);
  }

  return visual.join('\n');
}

module.exports = {
  novoJogo,
  existe,
  get,
  save,
  del,
  renderizarTabuleiro
};