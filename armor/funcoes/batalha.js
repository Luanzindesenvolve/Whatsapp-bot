// 📁 ./arquivos/armor/batalhanaval/batalhanaval.js – Módulo Batalha Naval ⚓️

const fs = require('fs');
const dir = './arquivos/armor/batalhanaval/db';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const LETRAS = ['A', 'B', 'C', 'D', 'E']; // grade 5x5
const EMOJIS = { agua: '🌊', navio: '🚢', tiro: '💥', acerto: '🔥' };

/* ───────── Helpers ───────── */
function coordenadasValidas(pos) {
  return /^[a-e][1-5]$/i.test(pos);
}

function posToIdx(pos) {
  const col = LETRAS.indexOf(pos[0].toUpperCase());
  const row = parseInt(pos[1]) - 1;
  return [row, col];
}

function gerarTabuleiro() {
  const tab = {};
  LETRAS.forEach(L => {
    for (let n = 1; n <= 5; n++) tab[`${L}${n}`] = EMOJIS.agua;
  });

  // Dois navios de tamanho 2
  let colocados = 0;
  while (colocados < 2) {
    const orient = Math.random() < 0.5 ? 'H' : 'V';
    const col = Math.floor(Math.random() * 5);
    const row = Math.floor(Math.random() * 5);
    const pos1 = `${LETRAS[col]}${row + 1}`;
    const pos2 = orient === 'H' ? `${LETRAS[col + 1] || ''}${row + 1}` : `${LETRAS[col]}${row + 2}`;

    if (!coordenadasValidas(pos2)) continue;
    if (tab[pos1] !== EMOJIS.navio && tab[pos2] !== EMOJIS.navio) {
      tab[pos1] = EMOJIS.navio;
      tab[pos2] = EMOJIS.navio;
      colocados++;
    }
  }
  return tab;
}

/* ───────── Persistência ───────── */
function novoJogo(group, p1, p2) {
  const jogo = {
    player1: p1,
    player2: p2,
    status: 'PENDENTE',
    turno: p1,
    tab: {
      [p1]: gerarTabuleiro(),
      [p2]: gerarTabuleiro()
    },
    tiros: {
      [p1]: [],
      [p2]: []
    },
    vivos: {
      [p1]: 4,
      [p2]: 4
    }
  };
  fs.writeFileSync(`${dir}/${group}.json`, JSON.stringify(jogo, null, 2));
  return jogo;
}

const existe = id => fs.existsSync(`${dir}/${id}.json`);
const get = id => JSON.parse(fs.readFileSync(`${dir}/${id}.json`));
const save = (id, j) => fs.writeFileSync(`${dir}/${id}.json`, JSON.stringify(j, null, 2));
const del = id => { if (existe(id)) fs.unlinkSync(`${dir}/${id}.json`); };

/* ───────── Renderização parcial ───────── */
function render(jogo, viewer) {
  const enemy = viewer === jogo.player1 ? jogo.player2 : jogo.player1;
  const header = '   1  2  3  4  5';
  const linhas = [header];

  for (let r = 1; r <= 5; r++) {
    const linha = [LETRAS[r - 1]];
    for (let c = 1; c <= 5; c++) {
      const pos = `${LETRAS[c - 1]}${r}`;
      if (jogo.tiros[viewer].includes(pos)) {
        linha.push(jogo.tab[enemy][pos] === EMOJIS.navio ? EMOJIS.acerto : EMOJIS.tiro);
      } else {
        linha.push('⬛');
      }
    }
    linhas.push(linha.join(' '));
  }

  return linhas.join('\n');
}

module.exports = {
  novoJogo,
  existe,
  get,
  save,
  del,
  render,
  EMOJIS,
  coordenadasValidas
};
