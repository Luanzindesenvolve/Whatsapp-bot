const fs = require("fs")

function saveJSON(inter, caminho){
fs.writeFileSync(caminho, JSON.stringify(inter, null, 2))}

const isJsonIncludes = (json, value) => {
if(JSON.stringify(json).includes(value)) return true
return false}

//===============ANTI-LINK-GP===============\\

antilinkgppath = `./basededados/shieldantilink/shieldantilinkgp.json`

if(!fs.existsSync(antilinkgppath)) {saveJSON([], antilinkgppath)}

const shieldantilinkgp = JSON.parse(fs.readFileSync(antilinkgppath))

function saveSALGP() {saveJSON(shieldantilinkgp, antilinkgppath)}

function notGroupRegisteredSALGP(grupo) {
  if(!isJsonIncludes(shieldantilinkgp, grupo)) {
    shieldantilinkgp.push({groupId: grupo, usus: []})
    saveSALGP()
  }
}

function addShieldGP(grupo, usu, mxm) {
  AB = shieldantilinkgp.map(i => i.groupId).indexOf(grupo)
  if(!isJsonIncludes(shieldantilinkgp[AB].usus, usu)) {
    shieldantilinkgp[AB].usus.push({id: usu,
    quant: Number(mxm) > 0 ? Number(mxm) : 0,
    infinito: Number(mxm) > 0 ? false : true})
    saveSALGP();
  } else {
    if(Number(mxm) >= 0) {
      AC = shieldantilinkgp[AB].usus.map(i => i.id).indexOf(sender)
      pessoa = shieldantilinkgp[AB].usus[AC]
      pessoa.quant += Number(mxm)
      saveSALGP();
    }
  }
}

function rmShieldGP(grupo, usu) {
  AB = shieldantilinkgp.map(i => i.groupId).indexOf(grupo)
  AC = shieldantilinkgp[AB].usus.map(i => i.id).indexOf(usu)
  shieldantilinkgp[AB].usus.splice(AC, 1)
  saveSALGP();
}

const isShieldGPuser = (grupo, usu) => {
  AB = shieldantilinkgp.map(i => i.groupId).indexOf(grupo)
  if(isJsonIncludes(shieldantilinkgp[AB].usus, usu)) return true
  return false
}

const getShieldGPuser = (grupo, usu) => {
  AB = shieldantilinkgp.map(i => i.groupId).indexOf(grupo)
  AC = shieldantilinkgp[AB].usus.map(i => i.id).indexOf(usu)
  return shieldantilinkgp[AB].usus[AC]
}

//===============ANTI-LINK-HARD===============\\

antilinkhardpath = `./basededados/shieldantilink/shieldantilinkhard.json`

if(!fs.existsSync(antilinkhardpath)) {saveJSON([], antilinkhardpath)}

const shieldantilinkhard = JSON.parse(fs.readFileSync(antilinkhardpath))

function saveSALHARD() {saveJSON(shieldantilinkhard, antilinkhardpath)}

function notGroupRegisteredSALHARD(grupo) {
  if(!isJsonIncludes(shieldantilinkhard, grupo)) {
    shieldantilinkhard.push({groupId: grupo, usus: []})
    saveSALHARD()
  }
}

function addShieldHARD(grupo, usu, mxm) {
  AB = shieldantilinkhard.map(i => i.groupId).indexOf(grupo)
  if(!isJsonIncludes(shieldantilinkhard[AB].usus, usu)) {
    shieldantilinkhard[AB].usus.push({id: usu,
    quant: Number(mxm) > 0 ? Number(mxm) : 0,
    infinito: Number(mxm) > 0 ? false : true})
    saveSALHARD();
  } else {
    if(Number(mxm) >= 0) {
      AC = shieldantilinkhard[AB].usus.map(i => i.id).indexOf(sender)
      pessoa = shieldantilinkhard[AB].usus[AC]
      pessoa.quant += Number(mxm)
      saveSALHARD();
    }
  }
}

function rmShieldHARD(grupo, usu) {
  AB = shieldantilinkhard.map(i => i.groupId).indexOf(grupo)
  AC = shieldantilinkhard[AB].usus.map(i => i.id).indexOf(usu)
  shieldantilinkhard[AB].usus.splice(AC, 1)
  saveSALHARD();
}

const isShieldHARDuser = (grupo, usu) => {
  AB = shieldantilinkhard.map(i => i.groupId).indexOf(grupo)
  if(isJsonIncludes(shieldantilinkhard[AB].usus, usu)) return true
  return false
}

const getShieldHARDuser = (grupo, usu) => {
  AB = shieldantilinkhard.map(i => i.groupId).indexOf(grupo)
  AC = shieldantilinkhard[AB].usus.map(i => i.id).indexOf(usu)
  return shieldantilinkhard[AB].usus[AC]
}

module.exports = { shieldantilinkgp, notGroupRegisteredSALGP, addShieldGP, rmShieldGP, saveSALGP, isShieldGPuser, getShieldGPuser, shieldantilinkhard, notGroupRegisteredSALHARD, addShieldHARD, rmShieldHARD, saveSALHARD, isShieldHARDuser, getShieldHARDuser }