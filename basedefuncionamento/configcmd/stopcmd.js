const fs = require("fs");

const rmLetras = (txt) => {
return txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}

function saveJSON(inter, caminho){
fs.writeFileSync(caminho, JSON.stringify(inter, null, 2))}

stopcmdpath = `./basedefuncionamento/configcmd/stopcmd.json`

if(!fs.existsSync(stopcmdpath)) {saveJSON([], stopcmdpath)}

const stopcmd = JSON.parse(fs.readFileSync(stopcmdpath))

function saveSC() {saveJSON(stopcmd, stopcmdpath)}

const isBlockGlobalCmd = (base) => {
  txt = rmLetras(base)
  nmr = 0
  for(i of stopcmd) {
    if(txt == i) nmr += 1
  }
  if(nmr > 0) return true
  return false
}

function addStopCmd(cmd) {
  stopcmd.push(cmd)
  saveSC();
}

function rmStopCmd(cmd) {
  nmr = -1
  caixa = []
  for(i of stopcmd) {
    nmr += 1
    if(cmd == i) caixa.push(nmr)
  }
  if(caixa.length > 0) {
    stopcmd.splice(caixa[0], 1)
    saveSC();
  }
}

module.exports = { stopcmd, saveSC, isBlockGlobalCmd, addStopCmd, rmStopCmd }