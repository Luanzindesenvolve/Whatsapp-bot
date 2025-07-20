// 📁 ./arquivos/armor/funcoes/dama.js - Otimizado por ZulluZ 💡

const fs = require("fs");

const path = './arquivos/armor/funcoes/db';

if (!fs.existsSync(path)) {
  fs.mkdirSync(path, { recursive: true });
}

function novaPartida(id, player1, player2) {
  const tabuleiro = [];

  for (let i = 0; i < 8; i++) {
    tabuleiro.push([]);
    for (let j = 0; j < 8; j++) {
      if (i < 3 && (i + j) % 2 === 1) {
        tabuleiro[i].push('🔴');
      } else if (i > 4 && (i + j) % 2 === 1) {
        tabuleiro[i].push('🔵');
      } else {
        tabuleiro[i].push((i + j) % 2 === 0 ? '⬜' : '⬛');
      }
    }
  }

  const jogo = {
    player1,
    player2,
    turno: '🔵',
    tabuleiro,
    status: 'PENDENTE',
    score: {
      '🔵': 0,
      '🔴': 0
    }
  };

  fs.writeFileSync(`${path}/${id}.json`, JSON.stringify(jogo, null, 2));
  return jogo;
}

function existePartida(id) {
  return fs.existsSync(`${path}/${id}.json`);
}

function getPartida(id) {
  if (!existePartida(id)) return null;
  return JSON.parse(fs.readFileSync(`${path}/${id}.json`));
}

function salvarPartida(id, jogo) {
  fs.writeFileSync(`${path}/${id}.json`, JSON.stringify(jogo, null, 2));
}

function removerPartida(id) {
  if (existePartida(id)) {
    fs.unlinkSync(`${path}/${id}.json`);
  }
}

function renderizarTabuleiro(jogo) {
  const letras = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭'];
  const linhas = jogo.tabuleiro.map((linha, i) => `${8 - i} ${linha.join(' ')} ${8 - i}`);
  return `${letras.join(' ')}\n${linhas.join('\n')}\n${letras.join(' ')}`;
}

function coordenadaParaIndice(coord) {
  const letras = ['a','b','c','d','e','f','g','h'];
  const col = letras.indexOf(coord[0].toLowerCase());
  const lin = 8 - parseInt(coord[1]);
  return [lin, col];
}

function moverPeca(jogo, origem, destino) {
  const [oi, oj] = coordenadaParaIndice(origem);
  const [di, dj] = coordenadaParaIndice(destino);
  let peca = jogo.tabuleiro[oi][oj];

  if (peca !== jogo.turno && peca !== '♚') {
    return { erro: "Não é sua peça." };
  }

  const destinoValido = jogo.tabuleiro[di][dj] === '⬛';
  const deltaI = di - oi;
  const deltaJ = dj - oj;
  const inimigo = (peca === '🔵' || peca === '♚') ? '🔴' : '🔵';

  if (Math.abs(deltaI) === 1 && Math.abs(deltaJ) === 1 && destinoValido) {
    jogo.tabuleiro[di][dj] = peca;
    jogo.tabuleiro[oi][oj] = '⬛';
  } else if (Math.abs(deltaI) === 2 && Math.abs(deltaJ) === 2 && destinoValido) {
    const mi = oi + deltaI / 2;
    const mj = oj + deltaJ / 2;
    const meio = jogo.tabuleiro[mi][mj];

    if (meio === inimigo || meio === '♚') {
      jogo.tabuleiro[di][dj] = peca;
      jogo.tabuleiro[oi][oj] = '⬛';
      jogo.tabuleiro[mi][mj] = '⬛';
      jogo.score[(peca === '🔵' || peca === '♚') ? '🔵' : '🔴']++;
    } else {
      return { erro: "Sem peça inimiga para capturar." };
    }
  } else {
    return { erro: "Movimento inválido." };
  }

  // Promoção
  if (peca === '🔵' && di === 0) jogo.tabuleiro[di][dj] = '♚';
  if (peca === '🔴' && di === 7) jogo.tabuleiro[di][dj] = '♚';

  // Verificar fim de jogo
  const flat = jogo.tabuleiro.flat();
  const azuis = flat.filter(p => p === '🔵' || p === '♚').length;
  const vermelhas = flat.filter(p => p === '🔴' || p === '♚').length;

  if (azuis === 0) return { fim: true, vencedor: jogo.player2 };
  if (vermelhas === 0) return { fim: true, vencedor: jogo.player1 };

  jogo.turno = jogo.turno === '🔵' ? '🔴' : '🔵';
  return { sucesso: true, jogo };
}

module.exports = {
  novaPartida,
  existePartida,
  getPartida,
  salvarPartida,
  removerPartida,
  renderizarTabuleiro,
  moverPeca
};