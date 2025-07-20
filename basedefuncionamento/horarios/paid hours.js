const fs = require(`fs`)

const { isJsonIncludes, saveJSON, sendHours, contarMin, converterMin, fetchJson, getFileBuffer, upload, alerandom } = require(`../../config.js`)

const { blacksite, API_KEY_BLACK } = require(`../../dono/config-all.json`)

const paidhourspath = `./basedefuncionamento/horarios/horarios.json`

if(!fs.existsSync(paidhourspath)) {fs.writeFileSync(paidhourspath, JSON.stringify([]))}

const paidHours = JSON.parse(fs.readFileSync(paidhourspath))

function savePaid() {saveJSON(paidHours, paidhourspath)}

function addGroupInPaid(from) {
    if(!isJsonIncludes(paidHours, from)) {
        paidHours.push({groupId: from, start: true, fundoperso: false, url: ``, horarios: []})
        savePaid()
    }
}

const getGroupInPaid = (from) => {
    AB = paidHours.map(i => i.groupId).indexOf(from)
    return paidHours[AB]
}

const getIDinPaid = (from, idpaid) => {
    horarios = getGroupInPaid(from).horarios
    AB = horarios.map(i => i.id).indexOf(idpaid)
    return horarios[AB]
}

const isIDinPaid = (from, idpaid) => {
    horarios = getGroupInPaid(from).horarios
    AB = horarios.map(i => i.id).indexOf(idpaid)
    return AB >= 0 ? true : false
}

function addPaid(from, hm) {
    addGroupInPaid(from)
    horarios = getGroupInPaid(from).horarios
    nmr = Number(hm.slice(0, hm.length - 1))
    ini = Number(hm.slice(0, hm.length - 1))
    letra = hm.slice(hm.length - 1, hm.length).toLowerCase()
    atual = sendHours(`HH:`) + (letra == `m` ? String(Number(sendHours(`mm`)) - (Number(sendHours(`mm`)) % 5)) : `00`)
    multiplicador = nmr
    if(letra == `h`) multiplicador *= 60
    soma = contarMin(atual) + multiplicador
    if(soma >= 1440) {
        sobra = soma % 1440
        dias = (soma - sobra) / 1440
    } else {
        sobra = soma
        dias = 0
    }
    horarios.push({id: sendHours(`DDMMHHmmss`), tempo: converterMin(sobra), dias: dias, save: sendHours(`DD`), nmr: ini, letra: letra})
    savePaid()
}

function rmPaid(from, idpaid) {
    horarios = getGroupInPaid(from).horarios
    AB = horarios.map(i => i.id).indexOf(idpaid)
    horarios.splice(AB, 1)
    savePaid()
}

const { prepareWAMessageMedia } = require(`@whiskeysockets/baileys`);

const paidgrouplinkpath = `./basedefuncionamento/horarios/grouplink.json`

if(!fs.existsSync(paidgrouplinkpath)) {fs.writeFileSync(paidgrouplinkpath, JSON.stringify([]))}

const groupLinkPaid = JSON.parse(fs.readFileSync(paidgrouplinkpath))

function paidSGL() {saveJSON(groupLinkPaid, paidgrouplinkpath)}

async function addGroupLinkInPaid(blackmd, from) {
    if(!isJsonIncludes(groupLinkPaid, from)) {
        try {
            getftgp = await blackmd.profilePictureUrl(from, 'image')
            upwapi = await prepareWAMessageMedia({image: {url: getftgp}}, {upload: blackmd.waUploadToServer})
            getfile = await getFileBuffer(upwapi.imageMessage, `image`)
            uptele = await upload(getfile)
        } catch(e) {return console.log(`Não foi possível salvar a foto do grupo ${from} - ${e}`)}
        groupLinkPaid.push({id: from, foto: uptele})
        paidSGL()
    }
}

function rmGroupLinkInPaid(from) {
    AB = groupLinkPaid.map(i => i.id).indexOf(from)
    if(AB >= 0) {
        groupLinkPaid.splice(AB, 1)
        paidSGL()
    }
}

const getInfoPaidGroupLink = (from) => {
    AB = groupLinkPaid.map(i => i.id).indexOf(from)
    return groupLinkPaid[AB]
}

const getGroupLinkFromPaidID = (from) => {
    data = getGroupInPaid(from)
    if(isJsonIncludes(groupLinkPaid, from)) {
        if(data.fundoperso) return data.url
        return getInfoPaidGroupLink(from).foto
    } else {
        fotos = [
            'https://telegra.ph/file/19b26c8d215503ebe498b.jpg',
            'https://telegra.ph/file/cae53e974702d0422801b.jpg',
            'https://telegra.ph/file/e161d9cfdc7653236888f.jpg',
            'https://telegra.ph/file/a0386a144de81c21efcdd.jpg',
            'https://telegra.ph/file/bd5aac0e59f4dd2128197.jpg',
            'https://telegra.ph/file/32f100123ab5c8ffbfaab.jpg',
            'https://telegra.ph/file/122c70aece00f1f8d4487.jpg',
            'https://telegra.ph/file/44cef1af0a4449886ad3d.jpg',
            'https://telegra.ph/file/4fcd478cac376c1cbadf8.jpg',
            'https://telegra.ph/file/c4b8c2591806fcfcde654.jpg'
        ]
        return fotos[alerandom(fotos.length)]
    }
}

module.exports = { paidHours, savePaid, addGroupInPaid, getGroupInPaid, getIDinPaid, addPaid, rmPaid, isIDinPaid, groupLinkPaid, paidSGL, addGroupLinkInPaid, getGroupLinkFromPaidID, getInfoPaidGroupLink, rmGroupLinkInPaid }