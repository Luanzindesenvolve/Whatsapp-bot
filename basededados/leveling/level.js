const fs = require("fs");
const { saveJSON, isJsonIncludes, allvaluerent, sendHours } = require("../../config");
const { text } = require("cheerio");

//=============LEVEL===========\\

levelpath = `./basededados/leveling/leveling.json`

function saveLeVeLdb(base) {fs.writeFileSync(levelpath, JSON.stringify(base, null, 2))}

if(!fs.existsSync(levelpath)) {saveLeVeLdb([])}

const level = JSON.parse(fs.readFileSync(levelpath));

const isYouInLevel = (usu) => {
  AB = level.map(i => i.id).indexOf(usu)
  resp = AB < 0 ? false : true
  return resp
}

function addlevel(usu, quant) {
  nmr = Number(quant)
  AB = level.map(i => i.id).indexOf(usu)
  level[AB].level += nmr
  saveLeVeLdb(level)
}

function rmlevel(usu, quant) {
  nmr = Number(quant)
  AB = level.map(i => i.id).indexOf(usu)
  level[AB].level -= nmr
  saveLeVeLdb(level)
}

function addXP(usu, quant) {
  nmr = Number(quant)
  AB = level.map(i => i.id).indexOf(usu)
  level[AB].contador += nmr
  saveLeVeLdb(level)
}

function rmXP(usu, quant) {
  nmr = Number(quant)
  AB = level.map(i => i.id).indexOf(usu)
  level[AB].contador -= nmr
  saveLeVeLdb(level)
}

function blockLevelUser(usu) {
  AB = level.map(i => i.id).indexOf(usu)
  level[AB].block = true
  saveLeVeLdb(level)
}

function unBlockLevelUser(usu) {
  AB = level.map(i => i.id).indexOf(usu)
  level[AB].block = false
  saveLeVeLdb(level)
}

function isBlockGetLevelUser(usu) {
  AB = level.map(i => i.id).indexOf(usu)
  return level[AB].block
}

const levelDBuser = (usu) => {
  AB = level.map(i => i.id).indexOf(usu)
  return level[AB]
}

dbpt = [
    {pat: "Bronze I 🥉", xp: "0", nmr: 0},
    {pat: "Bronze II 🥉", xp: "100", nmr: 100},
    {pat: "Bronze III 🥉", xp: "200", nmr: 200},
    {pat: "Prata I 🥈", xp: "300", nmr: 300},
    {pat: "Prata II 🥈", xp: "400", nmr: 400},
    {pat: "Prata III 🥈", xp: "500", nmr: 500},
    {pat: "Ouro I 🥇", xp: "600", nmr: 600},
    {pat: "Ouro II 🥇", xp: "700", nmr: 700},
    {pat: "Ouro III 🥇", xp: "800", nmr: 800},
    {pat: "Ouro IV 🥇", xp: "900", nmr: 900},
    {pat: "Platina I 🌀", xp: "1.200", nmr: 1200},
    {pat: "Platina II 🌀", xp: "1.500", nmr: 1500},
    {pat: "Platina III 🌀", xp: "1.800", nmr: 1800},
    {pat: "Platina IV 🌀", xp: "2.100", nmr: 2100},
    {pat: "Diamante I 💎", xp: "2.700", nmr: 2700},
    {pat: "Diamante II 💎", xp: "3.300", nmr: 3300},
    {pat: "Diamante III 💎", xp: "3.900", nmr: 3900},
    {pat: "Diamante IV 💎", xp: "4.500", nmr: 4500},
    {pat: "Paladino I 🔮", xp: "5.000", nmr: 5000},
    {pat: "Paladino II 🔮", zp: "5.500", nmr: 5500},
    {pat: "Paladino III 🔮", xp: "6.500", nmr: 6500},
    {pat: "Paladino IV 🔮", xp: "7.500", nmr: 7500},
    {pat: "Mestre I ❤️‍🔥", xp: "9.000", nmr: 9000},
    {pat: "Mestre II ❤️‍🔥", xp: "10.500", nmr: 10500},
    {pat: "Mestre III ❤️‍🔥", xp: "12.000", nmr: 12000},
    {pat: "Mestre IV ❤️‍🔥", xp: "13.500", nmr: 13500},
    {pat: "Mestre V ❤️‍🔥", xp: "15.000", nmr: 15000},
    {pat: "Desafiante I 👑", xp: "20.000", nmr: 20000},
    {pat: "Desafiante II 👑", xp: "25.000", nmr: 25000},
    {pat: "Desafiante III 👑", xp: "30.000", nmr: 30000},
    {pat: "Desafiante IV 👑", xp: "35.000", nmr: 35000},
    {pat: "Desafiante V 👑", xp: "40.000", nmr: 40000},
    {pat: "Usuário Superior I 🎓", xp: "50.000", nmr: 50000},
    {pat: "Usuário Superior II 🎓", xp: "60.000", nmr: 60000},
    {pat: "Mestre Supremo I 🪄", xp: "70.000", nmr: 70000},
    {pat: "Mestre Supremo II 🪄", xp: "80.000", nmr: 80000},
    {pat: "Mestre Supremo III 🪄", xp: "90.000", nmr: 90000},
    {pat: "Conquistador I ⚒️", xp: "100.000", nmr: 100000},
    {pat: "Conquistador II ⚒️", xp: "150.000", nmr: 150000},
    {pat: "Conquistador III ⚒️", xp: "200.000", nmr: 200000},
    {pat: "Desbravador I 🛰️", xp: "300.000", nmr: 300000},
    {pat: "Desbravador II 🛰️", xp: "400.000", nmr: 400000},
    {pat: "Desbravador III 🛰️", xp: "500.000", nmr: 500000},
    {pat: "Grande Mestre I 🪩", xp: "1.000.000", nmr: 1000000},
    {pat: "Grande Mestre II 🪩", xp: "1.500.000", nmr: 1500000},
    {pat: "Grande Mestre III 🪩", xp: "2.000.000", nmr: 2000000},
    {pat: "Supremacy X ⚜️", xp: "5.000.000", nmr: 5000000}
]

const patente = (exp) => {
  caixa = []
  for(i of dbpt) {
    if(Number(exp) >= i.nmr) caixa.push(i.pat)
  }
  return caixa[caixa.length - 1]
}

//===========CARD-XP===========\\

cardpath = `./basededados/leveling/cardxp.json`

if(!fs.existsSync(cardpath)) {saveJSON([], cardpath)}

const cardxp = JSON.parse(fs.readFileSync(cardpath))

function saveCardXP() {saveJSON(cardxp, cardpath)}

function addCardExperience(usu) {
  if(!isJsonIncludes(cardxp, usu)) {
    cardxp.push({id: usu, mapa: 0, active: false, save: "00", tempo: 0, cards: []})
    saveCardXP()
  }
}

function addUsuCardXP(mention, prefix, usu, v, d) {
  addCardExperience(usu)
  nmr = Number(d.slice(0, d.length - 1))
  letra = d.slice(d.length - 1, d.length).toLowerCase()
  multiplicador = Number(v.slice(0, v.length - 1))
  if(letra == `d`) vzs = 24
  else vzs = 1
  nmr *= vzs
  AB = cardxp.map(i => i.id).indexOf(usu)
  cardxp[AB].cards.push({multi: multiplicador, horas: nmr})
  saveCardXP()
  mention(`🔖 *_Card XP ${multiplicador}x ativo por ${nmr == 24 ? "24h" : String(Number(nmr / 24).toFixed(0)) +"d"} validado ao usuario @${usu.split("@")[0]} com sucesso... Use ${prefix}setcard para ativar 🪽_*`)
}

const getCardXPusu = (usu) => {
  AB = cardxp.map(i => i.id).indexOf(usu)
  return cardxp[AB]
}

const valoresXP = allvaluerent.cardxp

function cardTime(blackmd, tempo) {
  if(cardxp.length > 0) {
    for(a of cardxp) {
      if(a.active) {
        if(Number(a.save) !== Number(sendHours("HH"))) {
          a.save = sendHours("HH")
          saveCardXP()
          if(a.tempo > 1) {
            a.tempo -= 1
            saveCardXP()
          } else {
            a.active = false
            saveCardXP()
            a.cards.splice(a.mapa, 1)
            saveCardXP()
            blackmd.sendMessage(a.id, {text: `${tempo} @${a.id.split("@")[0]}, estou apenas passando para avisar que seu CARD XP expirou... Caso queira um novo, ative algum de sua lista ou compre um na loja 😊`, mentions: [a.id]})
          }
        }
      }
    }
  }
}

module.exports = { isYouInLevel, dbpt, patente, saveLeVeLdb, level, addlevel, rmlevel, addXP, rmXP, blockLevelUser, unBlockLevelUser, isBlockGetLevelUser, levelDBuser, cardxp, addCardExperience, addUsuCardXP, valoresXP, getCardXPusu, saveCardXP, cardTime }
