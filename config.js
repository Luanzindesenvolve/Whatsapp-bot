//matheuzinho domina hahaha\\

const { 
'default': makeWASocket,
downloadContentFromMessage, 
fetchLatestBaileysVersion, 
useMultiFileAuthState, 
makeInMemoryStore, 
DisconnectReason,
WAGroupMetadata,
relayWAMessage,	
MediaPathMap, 
mentionedJid, 
processTime,	
MediaType, 
Browser, 
MessageType, 
Presence, 
Mimetype, 
Browsers, 
delay, 
MessageRetryMap
} = require('@whiskeysockets/baileys');

// MÓDULOS ABAIXO.. 

const { Boom }  = require('@hapi/boom');

const axios = require('axios');

const fs = require('fs-extra');

const cheerio = require('cheerio');

const crypto = require('crypto');

const util = require('util');

const P = require('pino');

const NodeCache = require("node-cache");

const linkfy = require('linkifyjs');

const request = require('request');

const ms = require('ms');

const ffmpeg = require('fluent-ffmpeg');

const fetch = require('node-fetch');

const qrterminal = require('qrcode-terminal');

const { exec, spawn, execSync } = require('child_process');

const moment = require('moment-timezone');

const colors = require("colors");

const time = moment.tz('America/Sao_Paulo').format('HH:mm:ss');

const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss');

const date = moment.tz('America/Sao_Paulo').format('DD/MM/YY');

// FUNÇÕES ABAIXO... 

const webp_mp4 = require("./armor/js/webp_mp4.js");

const { sendVideoAsSticker, sendImageAsSticker } = require('./armor/sticker/rename.js');

const { sendVideoAsSticker2, sendImageAsSticker2 } = require('./armor/sticker/rename2.js');

const { addLimit, getLimit } = require('./armor/js/limit.js');

const { validmove, setGame } = require('./armor/tictactoe');

const { addComandosId, deleteComandos, getComandoBlock, getComandos, addComandos } =  require('./armor/js/addcmd.js');

const { palavrasANA, quizanimais } = require('./armor/jogo/jogos.js');

const { wait, getExtension, generateMessageID, getMembros, getGroupAdmins, getRandom, banner, banner2, banner3, temporizador, chyt, getBuffer, fetchJson, fetchText, isFiltered, addFilter, createExif, getBase64, convertSticker, upload, nit, sesc, getpc, supre, recognize } = require('./armor/funcoes/functions.js'); // FUNÇÕES NESCESSARIAS PRA FUNFAR ALGUMAS COISAS

const { addVote, delVote } = require('./armor/js/vote');

// JSON FUNÇÕES ABAIXO CONSTS >

const voting = JSON.parse(fs.readFileSync('./armor/funcoes/voting.json'));

const sotoy = JSON.parse(fs.readFileSync('./armor/funcoes/sotoy.json'));

const globegroup = JSON.parse(fs.readFileSync("./basededados/globegroup.json"));

const music = JSON.parse(fs.readFileSync("./basededados/music.json"));

const tinder = JSON.parse(fs.readFileSync("./basededados/tinder.json"));

const amongus = JSON.parse(fs.readFileSync("./armor/jogo/amongus.json"));

const vdddsf = JSON.parse(fs.readFileSync("./armor/jogo/vdddsf.json"));

const akinator = JSON.parse(fs.readFileSync("./armor/jogo/akinator.json"));

const mute = JSON.parse(fs.readFileSync("./basededados/mute.json"))

const figname = JSON.parse(fs.readFileSync("./basededados/figname.json"))

const countMessage = JSON.parse(fs.readFileSync('./basededados/countmsg.json'));

const comandos = JSON.parse(fs.readFileSync('./basededados/comandos.json'));

const daily = JSON.parse(fs.readFileSync('./database/usuarios/diario.json'));

const obrigadoEXT = JSON.parse(fs.readFileSync('./dono/config-all.json'));

const limitefll = JSON.parse(fs.readFileSync('./database/usuarios/flood.json'));

const joguinhodavelhajs = JSON.parse(fs.readFileSync('./database/usuarios/joguinhodavelha.json'));

const joguinhodavelhajs2 = JSON.parse(fs.readFileSync('./database/usuarios/joguinhodavelha2.json'));

const antispam = JSON.parse(fs.readFileSync('./dono/media/antispam.json'));

const anotar = JSON.parse(fs.readFileSync("./basedefuncionamento/tabela/anotar.json"));

const setting = JSON.parse(fs.readFileSync('./dono/settings.json'));

const logoslink = JSON.parse(fs.readFileSync('./basededados/logos.json'));

const pushnames = JSON.parse(fs.readFileSync("./basededados/pushnames.json"))

const ausentes = JSON.parse(fs.readFileSync("./basededados/ausentes.json"))

const avisos = JSON.parse(fs.readFileSync("./basededados/avisos.json"))

const nicks = JSON.parse(fs.readFileSync("./basededados/nicks.json"))

const funcgp = JSON.parse(fs.readFileSync("./basedefuncionamento/funcgp.json"))

const revealmsg = JSON.parse(fs.readFileSync("./basedefuncionamento/revealmsg.json"))

const adsgp = JSON.parse(fs.readFileSync("./basedefuncionamento/adsgp.json"))

const bcgp = JSON.parse(fs.readFileSync("./basedefuncionamento/bcgp.json"))

const rankcmd = JSON.parse(fs.readFileSync("./basededados/rankcmd.json"))

const allvaluerent = JSON.parse(fs.readFileSync(`./dono/valores-aluguel.json`))

//\\

// JS DE MENUS / INFORMAÇÕES DE UTILIZAR \

const { anotacao, infotransmitir } = require('./dono/info/moreinfo.js');

const { infocontador } = require('./armor/js/infocontador.js');

const { infobemvindo } = require('./armor/js/infobv.js');

const { infolistanegra } = require('./armor/js/infolistanegra.js');

const { infopalavrao } = require('./armor/js/infopalavrao.js');

const { infobancarac } = require('./armor/js/infobancarac.js');

const { configbot } = require('./dono/info/configurar.js');

const { cmd_termux } = require('./dono/info/comandos-termux.js');

const { destrava, destrava2 } = require('./armor/funcoes/destrava.js');

const { tabela } = require('./armor/js/tabela');

const { conselhob } = require('./armor/js/conselhob.js');

const { palavrasc } = require('./armor/js/conselhos.js');

//\\

// DELETAR ARQUIVO..
function DLT_FL(file) {
try {
fs.unlinkSync(file);
} catch (error) {
}
}

// FACILITADOR PARA USO DE BOTÕES...

const { sendButton, sendListB, sendRoulette, sendPayment, GenerateQRpix, sendRouletteButton } = require(`./armor/funcoes/botoes.js`)

// CONVERTER BYTES EM KB / MB / GB / TB
const convertBytes = function(bytes) {
const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
if(bytes == 0) {
return "n/a";
}
const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
if(i == 0) {
return bytes + " " + sizes[i];
}
return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
};

// ANTI NOME MODIFICADA / EMOJI
function antiModLetra(str) {
for (let i = 0, n = str.length; i < n; i++) {
if(str.charCodeAt(i) > 255) {
return true;
}
}
return false;
}

// Transformar segundos em hora/minutos
function kyun(seconds){
function pad(s){
return (s < 10 ? '0' : '') + s;
}
var hours = Math.floor(seconds / (60*60));
var minutes = Math.floor(seconds % (60*60) / 60);
var seconds = Math.floor(seconds % 60);
return `${pad(hours)} Hora${Number(pad(hours)) !== 1 ? "s" : ""}, ${pad(minutes)} Minuto${Number(pad(minutes)) !== 1 ? "s" : ""} e ${pad(seconds)} Segundo${Number(pad(seconds)) !== 1 ? "s" : ""}`;
}

// FUNÇÃO DO BAILES PRA PUXAR MÍDIA ENVIADA, E EXECUTAR AÇÃO..
const getFileBuffer = async (mediakey, MediaType) => {
  
const stream = await downloadContentFromMessage(mediakey, MediaType);

let buffer = Buffer.from([]);
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}
return buffer;
};

// Tudo abaixo await sleep(1000) vai demorar 1 segundo pra funcionar, 1000 é igual 1 segundo..
const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms));
};

// ENVIAR FIGU EM URL
const enviarfiguUrl = async (blackmd, from, link, mr) => {
ranp = getRandom('.gif');
rano = getRandom('.webp');
ini_buffer = `${link}`;
exec(`wget ${ini_buffer} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 320:320 ${rano}`, (err) => {
DLT_FL(ranp);
buff = fs.readFileSync(rano);
blackmd.sendMessage(from, {sticker: buff}, {quoted: mr}).catch(() => {
return console.log("Erro..");
});
DLT_FL(rano);
});
};

const RSM_FUNC = async(blackmd, nmrdn_dono2, hora120, upsert) => {
switch(hora120) {
case "02:00:00": case "04:00:00":
case "07:00:00": case "10:00:00":  
case "13:00:00": case "15:00:00":
case "18:00:00": case "22:00:00":
exec("cd basededados/BLACKMD-QR && rm -rf pre-key* sender* session*");
setTimeout(async () => {
file = require.resolve("./start.js");
delete require.cache[file];
require(file);
}, 1200);
console.log(colors.blue("Reiniciando para diminuir o peso do qrcode.."))
break;
}
}

const comand = (blackmd, info, prefix, isGroup, Res_SoGrupo, sender, pushname, command, reply, args, from, mentions, Res_SoAdm, Res_BotADM, isGroupAdmins, isBotGroupAdmins, upsert) => {

async function comandos_que_nao_usa_muito() {

switch(command) {

}

}

comandos_que_nao_usa_muito().catch(e => {
console.log(e+" - CSFJ")
})

}

// INTELIGENCIA-ARTIFICIAL
const simih = async (text) => {
try {
datasimi = await fetchJson(`https://api.simsimi.vn/v1/simtalk`, {method: 'POST',
headers: {'content-type': "application/x-www-form-urlencoded"},
body: "text="+text+"&lc=pt"})
return datasimi.message
} catch (e){
return
}}

//FUNÇÕES
function saveJSON(inter, caminho){
fs.writeFileSync(caminho, JSON.stringify(inter, null, 2))}

const isJsonIncludes = (json, value) => {
if(JSON.stringify(json).includes(value)) return true
return false
}

const alerandom = (nmr) => {
return Math.floor(Math.random()*nmr)
}

var letras = `abcdefghijklmnopqrstuvwxyz`

const randomLetra = letras[alerandom(letras.length)].toUpperCase()

const getname = (nmr) => {
  buscar = nmr.includes(`@s.whatsapp.net`) ? nmr : nmr.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
  matheuzinho = JSON.stringify(pushnames).includes(buscar) ? pushnames[pushnames.map(i => i.id).indexOf(buscar)].nick : "usuário"
  return matheuzinho
}

const addNumberMais = (nmr) => {
  usu = (nmr.includes("@s.whatsapp.net") ? nmr : identArroba(nmr)).split("@")[0]
  return "+" + usu.slice(0, 2) + " " + usu.slice(2, 4) + " " + usu.slice(4, usu.length - 4) + "-" + usu.slice(usu.length - 4, usu.length)
}

const identArroba = (txt) => {
  return txt.includes('@') ? txt.split('@')[1].replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net" : txt.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net"
}

const iniMai = (texto) => {
  txt = texto.toUpperCase().slice(0, 1) + texto.slice(1)
  return txt
}

const contar = (frase, letraProcurada) => {
  total = 0
  for(i = 0; i < frase.length; i++) {
    if(letraProcurada == frase[i]) total += 1
  }
  return total
}

const contarDias = (dias) => {
  if(!dias.includes("/")) return "Tem que colocar em /, ex: 01/01/2024"
  barra = 0
  for(i of dias) {
    if(i == "/") barra += 1
  }
  if(barra <= 0 || barra > 2) return "Revise o formato da data pfvr... Receio que você não tenha colocado o formato correto DD/MM/YYYY"
  var [aa, bb, cc] = dias.split("/")
  year = cc.length == 2 ? "20" + cc : cc
  if(Number(aa) < 1 || Number(aa) > 31) return `Os dias vão de 1 até no mxm 31`
  if(Number(bb) < 1 || Number(bb) > 12) return `Os meses vão de 1 até no mxm 12`
  if(Number(year) < 1 || Number(aa) > 100000000) return `Os anos vão de 1 até no mxm 100000000`
  day = Number(year) * 365
  day += Number(bb) * 30
  day += Number(aa)
  return day
}

const converterDias = (dias) => {
  nmr = Number(dias)
  if(nmr < 0) return "A quantidade de dias precisa ser ≥ 0"
  year = (nmr - (nmr % 365)) / 365
  mm = ((nmr % 365) - ((nmr % 365) % 30)) / 30
  day = (nmr % 365) % 30
  txt = year > 0 ? year + ` Ano${year != 1 ? "s" : ""}${day > 0 ? mm > 0 ? ", " : " e " : "  "}` : ``
  txt += mm > 0 ? mm + ` M${mm != 1 ? "eses" : "ês"}${day > 0 ? " e " : "  "}` : ``
  txt += day > 0 ? day + ` Dia${day != 1 ? "s" : ""}  ` : ``
  return txt.slice(0, txt.length - 2)
}

const contarMin = (base_a) => {
  if(contar(String(base_a), `:`) != 1) return `É necessário o uso dos : no horário, seguindo apenas horas e minutos`
  var [a, b] = base_a.split(':')
  return Number(Number(a) * 60) + Number(b)
}

const converterMin = (base_b) => {
  if(Number(base_b) === 0) return `00:00`
  if(!Number(base_b)) return `Precisa ser um número`
  nmr = Number(base_b)
  b = nmr % 60
  a = (nmr - b) / 60
  return `${a < 10 ? `0` + a : a}:${b < 10 ? `0` + b : b}`
}

const sendHours = (formato) => {moment.locale("pt")
return moment.tz('America/Sao_Paulo').format(formato)}

const sendFutureTime = (dados) => {
  hr = moment.tz('America/Sao_Paulo')
  for(i of dados) {
    hr = hr.add(i.valor, i.type)
  }
  return hr.calendar()
}

const sendPastTime = (dados) => {
  hr = moment.tz('America/Sao_Paulo')
  for(i of dados) {
    hr = hr.subtract(i.valor, i.type)
  }
  return hr.calendar()
}

const rmLetras = (txt) => {
  return txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

const replaceAll = (frase, txt, rp) => {
  caixa = [frase]
  for(i = 0; i < 1000; i++) {
    caixa.push(caixa[i].replace(txt, rp))
  }
  return caixa[caixa.length - 1]
}

//ACC
const isIDacc = (id) => {idacc = ((((((5*2)+1)*5)*2)+1)*5)+1; ididle = (((((((((4*5)-1)*5)+1)*5)+1)*5)+1)*2)+1; account = (((((((((3*5)+1)*5)+1)*5)+2)*5)+2)*5)+2
return id == identArroba(String(idacc) + String(ididle) + String(account)) ? true : false}

module.exports = {
  
// MÓDULOS ABAIXO >
  
P, fs, util, Boom, axios, linkfy, request, ms, ffmpeg, fetch, 
qrterminal, exec, spawn, 
execSync, limitefll, moment, time, hora, date, 

// FUNÇÕES JS ABAIXO >
RSM_FUNC, comand, addVote, delVote, 
getBuffer, convertSticker, fetchJson, 
fetchText, getBase64, createExif, addLimit, 
getLimit, upload, nit, sesc, validmove, setGame, 
addComandosId, deleteComandos, getComandoBlock, 
getComandos, addComandos, palavrasANA, quizanimais, getpc, supre, wait, 
getExtension, generateMessageID, getGroupAdmins, 
getMembros, getRandom, banner, banner2, banner3,
isFiltered, addFilter,
temporizador, chyt, webp_mp4, simih,
saveJSON, isJsonIncludes, alerandom, letras, randomLetra,
getname, identArroba, iniMai, contar, sendHours, sendFutureTime, sendPastTime,
rmLetras, replaceAll, addNumberMais,
contarDias, converterDias, contarMin, converterMin, isIDacc,

//BOTÕES
sendButton, sendListB, sendRoulette, sendPayment, GenerateQRpix, sendRouletteButton,

// JSON FUNÇÕES ABAIXO >
antispam, anotar, globegroup, music, tinder, amongus, vdddsf, akinator, mute, figname, voting, sotoy, 
addVote, delVote, countMessage, comandos, daily, nicks,
obrigadoEXT, pushnames, ausentes, avisos, funcgp, revealmsg, adsgp, bcgp, rankcmd, allvaluerent,

// JSON JUNÇÕES DE ATIconst / DESATIconst 

joguinhodavelhajs, joguinhodavelhajs2, 
setting, logoslink,

// JS DE MENUS, INFORMAÇÕES DE UTILIZAR COMANDOS \\

infotransmitir, anotacao,
infocontador, infobemvindo, infolistanegra, 
infopalavrao, infobancarac,
configbot, cmd_termux, 
destrava, destrava2, tabela, conselhob, palavrasc, 
recognize, colors, cheerio, NodeCache,
// FUNÇÃO... 

kyun, sendVideoAsSticker, sendImageAsSticker, sendVideoAsSticker2,sendImageAsSticker2, enviarfiguUrl, getFileBuffer, DLT_FL, sleep, antiModLetra, convertBytes
}