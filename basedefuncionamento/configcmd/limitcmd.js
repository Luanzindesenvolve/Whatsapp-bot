const fs = require("fs");
const moment = require('moment-timezone');

const rmLetras = (txt) => {
return txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}

const isJsonIncludes = (json, value) => {
if(JSON.stringify(json).includes(value)) return true
return false}

const sendHours = (formato) => {
return moment.tz('America/Sao_Paulo').format(formato)}

function saveJSON(inter, caminho){
fs.writeFileSync(caminho, JSON.stringify(inter, null, 2))}

limitcmdpath = "./basedefuncionamento/configcmd/limitcmd.json"

if(!fs.existsSync(limitcmdpath)) {saveJSON([], limitcmdpath)}

const limitcmd = JSON.parse(fs.readFileSync(limitcmdpath))

function saveLimitCmd() {saveJSON(limitcmd, limitcmdpath)}

function rgGroupLC(grupo) {
  if(!isJsonIncludes(limitcmd, grupo)) {
    limitcmd.push({groupId: grupo, data: sendHours("DD"), cmd: []})
    saveLimitCmd();
  }
}

const isLimitCmd = (grupo, comando) => {
  AB = limitcmd.map(i => i.groupId).indexOf(grupo)
  nmr = 0
  caixa = []
  total = -1
  for(i of limitcmd[AB].cmd) {
    total += 1
    if(rmLetras(comando) === i.nome) {
      nmr += 1
      caixa.push(total)
    }
  }
  return {boolean: nmr > 0 ? true : false, find: caixa.length > 0 ? caixa[0] : -1}
}

function addLimitCmd(grupo, comando, nmr) {
  AB = limitcmd.map(i => i.groupId).indexOf(grupo)
  data = isLimitCmd(grupo, comando)
  if(data.boolean) {
    limitcmd[AB].cmd[data.find].max += Number(nmr)
    saveLimitCmd();
  } else {
    limitcmd[AB].cmd.push({nome: comando, max: Number(nmr), usado: 0})
    saveLimitCmd();
  }
}

function addCmdUsageLC(grupo, comando, nmr = 1) {
  AB = limitcmd.map(i => i.groupId).indexOf(grupo)
  data = isLimitCmd(grupo, comando)
  if(data.boolean) {
    limitcmd[AB].cmd[data.find].usado += Number(nmr)
    saveLimitCmd();
  }
}

const isMaxUsageLC = (grupo, comando) => {
  AB = limitcmd.map(i => i.groupId).indexOf(grupo)
  data = limitcmd[AB].cmd[isLimitCmd(grupo, comando).find]
  return data.usado >= data.max ? true : false
}

function addLimitAllCmd(grupo, nmr) {
  findindex = fs.readFileSync("index.js").toString();
  mapearcases = findindex.match(/case\s+'(.+?)'/g);
  AB = limitcmd.map(i => i.groupId).indexOf(grupo)
  for(i of mapearcases) {
    corte = i.split(`'`)[1]
    addLimitCmd(grupo, corte, Number(nmr))
  }
}

function rmLimitCmd(grupo, comando) {
  AB = limitcmd.map(i => i.groupId).indexOf(grupo)
  data = isLimitCmd(grupo, comando)
  if(data.boolean) {
    limitcmd[AB].cmd.splice(data.find, 1)
    saveLimitCmd();
  }
}

function rmLimitAllCmd(grupo) {
  AB = limitcmd.map(i => i.groupId).indexOf(grupo)
  limitcmd[AB].cmd = []
  saveLimitCmd();
}

const getLimitCmd = (grupo) => {
  AB = limitcmd.map(i => i.groupId).indexOf(grupo)
  return limitcmd[AB].cmd
}

function nextDayLC() {
  if(limitcmd.length > 0) {
    for(i of limitcmd) {
      if(Number(i.data) !== Number(sendHours(`DD`))) {
        i.data = sendHours(`DD`)
        if(i.cmd.length > 0) {
          for(o of i.cmd) {
            o.usado = 0
            saveLimitCmd();
          }
        }
        saveLimitCmd();
      }
    }
  }
}

module.exports = { limitcmd, saveLimitCmd, rgGroupLC, isLimitCmd, addLimitCmd, addCmdUsageLC, isMaxUsageLC, addLimitAllCmd, rmLimitCmd, rmLimitAllCmd, getLimitCmd, nextDayLC }