const fs = require('fs');
const path = './arquivos/armor/memoria/db';

if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

const CARDS = ['🍎','🍌','🍇','🍉','🍒','🥝','🍍']; // 7 pares

function novoJogo(id, player1, player2) {
  // Cria o deck embaralhado (14 cartas: 7 pares)
  const deck = [...CARDS, ...CARDS]
    .sort(() => Math.random() - 0.5);

  const jogo = {
    player1,
    player2,
    status: 'PENDENTE',   // PENDENTE, ATIVA, FINALIZADA
    turno: player1,
    deck,                 // cartas embaralhadas
    reveladas: Array(14).fill(false),  // cartas viradas visíveis
    paresEncontrados: { [player1]: 0, [player2]: 0 },
    jogadas: 0,
    tentativa: []         // posições da tentativa atual (máx 2)
  };

  salvar(id, jogo);
  return jogo;
}

function existe(id) {
  return fs.existsSync(`${path}/${id}.json`);
}

function get(id) {
  if (!existe(id)) return null;
  return JSON.parse(fs.readFileSync(`${path}/${id}.json`));
}

function salvar(id, jogo) {
  fs.writeFileSync(`${path}/${id}.json`, JSON.stringify(jogo, null, 2));
}

function del(id) {
  if (existe(id)) fs.unlinkSync(`${path}/${id}.json`);
}

function remover(id) {
  del(id);
}

function render(jogo, aberto = false) {
  // Mostra o tabuleiro em 2 linhas de 7 cartas
  // aberto=true mostra todas as cartas, aberto=false mostra só reveladas, outras ocultas com ❓
  let linhas = [];
  for (let i = 0; i < 2; i++) {
    let linha = [];
    for (let j = 0; j < 7; j++) {
      const idx = i * 7 + j;
      if (aberto || jogo.reveladas[idx]) {
        linha.push(jogo.deck[idx]);
      } else {
        linha.push('❓');
      }
    }
    linhas.push(linha.join(' '));
  }
  return linhas.join('\n');
}

// Função para virar carta (retorna resultado do movimento)
function virarCarta(jogo, pos) {
  if (jogo.reveladas[pos]) return { erro: 'Carta já revelada.' };
  if (jogo.tentativa.length === 2) return { erro: 'Já selecionou 2 cartas, aguarde.' };

  jogo.reveladas[pos] = true;
  jogo.tentativa.push(pos);

  if (jogo.tentativa.length < 2) {
    salvarPartida(jogo);
    return { sucesso: true, msg: 'Selecione outra carta.' };
  }

  // Quando selecionou duas cartas, verifica se formam par
  const [p1, p2] = jogo.tentativa;
  if (jogo.deck[p1] === jogo.deck[p2]) {
    jogo.paresEncontrados[jogo.turno]++;
    jogo.jogadas++;
    jogo.tentativa = [];
    salvarPartida(jogo);

    // Verifica vitória
    if (jogo.paresEncontrados[jogo.player1] + jogo.paresEncontrados[jogo.player2] === 7) {
      jogo.status = 'FINALIZADA';
      salvarPartida(jogo);
      return { sucesso: true, msg: 'Par encontrado! Jogo finalizado.', final: true };
    }

    return { sucesso: true, msg: 'Par encontrado! Continue jogando.' };
  } else {
    // Errou: desvira depois de 3s (deve ser controlado fora dessa função)
    jogo.jogadas++;
    salvarPartida(jogo);
    return { sucesso: true, msg: 'Não é par, espere para desvirar.', par: false };
  }
}

function desvirarCartas(jogo) {
  // desvira as cartas da última tentativa
  jogo.tentativa.forEach(pos => jogo.reveladas[pos] = false);
  jogo.tentativa = [];
  salvarPartida(jogo);
}

function salvarPartida(jogo) {
  // essa função só para garantir salvar
  salvar(jogo.id, jogo);
}

module.exports = {
  novoJogo,
  existe,
  get,
  salvar,
  del,
  remover,
  render,
  virarCarta,
  desvirarCartas
};