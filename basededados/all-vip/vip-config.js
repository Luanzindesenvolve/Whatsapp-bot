const fs = require("fs")

const { saveJSON, nit, supre, sesc, chyt, identArroba, sendHours, isJsonIncludes, allvaluerent } = require("../../config.js")

const { numerodono } = require("../../dono/settings.json")

const { dono1, dono2, dono3, dono4, dono5, dono6 } = require("../../dono/config-all.json")

const donos = [
    identArroba(numerodono),
    identArroba(dono1),
    identArroba(dono2),
    identArroba(dono3),
    identArroba(dono4),
    identArroba(dono5),
    identArroba(dono6),
    nit,
    supre,
    sesc,
    chyt
]

//==============VIP=============\\

const valoresVIP = allvaluerent.allvip

const vippath = `./basededados/all-vip/vip.json`

if(!fs.existsSync(vippath)) {saveJSON([], vippath)}

const vip = JSON.parse(fs.readFileSync(vippath))

function saveVip() {saveJSON(vip, vippath)}

function addVip(usu, dias, mod = false) {
    nmr = Number(dias)
    if(isJsonIncludes(vip, usu)) {
        AB = vip.map(i => i.id).indexOf(usu)
        vip[AB].total = nmr > 0 ? vip[AB].dias + nmr : vip[AB].total
        vip[AB].dias += nmr > 0 ? nmr : 0
        vip[AB].infinito = nmr > 0 ? false : true
        vip[AB].advenced = mod == true || mod == false ? mod : vip[AB].advenced
        saveVip()
    } else {
        vip.push({id: usu, dias: nmr, total: nmr, save: sendHours("DD"), infinito: nmr > 0 ? false : true, advenced: mod == true || mod == false ? mod : false})
        saveVip()
    }
}

function rmVip(usu, dias, mod = false) {
    nmr = Number(dias)
    if(isJsonIncludes(vip, usu)) {
        AB = vip.map(i => i.id).indexOf(usu)
        vip[AB].dias -= nmr > 0 ? nmr : 0
        vip[AB].infinito = nmr > 0 ? false : true
        vip[AB].advenced = mod == true || mod == false ? mod : vip[AB].advenced
        saveVip()
    } else {
        vip.push({id: usu, dias: 0, total: 0, save: "00", infinito: nmr > 0 ? false : true, advenced: mod == true || mod == false ? mod : false})
        saveVip()
    }
}

const getUsuVip = (usu) => {
    AB = vip.map(i => i.id).indexOf(usu)
    return vip[AB]
}

function delVip(usu) {
    AB = vip.map(i => i.id).indexOf(usu)
    vip.splice(AB, 1)
    saveVip()
}

const isOnlyVip = (usu) => {
    if(isJsonIncludes(vip, usu) || isJsonIncludes(donos, usu)) return true
    return false
}

const isAdvencedVip = (usu) => {
    if(isJsonIncludes(vip, usu) && getUsuVip(usu).advenced || isJsonIncludes(donos, usu)) return true
    return false
}

const isInfinityVip = (usu) => {
    if(isJsonIncludes(vip, usu) && getUsuVip(usu).infinito || isJsonIncludes(donos, usu)) return true
    return false
}

function vipTime() {
    if(vip.length > 0) {
        for(v of vip) {
            if(Number(v.save) !== Number(sendHours("DD"))) {
                v.save = sendHours("DD")
                saveVip()
                if(!v.infinito) {
                    if(v.dias > 1) {
                        v.dias -= 1
                        saveVip()
                    } else {
                        AB = vip.map(i => i.id).indexOf(v.id)
                        vip.splice(AB, 1)
                        saveVip()
                    }
                }
            }
        }
    }
}

vipTime()

//==============VIPGP=============\\

const vipgppath = `./basededados/all-vip/vipgp.json`

if(!fs.existsSync(vipgppath)) {saveJSON([], vipgppath)}

const vipgp = JSON.parse(fs.readFileSync(vipgppath))

function saveGroupVip() {saveJSON(vipgp, vipgppath)}

function addGroupVip(from, dias, mod = false) {
    nmr = Number(dias)
    if(isJsonIncludes(vipgp, from)) {
        AB = vipgp.map(i => i.id).indexOf(from)
        vipgp[AB].total = nmr > 0 ? vipgp[AB].dias + nmr : vipgp[AB].total
        vipgp[AB].dias += nmr > 0 ? nmr : 0
        vipgp[AB].infinito = nmr > 0 ? false : true
        vipgp[AB].advenced = mod == true || mod == false ? mod : vipgp[AB].advenced
        saveVip()
    } else {
        vipgp.push({id: from, dias: nmr, total: nmr, save: sendHours("DD"), infinito: nmr > 0 ? false : true, advenced: mod == true || mod == false ? mod : false})
        saveGroupVip()
    }
}

function rmGroupVip(from, dias, mod = false) {
    nmr = Number(dias)
    if(isJsonIncludes(vipgp, from)) {
        AB = vipgp.map(i => i.id).indexOf(from)
        vipgp[AB].dias -= nmr > 0 ? nmr : 0
        vipgp[AB].infinito = nmr > 0 ? false : true
        vipgp[AB].advenced = mod == true || mod == false ? mod : vipgp[AB].advenced
        saveGroupVip()
    } else {
        vipgp.push({id: from, dias: 0, total: 0, save: "00", infinito: nmr > 0 ? false : true, advenced: mod == true || mod == false ? mod : false})
        saveGroupVip()
    }
}

const getGroupVip = (from) => {
    AB = vipgp.map(i => i.id).indexOf(from)
    return vipgp[AB]
}

function delGroupVip(from) {
    AB = vipgp.map(i => i.id).indexOf(from)
    vipgp.splice(AB, 1)
    saveGroupVip()
}

const isOnlyGroupVip = (from) => {
    if(isJsonIncludes(vipgp, from)) return true
    return false
}

const isAdvencedGroupVip = (from) => {
    if(isJsonIncludes(vipgp, from) && getGroupVip(from).advenced) return true
    return false
}

const isInfinityGroupVip = (from) => {
    if(isJsonIncludes(vipgp, from) && getGroupVip(from).infinito) return true
    return false
}

function vipGroupTime() {
    if(vipgp.length > 0) {
        for(v of vipgp) {
            if(Number(v.save) !== Number(sendHours("DD"))) {
                v.save = sendHours("DD")
                saveGroupVip()
                if(!v.infinito) {
                    if(v.dias > 1) {
                        v.dias -= 1
                        saveGroupVip()
                    } else {
                        AB = vipgp.map(i => i.id).indexOf(v.id)
                        vipgp.splice(AB, 1)
                        saveGroupVip()
                    }
                }
            }
        }
    }
}

vipGroupTime();

module.exports = { vip, saveVip, addVip, rmVip, delVip, getUsuVip, isOnlyVip, isAdvencedVip, isInfinityVip, vipTime, vipgp, saveGroupVip, addGroupVip, delGroupVip, getGroupVip, isOnlyGroupVip, isAdvencedGroupVip, isInfinityGroupVip, vipGroupTime, valoresVIP }