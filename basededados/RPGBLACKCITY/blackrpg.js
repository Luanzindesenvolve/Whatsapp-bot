const fs = require("fs")
const moment = require('moment-timezone');

const pushnames = JSON.parse(fs.readFileSync("./basededados/pushnames.json"))

const alerandom = (nmr) => {
return Math.floor(Math.random()*nmr)}

const sendHours = (formato) => {
return moment.tz('America/Sao_Paulo').format(formato)}

const rmLetras = (txt) => {
return txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}

const getname = (nmr) => {
buscar = nmr.includes(`@s.whatsapp.net`) ? nmr : nmr.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
matheuzinho = JSON.stringify(pushnames).includes(buscar) ? pushnames[pushnames.map(i => i.id).indexOf(buscar)].nick : "usuário"
return matheuzinho}

const isJsonIncludes = (json, value) => {
if(JSON.stringify(json).includes(value)) return true
return false}

function saveJSON(inter, caminho){
    fs.writeFileSync(caminho, JSON.stringify(inter, null, 2))}

    pathRPG = {
        cidades: "./basededados/RPGBLACKCITY/cidadesRPG.json"
    }

    bancos = [
        {nome: `Inter`, emoji: `📙`},
        {nome: `NuBank`, emoji: `💜`},
        {nome: `PagBank`, emoji: `🔰`},
        {nome: `Bradesco`, emoji: `📍`},
        {nome: `Caixa`, emoji: `💠`},
        {nome: `Next`, emoji: `🍀`},
        {nome: `Santander`, emoji: `♨`},
        {nome: `Banco do Brasil`, emoji: `🔅`}
    ]
//=================cidades===============\\

if(!fs.existsSync(pathRPG.cidades)) {
    saveJSON([], pathRPG.cidades)
}

const cidadesRPG = JSON.parse(fs.readFileSync(pathRPG.cidades))

function saveCityBlackRPG() {
    saveJSON(cidadesRPG, pathRPG.cidades)}

    function createCityBlackRPG(dono_bc, cdd_bc) {
        bank = bancos[alerandom(bancos.length)]
        cidadesRPG.push({nome: cdd_bc, nome2: rmLetras(cdd_bc), prefeito: dono_bc, level: 3, xp: 3000, moradores: [{id: dono_bc, nome: getname(dono_bc), banco: bank.nome+` `+bank.emoji, registro: {data: sendHours("DD/MM/YYYY"), hora: sendHours("HH:mm")}, saldo: 100000, casa: true, lv_casa: 3, veiculo: [{tipo: "Carro", velocidade: 2}], trabalho: []}]})
        saveCityBlackRPG();
    }

    const existCity = (nome) => {
        nmr = 0
        for(i of cidadesRPG) {
          if(rmLetras(nome) == i.nome2) nmr += 1
        }
        if(nmr <= 0) return false
        return true
    }

    const limitCity = (txt) => {
        AB = cidadesRPG.map(i => i.nome2).indexOf(rmLetras(txt))
        if(cidadesRPG[AB].moradores.length >= (cidadesRPG[AB].level * 30)) return true
        return false
    }

    const findCity = (usu) => {
        caixa = []
        for(i of cidadesRPG) {
            if(isJsonIncludes(i.moradores, usu)) caixa.push(i.nome)
        }
        return caixa.length > 0 ? caixa[0] : `inexistente`
    }

    const filesDBuserBC = (usu) => {
        AB = cidadesRPG.map(a => a.nome2).indexOf(rmLetras(findCity(usu)))
        AC = cidadesRPG[AB].moradores.map(b => b.id).indexOf(usu)
        return cidadesRPG[AB].moradores[AC]
    }

//=================geral===============\\

const isYouInBlackCity = (id) => {
    if(cidadesRPG.length <= 0) return false
    nmr = 0
    for(i of cidadesRPG) {
        if(isJsonIncludes(i.moradores, id)) nmr += 1
    }
    if(nmr <= 0) return false
    return true
}

function registrarUsuInBlackCity(usu, name, cidade) {
    bank = bancos[alerandom(bancos.length)]
    AB = cidadesRPG.map(c => c.nome2).indexOf(rmLetras(cidade))
    city = cidadesRPG[AB].moradores
    city.push({id: usu, nome: name, banco: bank.nome+` `+bank.emoji, saldo: 0, registro: {data: sendHours("DD/MM/YYYY"), hora: sendHours("HH:mm")}, casa: true, lv_casa: 1, veiculo: [], trabalho: []})
    saveCityBlackRPG();
}

function rmUsuBlackCity(usu) {
    for(i of cidadesRPG) {
        if(isJsonIncludes(i.moradores, usu)) {
            AB = i.moradores.map(m => m.id).indexOf(usu)
            i.moradores.splice(AB, 1)
            saveCityBlackRPG();
        }
    }
}

const getTotalUserBlackCity = () => {
    caixa = []
    for(a of cidadesRPG) {
        for(b of a.moradores) {
            caixa.push({UID: b.id, nick: b.nome})
        }
    }
    return caixa
}

const totalUserBlackCity = getTotalUserBlackCity();

//=================exportações===============\\

module.exports = {
    cidadesRPG, saveCityBlackRPG, createCityBlackRPG, existCity, limitCity, findCity, filesDBuserBC, registrarUsuInBlackCity, rmUsuBlackCity, isYouInBlackCity, totalUserBlackCity
}