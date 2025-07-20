const fs = require("fs")

const { sendHours, moment } = require("../../config");

function saveJSON(inter, caminho){
fs.writeFileSync(caminho, JSON.stringify(inter, null, 2))}

const isJsonIncludes = (json, value) => {
if(JSON.stringify(json).includes(value)) return true
return false}

const identArroba = (txt) => {
return txt.includes('@') ? txt.split('@')[1].replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net" : txt.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net"}

const waitFriendZonePath = `./basededados/namoro-casamento/pedido.json`

const dbFriendZonePath = `./basededados/namoro-casamento/database.json`

if(!fs.existsSync(waitFriendZonePath)) {saveJSON([], waitFriendZonePath)}

if(!fs.existsSync(dbFriendZonePath)) {saveJSON([], dbFriendZonePath)}

const waitFriendZone = JSON.parse(fs.readFileSync(waitFriendZonePath))

const dbFriendZone = JSON.parse(fs.readFileSync(dbFriendZonePath))

function saveWaitFriendZone() {saveJSON(waitFriendZone, waitFriendZonePath)}

function saveDBfriendZone() {saveJSON(dbFriendZone, dbFriendZonePath)}

//==================GERAL==================\\

const getDBFZuser = (usu) => {
    AB = dbFriendZone.map(i => i.usu1).indexOf(usu)
    return dbFriendZone[AB]
}

const isGroupOfPedidoFriendZone = (usu, gp) => {
    if(!isJsonIncludes(waitFriendZone, usu)) return false
    AB = waitFriendZone.map(i => i.id).indexOf(usu)
    return gp == waitFriendZone[AB].grupo ? true : false
}

function terminarOuDivorciar(usu) {
    AB = dbFriendZone.map(i => i.usu1).indexOf(usu)
    AC = dbFriendZone.map(i => i.usu1).indexOf(identArroba(getDBFZuser(usu).usu2))
    dbFriendZone.splice(AC, 1)
    saveDBfriendZone();
    dbFriendZone.splice(AB, 1)
    saveDBfriendZone();
}

//==================NAMORO==================\\

const userEstaNamorando = (usu) => {
    if(!isJsonIncludes(dbFriendZone, usu)) return false
    AB = dbFriendZone.map(i => i.usu1).indexOf(usu)
    return dbFriendZone[AB].namorando
}

function gerarPedidoDeNamoro(pedindo, pedido, gp) {
    tempoFZ = {
        segundo: 0,
        minuto: 0,
        hora: 0,
        day: 0,
        mm: 0,
        year: 0,
        niver: 0
    }
    db = {
        usu1: pedindo,
        usu2: pedido.split("@")[0],
        namorando: false,
        namoro: tempoFZ,
        casado: false,
        casamento: tempoFZ
    }
    wait = {
        id: pedido,
        pedido: pedindo.split("@")[0],
        grupo: gp,
        tipo: 1
    }
    dbFriendZone.push(db)
    saveDBfriendZone()
    waitFriendZone.push(wait)
    saveWaitFriendZone()
}

const userPediuAlguemEmNamoro = (usu) => {
    if(!isJsonIncludes(dbFriendZone, usu)) return false
    user = identArroba(getDBFZuser(usu).usu2)
    if(!isJsonIncludes(waitFriendZone, user)) return false
    AB = waitFriendZone.map(i => i.id).indexOf(user)
    return waitFriendZone[AB].tipo == 1 ? true : false
}

function cancelarPedidoDeNamoro(usu) {
    AB = dbFriendZone.map(i => i.usu1).indexOf(usu)
    AC = waitFriendZone.map(i => i.id).indexOf(identArroba(dbFriendZone[AB].usu2))
    waitFriendZone.splice(AC, 1)
    saveWaitFriendZone();
    dbFriendZone.splice(AB, 1)
    saveDBfriendZone();
}

const isWaitUsuFZ_namoro = (usu) => {
    if(!isJsonIncludes(waitFriendZone, usu)) return false
    AB = waitFriendZone.map(i => i.id).indexOf(usu)
    return waitFriendZone[AB].tipo == 1 ? true : false
}

function deletarAntigoPedidoDeNamoro(usu) {
    if(isWaitUsuFZ_namoro(usu)) {
        A1 = waitFriendZone.map(i => i.id).indexOf(usu)
        A2 = dbFriendZone.map(i => i.usu1).indexOf(identArroba(waitFriendZone[AB].pedido))
        dbFriendZone.splice(A2, 1)
        saveDBfriendZone();
        waitFriendZone.splice(A1, 1)
        saveWaitFriendZone();
    }
    if(isJsonIncludes(dbFriendZone, usu) && !userEstaNamorando(usu)) {
        B1 = dbFriendZone.map(i => i.usu1).indexOf(usu)
        B2 = waitFriendZone.map(i => i.id).indexOf(identArroba(dbFriendZone[B1].usu2))
        waitFriendZone.splice(B2, 1)
        saveWaitFriendZone();
        dbFriendZone.splice(B1, 1)
        saveDBfriendZone();
    }
}

function aceitarPedidoDeNamoro(usu) {
    AB = waitFriendZone.map(i => i.id).indexOf(usu)
    pedindo = identArroba(waitFriendZone[AB].pedido)
    AC = dbFriendZone.map(i => i.usu1).indexOf(pedindo)
    tempoFZ = {
        segundo: sendHours("ss"),
        minuto: sendHours("mm"),
        hora: sendHours("HH"),
        day: sendHours("DD"),
        mm: sendHours("MM"),
        year: sendHours("YYYY"),
        niver: sendHours("DD/MM/YYYY")
    }
    db = {
        usu1: usu,
        usu2: pedindo.split("@")[0],
        grupo: dbFriendZone[AC].grupo,
        namorando: true,
        namoro: tempoFZ,
        casado: false,
        casamento: tempoFZ
    }
    dbFriendZone.push(db)
    saveDBfriendZone()
    data = dbFriendZone[AC]
    data.namorando = true
    data.namoro = tempoFZ
    saveDBfriendZone()
    waitFriendZone.splice(AB, 1)
    saveWaitFriendZone()
}

function recusarPedidoDeNamoro(usu) {
    AB = waitFriendZone.map(i => i.id).indexOf(usu)
    pedindo = identArroba(waitFriendZone[AB].pedido)
    AC = dbFriendZone.map(i => i.usu1).indexOf(pedindo)
    dbFriendZone.splice(AC, 1)
    saveDBfriendZone();
    waitFriendZone.splice(AB, 1)
    saveWaitFriendZone();
}

//==================CASAMENTO==================\\

const userEstaCasado = (usu) => {
    if(!isJsonIncludes(dbFriendZone, usu)) return false
    AB = dbFriendZone.map(i => i.usu1).indexOf(usu)
    return dbFriendZone[AB].casado
}

const isUserMencFZ = (usu, menc) => {
    if(!isJsonIncludes(dbFriendZone, usu)) return false
    AB = dbFriendZone.map(i => i.usu1).indexOf(usu)
    return menc == identArroba(dbFriendZone[AB].usu2) ? true : false
}

function gerarPedidoDeCasamento(usu, gp) {
    AB = dbFriendZone.map(i => i.usu1).indexOf(usu)
    wait = {
        id: identArroba(dbFriendZone[AB].usu2),
        pedido: usu.split("@")[0],
        grupo: gp,
        tipo: 2
    }
    waitFriendZone.push(wait)
    saveWaitFriendZone();
}

const userPediuAlguemEmCasamento = (usu) => {
    if(!isJsonIncludes(dbFriendZone, usu)) return false
    user = identArroba(getDBFZuser(usu).usu2)
    if(!isJsonIncludes(waitFriendZone, user)) return false
    AB = waitFriendZone.map(i => i.id).indexOf(user)
    return waitFriendZone[AB].tipo == 2 ? true : false
}

function cancelarPedidoDeCasamento(usu) {
    AB = dbFriendZone.map(i => i.usu1).indexOf(usu)
    AC = waitFriendZone.map(i => i.id).indexOf(identArroba(dbFriendZone[AB].usu2))
    waitFriendZone.splice(AC, 1)
    saveWaitFriendZone();
}

const isWaitUsuFZ_casamento = (usu) => {
    if(!isJsonIncludes(waitFriendZone, usu)) return false
    AB = waitFriendZone.map(i => i.id).indexOf(usu)
    return waitFriendZone[AB].tipo == 2 ? true : false
}

function aceitarPedidoDeCasamento(usu) {
    AB = waitFriendZone.map(i => i.id).indexOf(usu)
    A1 = dbFriendZone.map(i => i.usu1).indexOf(usu)
    A2 = dbFriendZone.map(i => i.usu1).indexOf(identArroba(dbFriendZone[A1].usu2))
    tempoFZ = {
        segundo: sendHours("ss"),
        minuto: sendHours("mm"),
        hora: sendHours("HH"),
        day: sendHours("DD"),
        mm: sendHours("MM"),
        year: sendHours("YYYY"),
        niver: sendHours("DD/MM/YYYY")
    }
    dbFriendZone[A1].casado = true
    dbFriendZone[A1].casamento = tempoFZ
    saveDBfriendZone();
    dbFriendZone[A2].casado = true
    dbFriendZone[A2].casamento = tempoFZ
    saveDBfriendZone();
    waitFriendZone.splice(AB, 1)
    saveWaitFriendZone();
}

function recusarPedidoDeCasamento(usu) {
    AB = waitFriendZone.map(i => i.id).indexOf(usu)
    waitFriendZone.splice(AB, 1)
    saveWaitFriendZone();
}

//==================ANIVERSÁRIO==================\\

function aniversarioDeNamoroOuCasamento(blackmd) {
    if(dbFriendZone.length > 0) {
        for(a of dbFriendZone) {
            if(userEstaNamorando(a.usu1) && !userEstaCasado(a.usu1)) {
                if(Number(a.namoro.day) === Number(sendHours("DD")) && a.namoro.niver != sendHours("DD/MM/YYYY") && Number(a.namoro.hora) > (Number(sendHours("HH")) - 1)) {
                    a.namoro.niver = sendHours("DD/MM/YYYY")
                    saveDBfriendZone();
                    ano_namoro = Number(sendHours("YYYY")) - Number(a.namoro.year)
                    mes_namoro = (Number(sendHours("MM")) - Number(a.namoro.mm)) + (ano_namoro > 0 ? ano_namoro * 12 : 0)
                    if(ano_namoro <= 0) {
                        if(mes_namoro > 0 && mes_namoro < 12) {
                            blackmd.sendMessage(a.usu1, {text: `💖 Felicitações @${a.usu1.split("@")[0]}, parece que hoje você está completando ${mes_namoro} m${mes_namoro != 1 ? `eses` : `ês`} de namoro com sua dupla @${a.usu2} 🥰`, mentions: [a.usu1, identArroba(a.usu2)]})
                        }
                    } else {
                        if(mes_namoro >= 12) {
                            blackmd.sendMessage(a.usu1, {text: `💞 Olá @${a.usu1.split("@")[0]}, hoje é um dia extremamente especial para você... Pois hoje você completa ${ano_namoro} ano${ano_namoro != 1 ? `s` : ``} de namoro com sua dupla @${a.usu2} 🥰`, mentions: [a.usu1, identArroba(a.usu2)]})
                        }
                    }
                }
            }
            if(userEstaCasado(a.usu1)) {
                if(Number(a.casamento.day) === Number(sendHours("DD")) && a.casamento.niver != sendHours("DD/MM/YYYY") && Number(a.casamento.hora) > (Number(sendHours("HH")) - 1)) {
                    a.casamento.niver = sendHours("DD/MM/YYYY")
                    saveDBfriendZone();
                    ano_casamento = Number(sendHours("YYYY")) - Number(a.casamento.year)
                    mes_casamento = (Number(sendHours("MM")) - Number(a.casamento.mm)) + (ano_casamento > 0 ? ano_casamento * 12 : 0)
                    if(ano_casamento <= 0) {
                        if(mes_casamento > 0 && mes_casamento < 12) {
                            blackmd.sendMessage(a.usu1, {text: `💕 Felicitações @${a.usu1.split("@")[0]}, parece que hoje você está completando ${mes_casamento} m${mes_casamento != 1 ? `eses` : `ês`} de casamento com seu cônjuge @${a.usu2} 😘`, mentions: [a.usu1, identArroba(a.usu2)]})
                        }
                    } else {
                        if(mes_casamento >= 12) {
                            blackmd.sendMessage(a.usu1, {text: `💍 Olá @${a.usu1.split("@")[0]}, hoje é um dia extremamente especial para você... Pois hoje você completa ${ano_casamento} ano${ano_casamento != 1 ? `s` : ``} de casamento com seu cônjuge @${a.usu2} 😍`, mentions: [a.usu1, identArroba(a.usu2)]})
                        }
                    }
                }
            }
        }
    }
}

module.exports = { waitFriendZone, saveWaitFriendZone, dbFriendZone, saveDBfriendZone, getDBFZuser, isGroupOfPedidoFriendZone, userEstaNamorando, gerarPedidoDeNamoro, userPediuAlguemEmNamoro, cancelarPedidoDeNamoro, isWaitUsuFZ_namoro, deletarAntigoPedidoDeNamoro, aceitarPedidoDeNamoro, recusarPedidoDeNamoro, userEstaCasado, isUserMencFZ, gerarPedidoDeCasamento, userPediuAlguemEmCasamento, cancelarPedidoDeCasamento, isWaitUsuFZ_casamento, aceitarPedidoDeCasamento, recusarPedidoDeCasamento, terminarOuDivorciar, aniversarioDeNamoroOuCasamento }