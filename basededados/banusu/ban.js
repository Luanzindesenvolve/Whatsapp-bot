const fs = require(`fs`)

const { saveJSON, isJsonIncludes, sendHours, contarMin, identArroba } = require(`../../config.js`)

const banpath = `./basededados/banusu/banned.json`

if(!fs.existsSync(banpath)) {fs.writeFileSync(banpath, JSON.stringify([]))}

const banned = JSON.parse(fs.readFileSync(banpath))

function saveBannedUsu() {saveJSON(banned, banpath)}

const isBanned = (usu) => {return isJsonIncludes(banned, usu)}

const getBannedUsu = (usu) => {
    AB = banned.map(i => i.id).indexOf(usu)
    return banned[AB]
}

function banirUsuario(usu, quant = `0m`) {
    nmr = Number(quant.slice(0, quant.length - 1))
    letra = quant.slice(quant.length - 1, quant.length).toLowerCase()
    multiplicador = nmr
    if(letra == `h`) multiplicador *= 60
    if(letra == `d`) multiplicador *= 60 * 24
    if(!isJsonIncludes(banned, usu)) {
        if(Number(multiplicador) > 0) {
            banned.push({id: usu, infinity: false, tempo: Number(multiplicador), save: sendHours(letra == `d` ? `DD` : letra == `h` ? `HH` : `mm`), horario: sendHours(`HH:mm`), message: `00`})
            saveBannedUsu()
        } else {
            banned.push({id: usu, infinity: true, tempo: 0, save: sendHours(letra == `d` ? `DD` : letra == `h` ? `HH` : `mm`), horario: sendHours(`HH:mm`), message: `00`})
            saveBannedUsu()
        }
    } else {
        data = getBannedUsu(usu)
        data.infinity = Number(multiplicador) <= 0 ? true : false
        data.tempo = Number(multiplicador) <= 0 ? 0 : Number(quant)
        saveBannedUsu()
    }
}

function desbanirUsuario(usu) {
    AB = banned.map(i => i.id).indexOf(usu)
    banned.splice(AB, 1)
    saveBannedUsu()
}

function bannedExpired() {
    if(banned.length > 0) {
        for(i of banned) {
            if(!i.infinity) {
                if(i.tempo > 1) {
                    if(i.tempo > 60) {
                        if(i.tempo > (60 * 24)) {
                            if(contarMin(sendHours(`HH:mm`)) >= contarMin(i.horario) && Number(sendHours(`DD`)) != Number(i.save)) {
                                fim = i.tempo - (60 * 24)
                                sub = i.tempo
                                while(sub > fim) {sub -= 1}
                                i.tempo = sub
                                i.save = sendHours(`DD`)
                                saveBannedUsu()
                            }
                        } else {
                            if(Number(sendHours(`HH`)) !== Number(i.save)) {
                                fim = i.tempo - 60
                                sub = i.tempo
                                while(sub > fim) {sub -= 1}
                                i.tempo = sub
                                i.save = sendHours(`HH`)
                                saveBannedUsu()
                            }
                        }
                    } else {
                        if(Number(sendHours(`mm`)) !== Number(i.save)) {
                            i.tempo -= 1
                            saveBannedUsu()
                            i.save = sendHours(`mm`)
                            saveBannedUsu()
                        }
                    }
                } else {
                    AB = banned.map(b => b.id).indexOf(i.id)
                    banned.splice(AB, 1)
                    saveBannedUsu()
                }
            }
        }
    }
}

function isBannedMessageUsu(from, usu, blackmd, txt) {
    if(isBanned(usu)) {
        data = getBannedUsu(usu)
        if(Number(sendHours(`DD`)) !== Number(data.message)) {
            data.message = sendHours(`DD`)
            saveBannedUsu()
            menc = []
            for(i of txt.split(` `)) {
                if(i.includes(`@`)) menc.push(identArroba(i))
            }
            return blackmd.sendMessage(from, {text: txt, mentions: menc})
        }
    }
}

module.exports = { banned, saveBannedUsu, isBanned, banirUsuario, desbanirUsuario, getBannedUsu, bannedExpired, isBannedMessageUsu }