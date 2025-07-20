const fs = require("fs")

//==================ALUGUEL================\\

const { groupspath, grupos, saveGroupsRent, addGroupInRent, rmGroupInRent, aluguel, saveRent, sendTimeDay, sendTimeHours, sendLetterTime, isGroupInRent, addRent, tirarRent, delRent, rentContSystem, addCourtesy, isCourtesyGroup, getGroupRent, valoresDeAluguel, getValuesRent, getSaveGroup, isSaveGroup } = require("./aluguel/aluguel.js")

//================ALL-VIP===================\\

const { vip, saveVip, addVip, rmVip, delVip, getUsuVip, isOnlyVip, isAdvencedVip, isInfinityVip, vipTime, vipgp, saveGroupVip, addGroupVip, delGroupVip, getGroupVip, isOnlyGroupVip, isAdvencedGroupVip, isInfinityGroupVip, vipGroupTime } = require("../../basededados/all-vip/vip-config.js")

//================LEVEL-FUNC===================\\

const { addUsuCardXP } = require(`../../basededados/leveling/level.js`)

//=========================================\\

const { sendHours, saveJSON, isJsonIncludes, alerandom, randomLetra, getname, obrigadoEXT, sleep, colors } = require("../../config.js")

const coinspath = `./basedefuncionamento/saldo virtual/moedas.json`

if(!fs.existsSync(coinspath)) {saveJSON([], coinspath)}

const moedas = JSON.parse(fs.readFileSync(coinspath))

function saveCoins() {saveJSON(moedas, coinspath)}

function courtesyGroup() {
  if(grupos.length > 0) {
    gp = grupos[0]
    if(Number(sendHours("MM")) !== Number(gp.save)) {
      gp.save = sendHours("MM")
      saveGroupsRent()
      gp.gps = []
      saveGroupsRent()
      if(moedas.length > 0) {
        for(i of moedas) {
          i.cortesia += 1
          saveCoins()
        }
      }
    }
  }
}

courtesyGroup()

function registrarUsuInVirtualBalance(usu) {
  if(!isJsonIncludes(moedas, usu)) {
    idusu = Number(sendHours('HHmmss')) + Number(sendHours('DDMMYY'))
    idusu *= Number(usu.slice(4, 10))
    moedas.push({id: usu, saldo: 0, UID: idusu, rg: sendHours('DD-MM-YYYY'), cortesia: 1, mm: sendHours('MM'), keys: []})
    saveCoins()
  }
}

const getSepCoins = (usu) => {
  AB = moedas.map(i => i.id).indexOf(usu)
  data = moedas[AB]
  sub = Number(data.saldo).toFixed(2)
  nmr = data.saldo >= 0 ? data.saldo < 10 ? `0` + String(sub) : sub : data.saldo > -10 ? `-0` + data.saldo + (data.saldo * 2) : sub
  return [getname(data.id), data.id, nmr, data.UID, data.rg, data.cortesia, data.mm]
}

const getCoinsUsu = (usu) => {
  AB = moedas.map(i => i.id).indexOf(usu)
  return moedas[AB]
}

function addCoinsInVirtualBalance(usu, value) {
  registrarUsuInVirtualBalance(usu)
  data = getCoinsUsu(usu)
  data.saldo += Number(value)
  saveCoins()
}

function rmCoinsInVirtualBalance(usu, value) {
  registrarUsuInVirtualBalance(usu)
  data = getCoinsUsu(usu)
  data.saldo -= Number(value)
  saveCoins()
}

const gerarkey = (a, id) => {
  nmr = isNaN(a) ? alerandom(9) + 1 :  Number(a)
  idks = randomLetra + String(a) + "-"
  idks += `${Number(id.split(`|`)[1].replace("-", "").slice(2, 8)) * Number(id.split(`|`)[0].slice(2, 8))}`
  idks += `${randomLetra + String(nmr * 2) + randomLetra}` + "-" + `${Number(sendHours('DDMMYY')) + Number(sendHours('HHmmss'))}` + randomLetra
  return idks
}

async function gerarTypeKey(usu, dados, restart = true) {
  registrarUsuInVirtualBalance(usu)
  type = dados.type
  keys = getCoinsUsu(usu).keys
  tempo = dados?.tempo || `1h`
  if(type == 1) {
    nmr = Number(tempo.slice(0, tempo.length - 1))
    letra = tempo.slice(tempo.length - 1, tempo.length).toLowerCase()
    if(letra == `d`) multiplicador = 24
    else multiplicador = 1
    nmr *= multiplicador
    idks = gerarkey(nmr, usu+`|`+dados?.grupo || usu)
    keys.push({key: idks, tipo: type, tempo: nmr, valor: dados?.valor || 0})
    saveCoins()
  }
  if(type == 2) {
    nmr = 24
    idks = gerarkey(nmr, usu+`|`+dados?.grupo || usu)
    keys.push({key: idks, tipo: type, tempo: nmr, valor: dados?.valor || 0})
    saveCoins()
  }
  if(type == 3 || type == 4) {
    nmr = tempo
    idks = gerarkey(nmr, usu+`|`+dados?.grupo || usu)
    keys.push({key: idks, tipo: type, tempo: nmr, valor: dados?.valor || 0, mod: dados?.mod})
    saveCoins()
  }
  if(type == 5) {
    velocidade = dados.velocidade
    dias = dados.tempo
    nmr = Number(dias.slice(0, dias.length - 1))
    letra = dias.slice(dias.length - 1, dias.length).toLowerCase()
    if(letra == `d`) multiplicador = 24
    else multiplicador = 1
    nmr *= multiplicador
    idks = gerarkey(nmr, usu+`|`+dados?.grupo || usu)
    keys.push({key: idks, tipo: type, tempo: nmr, velocidade: Number(velocidade.slice(0, velocidade.length - 1)), valor: dados?.valor || 0})
    saveCoins()
  }
  if(restart) {
    console.log(colors.red(`Restart necessário para save de arquivos`))
    await sleep(3000)
    process.exit()
  }
}

async function rmTypeKey(txt) {
  caixa = []
  if(moedas.length > 0) {
    for(a of moedas) {
      nmr = -1
      for(b of a.keys) {
        nmr += 1
        if(txt == b.key) caixa.push({id: a.id, mapa: nmr})
      }
    }
  }
  if(caixa.length > 0) {
    AB = moedas.map(i => i.id).indexOf(caixa[0].id)
    moedas[AB].keys.splice(caixa[0].mapa, 1)
    saveCoins()
    console.log(colors.red(`Restart necessário para save de arquivos`))
    await sleep(3000)
    process.exit()
  }
}

const getallkeys = () => {
  caixa = []
  if(moedas.length > 0) {
    for(a of moedas) {
      if(a.keys.length > 0) {
        for(b of a.keys) {
          b.cliente = a.id
          caixa.push(b)
        }
      }
    }
  }
  return caixa
}

const allKeysRentSystem = getallkeys()

const existKeyRentSystem = (txt) => {
  nmr = 0
  if(allKeysRentSystem.length > 0) {
    for(a of allKeysRentSystem) {
      if(txt == a.key) nmr += 1
    }
  }
  return nmr > 0 ? true : false
}

const getClientKey = (txt) => {
  caixa = []
  if(allKeysRentSystem.length > 0) {
    for(a of allKeysRentSystem) {
      if(txt == a.key) caixa.push(a)
    }
  }
  return caixa[0]
}

async function validarKey(from, sender, prefix, blackmd, mention, isGroup, chave) {
  reply = mention
  if(allKeysRentSystem.length > 0) {
    caixa = []
    for(a of allKeysRentSystem) {
      if(chave == a.key) caixa.push(a)
    }
    if(caixa.length > 0) {
      dados = caixa[0]
      type = dados.tipo
      cliente = dados.cliente
      isInfinity = dados.tempo > 0 ? false : true
      groupName = isGroup ? (await blackmd.groupMetadata(from)).subject : ``
      deubom = 0
      if(type == 1 && isGroup) {
        if(!isInfinity) {
          addRent(reply, ``, blackmd, from, (isGroupInRent(from) ? `` : cliente.split("@")[0] + `/`) + String(dados.tempo) + `h`)
          await sleep(1000)
          blackmd.sendMessage(obrigadoEXT.idprivategp, {text: `[❕] código de aluguel validado no grupo ${groupName} registrado no nome de @${cliente.split('@')[0]} ✅`, mentions: [cliente]})
        } else {
          addGroupInRent(from, true)
          reply(`Grupo salvo na pasta com sucesso 📂`)
        }
        deubom += 1
      }
      if(type == 2 && isGroup) {
        if(!isCourtesyGroup(from)) {
          addCourtesy(reply, from)
          await sleep(1000)
          blackmd.sendMessage(obrigadoEXT.idprivategp, {text: `[❕] código *CARD CORTESIA* validado no grupo ${groupName} registrado no nome de @${cliente.split('@')[0]} ✅`, mentions: [cliente]})
          deubom += 1
        } else reply("Já foi validada neste mês uma cortesia neste grupo 🤨")
      }
      if(type == 3) {
        if(!isInfinityVip(sender)) {
          resp = isInfinity ? `Usuário @${sender.split("@")[0]} acaba de receber o benefício do VIP infinito 👑` : isOnlyVip(sender) ? `Foram adc +${dados.tempo}d ao VIP deste usuário @${sender.split("@")[0]} ⚜` : `Usuário @${sender.split("@")[0]} foi adc a lista VIP com sucesso 🔰`
          addVip(sender, dados.tempo, dados?.mod)
          mention(resp)
          await sleep(1000)
          blackmd.sendMessage(obrigadoEXT.idprivategp, {text: `[❕] código VIP validado ${isGroup ? "no grupo "+groupName : "no privado"} registrado no nome de @${sender.split('@')[0]} ✅`, mentions: [sender]})
          deubom += 1
        } else reply(`Impossível adicionar VIP a este usuário, pois o mesmo possui o _"INFINITY VIP"_`)
      }
      if(type == 4) {
        if(!isInfinityGroupVip(from)) {
          resp = isInfinity ? `Grupo @${groupName} acaba de receber o benefício do VIP infinito 👑` : isOnlyGroupVip(from) ? `Foram adc +${dados.tempo}d ao VIP deste grupo ⚜` : `Grupo ${groupName} foi adc a lista VIP com sucesso 🔰`
          addGroupVip(from, dados.tempo, dados?.mod)
          mention(resp)
          await sleep(1000)
          blackmd.sendMessage(obrigadoEXT.idprivategp, {text: `[❕] código GROUP VIP validado no grupo ${groupName} registrado no nome de @${sender.split('@')[0]} ✅`, mentions: [sender]})
          deubom += 1
        } else reply(`Impossível adicionar VIP a este grupo, pois o mesmo possui o _"INFINITY GROUP VIP"_`)
      }
      if(type == 5) {
        addUsuCardXP(mention, prefix, sender, String(dados.velocidade) + `x`, String(dados.tempo) + `h`)
        await sleep(1000)
        blackmd.sendMessage(obrigadoEXT.idprivategp, {text: `[❕] código CARD XP validado no grupo ${groupName} registrado no nome de @${sender.split('@')[0]} ✅`, mentions: [sender]})
        deubom += 1
      }
      if(deubom > 0) rmTypeKey(dados.key)
    }
  }
}

module.exports = {
//MOEDAS
moedas, saveCoins, registrarUsuInVirtualBalance, addCoinsInVirtualBalance, rmCoinsInVirtualBalance, getSepCoins, getCoinsUsu, gerarkey, gerarTypeKey, validarKey, allKeysRentSystem, rmTypeKey,
//ALUGUEL
groupspath, grupos, saveGroupsRent, courtesyGroup, addGroupInRent, rmGroupInRent, aluguel, saveRent, sendTimeDay, sendTimeHours, sendLetterTime, isGroupInRent, getGroupRent, addRent, tirarRent, delRent, rentContSystem, addCourtesy, isCourtesyGroup, valoresDeAluguel, getValuesRent, existKeyRentSystem, getClientKey, getSaveGroup, isSaveGroup
}