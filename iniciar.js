// auto-reconnect.js

const { spawn } = require('child_process');

const COLORS = {
  NOCOLOR: '\x1b[0m',
  RED: '\x1b[0;31m',
  GREEN: '\x1b[0;32m',
  ORANGE: '\x1b[0;33m',
  BLUE: '\x1b[0;34m',
  PURPLE: '\x1b[0;35m',
  CYAN: '\x1b[0;36m',
  SABGRAY: '\x1b[0;37m',
  DARKGRAY: '\x1b[1;30m',
  SABGREEN: '\x1b[1;32m',
  YELLOW: '\x1b[1;33m',
  SABRED: '\x1b[1;34m',
  SABPURPLE: '\x1b[1;35m',
  SABTCYAN: '\x1b[1;36m',
  WHITE: '\x1b[1;37m'
};

function startBot() {
  console.log(`${COLORS.GREEN}︎LADY-MD - Auto reconexão ativada para prevenção de quedas...\n`);

  const process = spawn('node', ['start.js', '--code'], { stdio: 'inherit' });

  process.on('exit', (code) => {
    console.log(`${COLORS.BLUE}︎Iniciando Sistemas [ ! ]\n${COLORS.NOCOLOR}`);
    setTimeout(startBot, 1000); // Espera 1 segundo e reinicia
  });
}

startBot();