const fs = require("fs")

const { isJsonIncludes, saveJSON, sendHours, contarMin, converterMin } = require(`../../config.js`)

const adsSytemPath = `./basedefuncionamento/mensagensprogramadas/ads.json`

if(!fs.existsSync(adsSytemPath)) {fs.writeFileSync(adsSytemPath, JSON.stringify([]))}

const ads = JSON.parse(fs.readFileSync(adsSytemPath))

function saveADS() {saveJSON(ads, adsSytemPath)}

function addGroupInAds(from) {
  if(!isJsonIncludes(ads, from)) {
    ads.push({groupId: from, acctive: true, horarios: []})
    saveADS()
  }
}

const getGroupAds = (from) => {
  AB = ads.map(i => i.groupId).indexOf(from)
  return ads[AB]
}

const existAdminAds = (from, sender) => {
  data = getGroupAds(from)
  caixa = []
  for(c of data.horarios) {
    if(c.adm.length > 0) caixa.push(c.adm[0])
  }
  return isJsonIncludes(caixa, sender) ? true : false
}

const getAdminAds = (from, sender) => {
  data = getGroupAds(from)
  caixa = []
  for(c of data.horarios) {
    if(c.adm.length > 0 && isJsonIncludes(c.adm, sender)) caixa.push(c)
  }
  return caixa[0]
}

function rmAdminAds(from, sender) {
  if(isJsonIncludes(getGroupAds(from).horarios, sender)) {
    data = getAdminAds(from, sender)
    AB = data.adm.indexOf(sender)
    if(AB >= 0) {
      data.adm.splice(AB, 1)
      saveADS()
    }
  }
}

function addAdminAds(from, sender, txt, image = []) {
  rmAdminAds(from, sender)
  setTimeout(() => {
    data = getGroupAds(from)
    data.horarios.push({id: sendHours("DDMMYYHHmmss"), start: false, mentions: false, text: txt, adm: [sender], tempo: {horario: "", type: "", valor: "", dias: "", save: ""}, imagem: image})
    saveADS()
  }, 300);
}

function addAds(from, sender, tempo) {
  data = getAdminAds(from, sender)
  letra = tempo.toLowerCase().slice(tempo.length - 1, tempo.length)
  numeral = Number(tempo.toLowerCase().slice(0, tempo.length - 1))
  if(letra == `h`) numeral *= 60
  horaatual = sendHours("HH:") + String(Number(sendHours("mm")) - (Number(sendHours("mm")) % 5))
  soma = contarMin(horaatual) + numeral
  if(soma >= 1440) {
    dias = (soma - (soma % 1440)) / 1440
    sobra = soma % 1440
  } else {
    dias = 0
    sobra = soma
  }
  data.tempo.horario = converterMin(sobra)
  data.tempo.type = letra
  data.tempo.valor = numeral / (letra == `h` ? 60 : 1)
  data.tempo.dias = dias
  data.tempo.save = sendHours("DD")
  data.start = true
  saveADS()
  setTimeout(() => {rmAdminAds(from, sender)}, 300)
}

const isIDads = (from, id) => {
  data = getGroupAds(from)
  AB = data.horarios.map(i => i.id).indexOf(id)
  return AB >= 0 ? true : false
}

function rmAds(from, id) {
  data = getGroupAds(from)
  AB = data.horarios.map(i => i.id).indexOf(id)
  data.horarios.splice(AB, 1)
  saveADS()
}

async function adsFunc(blackmd) {
  if(ads.length > 0) {
    for(a of ads) {
      if(a.horarios.length > 0) {
        for(b of a.horarios) {
          if(b.tempo.dias <= 0) {
            minutos = b.tempo.valor
            if(b.tempo.type == `h`) minutos *= 60
            if(contarMin(sendHours("HH:mm")) >= contarMin(b.tempo.horario)) {
              if(a.acctive && b.start) {
                //menc = b.mentions ? (await blackmd.groupMetadata(a.groupId)).participants.map(m => (m.id)) : []
                menc = []
                if(b.imagem.length > 0) {
                  blackmd.sendMessage(a.groupId, {image: {url: b.imagem[0]}, caption: b.text, contextInfo: {mentionedJid: menc, forwardingScore: 999, isForwarded: true}})
                } else blackmd.sendMessage(a.groupId, {text: b.text, contextInfo: {mentionedJid: menc, forwardingScore: 999, isForwarded: true}})
              }
              horaatual = sendHours("HH:") + String(Number(sendHours("mm")) - (Number(sendHours("mm")) % 5))
              soma = contarMin(horaatual) + minutos
              if(soma >= 1440) {
                b.tempo.dias += (soma - (soma % 1440)) / 1440
                saveADS()
                b.tempo.horario = converterMin(soma % 1440)
                saveADS()
              } else {
                b.tempo.horario = converterMin(soma)
                saveADS()
              }
            }
          } else {
            if(Number(sendHours("DD")) !== Number(b.tempo.save)) {
              b.tempo.dias -= 1
              saveADS()
              b.tempo.save = sendHours("DD")
              saveADS()
            }
          }
        }
      }
    }
  }
}

setday = `🔎 𝗦𝗘𝗧 𝗔𝗗𝗦 𝗔𝗤𝗨𝗜 🔍`

const adsStartList = (text, id) => {
  return [
    {title: setday, body: `Intervalo de 5 minutos`, command: text+`|5m|${id}`},
    {title: setday, body: `Intervalo de 10 minutos`, command: text+`|10m|${id}`},
    {title: setday, body: `Intervalo de 30 minutos`, command: text+`|30m|${id}`},
    {title: setday, body: `Intervalo de 1 hora`, command: text+`|1h|${id}`},
    {title: setday, body: `Intervalo de 1 hora e 30 minutos`, command: text+`|${60 + 30}m|${id}`},
    {title: setday, body: `Intervalo de 2 horas`, command: text+`|2h|${id}`},
    {title: setday, body: `Intervalo de 2 hora e 30 minutos`, command: text+`|${60 * 2}m|${id}`},
    {title: setday, body: `Intervalo de 3 horas`, command: text+`|3h|${id}`},
    {title: setday, body: `Intervalo de 4 horas`, command: text+`|4h|${id}`},
    {title: setday, body: `Intervalo de 5 horas`, command: text+`|5h|${id}`},
    {title: setday, body: `Intervalo de 10 horas`, command: text+`|10h|${id}`},
    {title: setday, body: `Intervalo de 12 horas`, command: text+`|3h|${id}`},
    {title: setday, body: `Intervalo de 1 dia`, command: text+`|24h|${id}`}
  ]
}

module.exports = { ads, saveADS, addGroupInAds, getGroupAds, addAds, isIDads, rmAds, adsFunc, adsStartList, existAdminAds, getAdminAds, rmAdminAds, addAdminAds }