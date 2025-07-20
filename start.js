const { 'default': makeWASocket, useMultiFileAuthState, makeInMemoryStore, DisconnectReason, WAGroupMetadata, relayWAMessage,	MediaPathMap, mentionedJid, processTime, MediaType, Browser, MessageType, Presence, Mimetype, Browsers, delay, fetchLatestBaileysVersion, MessageRetryMap, extractGroupMetadata, generateWAMessageFromContent, proto, otherOpts, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');

const { fs, Boom, axios, crypto, util, P, linkfy, request, cheerio, ms, exec, moment, time, hora, date, getBuffer, getFileBuffer, fetchJson, getBase64, upload, banner2, banner3, colors, getGroupAdmins, sendButton, comand, addNumberMais, identArroba, getname, sendHours } = require('./config.js');

const { NodeCache, obrigadoEXT, setting, logoslink, countMessage, sendVideoAsSticker, sendImageAsSticker, sendVideoAsSticker2, sendImageAsSticker2, limitefll, addVote, delVote, anotar, getRandom } = require('./config.js');

const pushnames = JSON.parse(fs.readFileSync("./basededados/pushnames.json"))

var { blacksite } = require('./dono/config-all.json')

const replaceAll = (frase, txt, rp) => {
  caixa = [frase]
  for(i = 0; i < 500; i++) {
    caixa.push(caixa[i].replace(txt, rp))
  }
  return caixa[caixa.length - 1]
}

const time2 = Number(sendHours("HH"))
if(time2 >= 6 && time2 < 12) {var tempo = `Bom dia`
} else if(time2 >= 12 && time2 < 18) {var tempo = `Boa tarde`
} else {var tempo = `Boa noite`}

const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms));
};

function DLT_FL(file) {
try {
fs.unlinkSync(file);
} catch (error) {
}
}

const kontol_info2 = console.info;
console.info = function() { 
if(!util.format(...arguments).includes("Closing session: SessionEntry")){ 
return kontol_info2(...arguments); 
}};

const kontol_info1 = console.info;
console.info = function() { 
if(!util.format(...arguments).includes("Removing old closed session: SessionEntry {")){
return kontol_info1(...arguments);
}};

const msgRetryCounterCache = new NodeCache();

var qrcode = "./basededados/BLACKMD-QR";

const readline = require("readline");

const pairingCode = process.argv.includes("--code");
const rl = readline.createInterface({input: process.stdin, output: process.stdout,});
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function STBLK() {

const { state, saveCreds } = await useMultiFileAuthState(qrcode);

const { version, isLatest } = await fetchLatestBaileysVersion();

const blackmd = makeWASocket({
version,
auth: state,
syncFullHistory: true,
printQRInTerminal: !pairingCode,
qrTimeout: 180000,
logger: P({ level: 'silent' }),
browser: ['Ubuntu', 'Edge', '110.0.1587.56'],
msgRetryCounterCache,
connectTimeoutMs: 60000,
defaultQueryTimeoutMs: 0,
keepAliveIntervalMs: 10000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
syncFullHistory: true,
markOnlineOnConnect: true,
patchMessageBeforeSending: (message) => {
const requiresPatch = !!(message?.interactiveMessage);
if(requiresPatch) {
message = {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadataVersion: 2,
deviceListMetadata: {}},
...message}}}}
return message}});

const PhoneNumber = require('awesome-phonenumber')

if(pairingCode && !blackmd.authState.creds.registered) {
let phoneNumber = await question(`${colors.white("- ")}${colors.cyan("Insira abaixo no número que você deseja conectar, não deixando de colocar o prefixo do país (55), o DDD e seu número:\n")} `);
phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
let code = await blackmd.requestPairingCode(phoneNumber);
code = code?.match(/.{1,4}/g)?.join("-") || code;
console.log(`${colors.white("- ")}${colors.cyan("Código de pareamento no WhatsApp:")} ${code}`);
rl.close();
}

blackmd.ev.process(
async(events) => {
  
if(events["group-participants.update"]){
try {
var BLKMD = events["group-participants.update"];

if(!fs.existsSync(`./basededados/grupos/${BLKMD.id}.json`)) return;
var jsonGp = JSON.parse(fs.readFileSync(`./basededados/grupos/${BLKMD.id}.json`));

if(BLKMD.participants[0].startsWith(blackmd.user.id.split(':')[0])) return;

const botNumber = identArroba(blackmd.user.id.split(':')[0])

try {
var grpmdt = await blackmd.groupMetadata(BLKMD.id);
} catch (e) {
return;
}
const isGroup2 = grpmdt.id.endsWith('@g.us');
try {
var GroupMetadata_ = isGroup2 ? await blackmd.groupMetadata(BLKMD.id): "";
} catch (e) {
return;
}

const membros_ = isGroup2 ? GroupMetadata_.participants : '';
const groupAdmins_ = isGroup2 ? getGroupAdmins(membros_) : '';

// BEM VINDO 
try {
var mdata_2 = isGroup2 ? await blackmd.groupMetadata(BLKMD.id): "";
} catch (e) {
return;
}

const from = mdata_2.id

const welkom = jsonGp[0].wellcome

const isWelcomed = welkom[0].bemvindo1 == true && welkom[0].legendabv != 0 ? true : false

const isByed = welkom[0].bemvindo1 == true && welkom[0].legendasaiu != 0 ? true : false

const isWelcomed2 = welkom[1].bemvindo2 == true && welkom[1].legendabv != 0 ? true : false

const isByed2 = welkom[1].bemvindo2 == true && welkom[1].legendasaiu != 0 ? true : false

const isWelcomed3 = welkom[2].bemvindo3 == true && fs.existsSync(`./basededados/grupos/figurinhas/sticker-bv-${from}.webp`) ? true : false

const isByed3 = welkom[2].bemvindo3 == true && fs.existsSync(`./basededados/grupos/figurinhas/sticker-saiu-${from}.webp`) ? true : false

const isWelcomed4 = welkom[3].bemvindo4 == true && fs.existsSync(`./basededados/grupos/audios/audio-bv-${from}.mp3`) ? true : false

const isByed4 = welkom[3].bemvindo3 == true && fs.existsSync(`./basededados/grupos/audios/audio-saiu-${from}.mp3`) ? true : false

const isWelcomed5 = welkom[4].bemvindo5 == true && welkom[4].legendabv != 0 ? true : false

const isByed5 = welkom[4].bemvindo5 == true && welkom[4].legendasaiu != 0 ? true : false

//============================\\
const groupDesc = await mdata_2.desc;

try { ppimg = (await axios.get(`https://tinyurl.com/api-create.php?url=${(await blackmd.profilePictureUrl(`${BLKMD.participants[0].split('@')[0]}@c.us`, 'image'))}`)).data
} catch(e) { ppimg = 'https://telegra.ph/file/d9909cc45b86459fcb8a9.jpg' }

try { stts = (await blackmd.fetchStatus(BLKMD.participants[0])).status
} catch { stts = "🔒 Privada 🔒" }

const status = stts

const getddd = (id) => {
  if(Number(id.slice(0, 2)) !== 55) return `Não é do Brasil`
  nmr = Number(id.slice(2, 4))
  if(nmr >= 11 && nmr <= 19) return `São Paulo`
  else if(nmr >= 21 && nmr <= 24 && nmr != 23) return `Rio de Janeiro`
  else if(nmr >= 27 && nmr <= 28) return `Espírito Santo`
  else if(nmr >= 31 && nmr <= 38) return `Minas Gerais`
  else if(nmr >= 41 && nmr <= 46) return `Paraná`
  else if(nmr >= 47 && nmr <= 49) return `Santa Catarina`
  else if(nmr >= 51 && nmr <= 55 && nmr != 52) return `Rio Grande do Sul`
  else if(nmr == 61) return `Distrito Federal`
  else if(nmr == 62 || nmr == 64) return `Goiás`
  else if(nmr == 63) return `Tocantins`
  else if(nmr >= 65 && nmr <= 66) return `Mato Grosso`
  else if(nmr == 67) return `Mato Grosso do Sul`
  else if(nmr == 68) return `Acre`
  else if(nmr == 69) return `Rondônia`
  else if(nmr >= 71 && nmr <= 77 && nmr != 72 && nmr != 76) return `Bahia`
  else if(nmr == 79) return `Sergipe`
  else if(nmr == 81 || nmr == 87) return `Pernambuco`
  else if(nmr == 82) return `Alagoas`
  else if(nmr == 83) return `Paraíba`
  else if(nmr == 84) return `Rio Grande do Norte`
  else if(nmr == 85 || nmr == 88) return `Ceará`
  else if(nmr == 86 || nmr == 89) return `Piauí`
  else if(nmr >= 91 && nmr <= 94 && nmr != 92) return `Pará`
  else if(nmr == 92 || nmr == 97) return `Amazonas`
  else if(nmr == 95) return `Roraima`
  else if(nmr == 96) return `Amapá`
  else if(nmr >= 98 && nmr <= 99) return `Maranhão`
  else return `Não está no banco de dados brasileiro`
}

const descbv = (nmr) => {
  teks = welkom[nmr].legendabv
  .replace('#tempo#', tempo)
  .replace('#hora#', time)
  .replace('#nomedogp#', mdata_2.subject)
  .replace('#numerodele#', '@'+BLKMD.participants[0].split('@')[0])
  .replace('#nomedele#', getname(BLKMD.participants[0]))
  .replace('#wame#', `wa.me/${BLKMD.participants[0].split('@')[0]}`)
  .replace('#numero#', addNumberMais(BLKMD.participants[0]))
  .replace('#status#', status)
  .replace('#numerobot#', '@'+botNumber.split("@")[0])
  .replace('#nomebot#', setting.NomeDoBot)
  .replace('#nickdono#', setting.NickDono)
  .replace('#estado#', getddd(BLKMD.participants[0]))
  .replace('#descrição#', groupDesc)
  return replaceAll(teks, '#prefixo#', jsonGp[0].multiprefix == true ? jsonGp[0].prefixos[0] : setting.prefix)
}

const descsaiu = (nmr) => {
  teks = welkom[nmr].legendasaiu
  .replace('#tempo#', tempo)
  .replace('#hora#', time)
  .replace('#nomedogp#', mdata_2.subject)
  .replace('#numerodele#', '@'+BLKMD.participants[0].split('@')[0])
  .replace('#nomedele#', getname(BLKMD.participants[0]))
  .replace('#wame#', `wa.me/${BLKMD.participants[0].split('@')[0]}`)
  .replace('#numero#', addNumberMais(BLKMD.participants[0]))
  .replace('#status#', status)
  .replace('#numerobot#', '@'+botNumber.split("@")[0])
  .replace('#nomebot#', setting.NomeDoBot)
  .replace('#nickdono#', setting.NickDono)
  .replace('#estado#', getddd(BLKMD.participants[0]))
  .replace('#descrição#', groupDesc)
  return replaceAll(teks, '#prefixo#', jsonGp[0].multiprefix == true ? jsonGp[0].prefixos[0] : setting.prefix)
}

if(BLKMD.action === 'add') {
  var m4thxyz_ = BLKMD.participants[0]
  BLKMD.participants.push(botNumber)
  console.log(colors.white(BLKMD))

  //lista negra global
  if(obrigadoEXT.listanegraG.includes(m4thxyz_)) {
    await blackmd.sendMessage(from,{text: '*Olha quem deu as cara por aqui, sente o poder do ban*'});
    return blackmd.groupParticipantsUpdate(from, [m4thxyz_], 'remove')
  }

  //lista negra local
    if(jsonGp[0].listanegra.includes(BLKMD.participants[0])) {
    await blackmd.sendMessage(from, {text: '*Oxi oxi kkkkkk vc não é bem vindo aqui... METE O PÉ*'});
    return blackmd.groupParticipantsUpdate(from, [m4thxyz_], 'remove')
  }

  //anti gringo no grupo
  if(jsonGp[0].antifake && m4thxyz_.slice(0, 2) != "55") {
    if(jsonGp[0].legenda_estrangeiro != "0") {
      await blackmd.sendMessage(from, {text: jsonGp[0].legenda_estrangeiro})
    }
    setTimeout(async() => {
      blackmd.groupParticipantsUpdate(from, [m4thxyz_], 'remove')
    }, 1000)
    return
  }

  //x9 pra revelar quem entrou no grupo
  if(jsonGp[0].x9 && BLKMD?.author && BLKMD.author.length > 0 && BLKMD.author != m4thxyz_ && BLKMD.author != botNumber) blackmd.sendMessage(from, {text: `O admin @${BLKMD.author.split(`@`)[0]} acaba de adicionar o membro @${m4thxyz_.split("@")[0]} com sucesso no grupo ${mdata_2.subject}... ✔`, contextInfo: {mentionedJid: [BLKMD.author, m4thxyz_], forwardingScore: 999, isForwarded: true}})

  //início do bem vindo
  if(isWelcomed) {
    try { ftgp = (await axios.get(`https://tinyurl.com/api-create.php?url=${(await blackmd.profilePictureUrl(from, 'image'))}`)).data
    } catch(e) { ftgp = 'https://telegra.ph/file/d9909cc45b86459fcb8a9.jpg' }
    blackmd.sendMessage(from, {
      image: {
        url: `https://blacksystemofc.com.br/api/canvas/jxr/welcome?nome=${encodeURI(getname(m4thxyz_))}&guilda=${encodeURI(mdata_2.subject)}&avatar=${ppimg}&membro=${mdata_2.participants.length}&perfil=${ftgp}&fundo=`+welkom[0].fundobemvindo
      },
      caption: descbv(0),
      mentions: BLKMD.participants
    })
  }
  if(isWelcomed2) {
    blackmd.sendMessage(from, {text: descbv(1), mentions: BLKMD.participants})
  }
  if(isWelcomed3) {
    if(welkom[2].selobv) {
      blackmd.sendMessage(from,
        {sticker:
          {url: `./basededados/grupos/figurinhas/sticker-bv-${from}.webp`},
          mentions: BLKMD.participants
        }, {quoted: {
          key: {
            fromMe: false,
            participant: BLKMD.participants[0]
          },
          message: {
            conversation: descbv(2)
          }
        }
      })
    } else blackmd.sendMessage(from, {sticker: {url: `./basededados/grupos/figurinhas/sticker-bv-${from}.webp`}, mentions: BLKMD.participants})
  }
  if(isWelcomed4) {
    if(welkom[3].selobv) {
      blackmd.sendMessage(from,
        {audio:
          {url: `./basededados/grupos/audios/audio-bv-${from}.mp3`},
          mimetype: `audio/mpeg`,
          mentions: BLKMD.participants,
          ptt: true
        }, {quoted: {
          key: {
            fromMe: false,
            participant: BLKMD.participants[0]
          },
          message: {
            conversation: descbv(3)
          }
        }
      })
    } else blackmd.sendMessage(from, {audio: {url: `./basededados/grupos/audios/audio-bv-${from}.mp3`}, mimetype: `audio/mpeg`, mentions: BLKMD.participants, ptt: true})
  }
  if(isWelcomed5) {
    sendButton(from, {
      video: {
        url: welkom[4].fundobemvindo,
        caption: descbv(4),
        footer: setting.NomeDoBot,
        mentions: BLKMD.participants
      }
    }, blackmd, BLKMD.participants[0], butao)
  }
} else if(BLKMD.action === 'remove') {
  var m4thxyz_ = BLKMD.participants[0]
  BLKMD.participants.push(botNumber)
  console.log(colors.brightRed(BLKMD))

  //x9 pra revelar quem entrou no grupo
  if(jsonGp[0].x9 && BLKMD?.author && BLKMD.author.length > 0 && BLKMD.author != botNumber && BLKMD.author != m4thxyz_) return blackmd.sendMessage(from, {text: `O admin @${BLKMD.author.split(`@`)[0]} acaba de remover o membro @${m4thxyz_.split("@")[0]} com sucesso do grupo ${mdata_2.subject}... 💢`, contextInfo: {mentionedJid: [BLKMD.author, m4thxyz_], forwardingScore: 999, isForwarded: true}})

  //funções de saída do bem vindo
  if(isByed) {
    blackmd.sendMessage(from, {
      image: {
        url: `https://blacksystemofc.com.br/welcome?titulo=${encodeURI(tempo.toUpperCase())}&nome=Bye%20Bye%20${encodeURI(getname(m4thxyz_))}&perfil=${ppimg}&fundo=${jsonGp[0].wellcome[0].fundosaiu}&grupo=Saiu%20de%20${encodeURI(mdata_2.subject)}`},
        caption: descsaiu(0),
        mentions: BLKMD.participants
      })
  }
  if(isByed2) {
    blackmd.sendMessage(from, {text: descsaiu(1), mentions: BLKMD.participants})
  }
  if(isByed3) {
    if(welkom[2].selosaiu) {
      blackmd.sendMessage(from,
        {sticker:
          {url: `./basededados/grupos/figurinhas/sticker-saiu-${from}.webp`},
        }, {quoted: {
          key: {
            fromMe: false,
            participant: BLKMD.participants[0]
          },
          message: {
            conversation: descsaiu(2)
          }
        }
      })
    } else blackmd.sendMessage(from, {sticker: {url: `./basededados/grupos/figurinhas/sticker-saiu-${from}.webp`}})
  }
  if(isByed4) {
    if(welkom[3].selosaiu) {
      blackmd.sendMessage(from,
        {audio:
          {url: `./basededados/grupos/audios/audio-saiu-${from}.mp3`},
          mimetype: `audio/mpeg`,
          ptt: true
        }, {quoted: {
          key: {
            fromMe: false,
            participant: BLKMD.participants[0]
          },
          message: {
            conversation: descsaiu(3)
          }
        }
      })
    } else blackmd.sendMessage(from, {audio: {url: `./basededados/grupos/audios/audio-bv-${from}.mp3`}, mimetype: `audio/mpeg`, ptt: true})
  }
  if(isByed5) {
    blackmd.sendMessage(from, {
      video: {
        url: welkom[4].fundobemvindo,
        caption: descsaiu(4),
        mentions: BLKMD.participants
      }
    })
  }
}

} catch (e) {
console.log(e)
}
}

if(events["messages.upsert"]) {
var upsert = events["messages.upsert"]
require("./index.js")(upsert, blackmd)
}

if(events["connection.update"]) {
const update = events["connection.update"]
const { connection, lastDisconnect, qr, isNewLogin, receivedPendingNotifications } = update  
if(qr) {
console.log(colors.green("Será necessário o uso de um segundo mmonitor, para ler o QR code gerado..."))
}

const shouldReconnect = new Boom(lastDisconnect?.error)?.output.statusCode

switch (connection) {
case 'close':
if(shouldReconnect) {
if(shouldReconnect == 428) {
console.log(colors.yellow("Conexão caiu, irei ligar novamente, se continuar com este erro, provavelmente sua internet está caindo constantemente.."));
} else if(shouldReconnect == 401) {
console.log(colors.red("O QRCODE DO BOT FOI DESCONECTADO, RE-LEIA O QRCODE DENOVO PARA CONECTAR"))
exec(`rm -rf ${qrcode}`);
} else if(shouldReconnect == 515) {
console.log(colors.gray("Restart Nescessario para estabilizar a conexão..."))
} else if(shouldReconnect == 440) {
return console.log(colors.gray("Está tendo um pequeno conflito, se isso aparecer mais de 4 vez, creio que há uma outra sessão aberta, ou o bot ligado em outro lugar, caso contrário ignore.."))
} else if(shouldReconnect == 503) {
console.log(colors.grey("Erro desconhecido, code: 503"));
} else if(shouldReconnect == 502) {
console.log(colors.grey("CONEXÃO TA QUERENDO CAIR, É A INTERNET..."))
} else if(shouldReconnect == 408) {
console.log(colors.gray("Conexão fraca..."))
} else {
console.log('Conexão Fechada _- POR: ', lastDisconnect?.error);
}
STBLK()
}
break;

case 'connecting':
console.log(colors.yellow('Estabilizando conexão da lady...'))
break;

case 'open':
console.log(banner3.string)   
console.log(banner2.string)  
console.log(colors.cyan(`			〘 Conectado com sucesso 〙`))
await blackmd.sendPresenceUpdate("available")
break;

default:
break;
}
}

if(events["creds.update"]) {
await saveCreds();
}

require("./index.js")(blackmd, qrcode)

})
}
STBLK().catch(async(e) => {
console.log(colors.red("ERROR EM START.JS: "+e))
})
