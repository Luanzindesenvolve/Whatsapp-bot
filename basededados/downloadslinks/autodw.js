const fs = require(`fs`)

const { isJsonIncludes, linkfy, sleep, fetchJson, saveJSON } = require(`../../config.js`)

const { blacksite, API_KEY_BLACK } = require(`../../dono/config-all.json`)

var isUrl = (url) => {
if(linkfy.find(url)[0]) return true
return false
}

const autodwpath = `./basededados/downloadslinks/autodwlinks.json`

if(!fs.existsSync(autodwpath)) {fs.writeFileSync(autodwpath, JSON.stringify([]))}

const autodw = JSON.parse(fs.readFileSync(autodwpath))

function saveAutoDW() {saveJSON(autodw, autodwpath)}

function addUsuInAutoDW(sender, active = true) {
    platforms = [
        {youtube: true, audio: false},
        {facebook: true, audio: false},
        {instagram: true, audio: false},
        {tiktok: true, audio: false},
        {twitter: true, audio: false},
        {mediafire: true},
        {github: true},
        {xvideos: true},
        {xnxx: true}
    ]
    autodw.push({id: sender, multidl: false, active: active, platforms: platforms})
    saveAutoDW()
}

const getUsuAutoDW = (sender) => {
    AB = autodw.map(i => i.id).indexOf(sender)
    return autodw[AB]
}

function activateAutoDWinUsu(sender) {
    if(!isJsonIncludes(autodw, sender)) return addUsuInAutoDW(sender)
    data = getUsuAutoDW(sender)
    data.active = true
    saveAutoDW()
}

function disableAutoDWinUsu(sender) {
    if(!isJsonIncludes(autodw, sender)) return addUsuInAutoDW(sender, false)
    data = getUsuAutoDW(sender)
    data.active = false
    saveAutoDW()
}

function react(blackmd, from, emoji, info) {if(info) blackmd.sendMessage(from, {react: {text: emoji, key: info.key}})}

async function idAllLinkAutoDW(blackmd, from, sender, body, info) {
    data = getUsuAutoDW(sender)
    if(data.active) {
        sp = body.split(`\n`).join(` `).split(`,`).join(` `).split(` `)
        links = []
        for(i of sp) {
            txt = i.replace(`\n`, ``).replace(`\n`, ``)
            if(isUrl(txt)) links.push(txt)
        }
        if(data.multidl) { alllinksplatforms = links
        } else { alllinksplatforms = [links[0]] }
        for(dw of alllinksplatforms) {
            if(dw.includes(`youtube`) || dw.includes(`youtu.be`)) {
    yt = data.platforms[0]
    if(yt.youtube) {
        try {
            if(!yt.audio) {
                react(blackmd, from, `📽`, info)
                blackmd.sendMessage(from, {
                    video: { url: `https://world-ecletix.onrender.com/api/linkmp4?url=${dw}` }
                }, { quoted: info })
            } else {
                react(blackmd, from, `🎶`, info)
                blackmd.sendMessage(from, {
                    audio: { url: `https://world-ecletix.onrender.com/api/linkmp3?url=${dw}` },
                    mimetype: `audio/mpeg`
                }, { quoted: info })
            }
        } catch(e) {
            console.log(`Erro em dw do youtube - `, e)
        }
    }
    await sleep(1000)
}
           if(dw.includes(`facebook`) || dw.includes(`fb.watch`)) {
    fb = data.platforms[1]
    if(fb.facebook) {
        try {
            if(!fb.audio) {
                react(blackmd, from, `📽`, info)
                fetchfb = await fetchJson(`https://api.vreden.my.id/api/fbdl?url=${dw}`)
                blackmd.sendMessage(from, {
                    video: { url: fetchfb.data.hd_url || fetchfb.data.sd_url }
                }, { quoted: info })
            } else {
                react(blackmd, from, `🎶`, info)
                fetchfb = await fetchJson(`https://api.vreden.my.id/api/fbdl?url=${dw}`)
                blackmd.sendMessage(from, {
                    audio: { url: fetchfb.data.hd_url || fetchfb.data.sd_url },
                    mimetype: `audio/mpeg`
                }, { quoted: info })
            }
        } catch(e) {
            console.log(`Erro em dw do facebook - `, e)
        }
    }
    await sleep(1000)
}
if (dw.includes('instagram.com') || dw.includes('reel')) {
ig = data.platforms[2]
if (ig.instagram) {
try {
fetchig = await fetchJson(`https://world-ecletix.onrender.com/api/insta?url=${dw}`)
if (!fetchig.success || !fetchig.data || !Array.isArray(fetchig.data.data)) {
return console.log("Resposta inválida da API Instagram!")
}

const resultados = fetchig.data.data  

if (!ig.audio) {  
    react(blackmd, from, isJsonIncludes(resultados, `thumbnail`) ? `📸` : `📽`, info)  
    for (ftigvd of resultados) {  
        await sleep(700)  
        blackmd.sendMessage(from, {  
            video: { url: ftigvd.url }  
        }, { quoted: info })  
    }  
} else {  
    react(blackmd, from, `🎶`, info)  
    for (c of resultados) {  
        await sleep(700)  
        blackmd.sendMessage(from, {  
            audio: { url: c.url },  
            mimetype: `audio/mpeg`  
        }, { quoted: info })  
    }  
}  
} catch (e) {  
console.log(`Erro em dw do instagram - `, e)  
}  
}  
await sleep(1000)
}
            if (dw.includes(`tiktok`)) {
    ttk = data.platforms[3]
    if (ttk.tiktok) {
        try {
            const fetchttk = await fetchJson(`https://world-ecletix.onrender.com/api/tiktok?query=${dw}`)
            
            if (!ttk.audio) {
                react(blackmd, from, `🎥`, info)
                blackmd.sendMessage(from, {
                    video: { url: fetchttk.videoOriginal },
                    caption: fetchttk.legenda
                }, { quoted: info })
            } else {
                react(blackmd, from, `🎶`, info)

                try {
                    const audioBuffer = await getFileBuffer(fetchttk.videoOriginal) // baixa o vídeo
                    const audioLink = await uploadToCatbox(audioBuffer, 'audio.mp3') // converte para áudio e envia para Catbox

                    blackmd.sendMessage(from, {
                        audio: { url: audioLink },
                        mimetype: `audio/mpeg`
                    }, { quoted: info })

                } catch (e) {
                    console.log(`Erro ao converter vídeo do TikTok em áudio:`, e)
                }
            }
        } catch (e) {
            console.log(`Erro em dw do tiktok - `, e)
        }
        await sleep(1000)
    }
}
if (dw.includes("twitter.com") || dw.includes("x.com")) {
  twt = data.platforms[4]
  if (twt.twitter) {
    try {
      // Chamada da nova API
      const fetchtwt = await fetchJson(`https://world-ecletix.onrender.com/api/twitter?link=${dw}`)

      // Se for vídeo (sem áudio solicitado)
      if (!twt.audio) {
        react(blackmd, from, `📷`, info)
        let videoUrl = fetchtwt.HD || fetchtwt.SD
        if (videoUrl) {
          blackmd.sendMessage(from, { video: { url: videoUrl } }, { quoted: info })
        } else if (fetchtwt.thumb) {
          blackmd.sendMessage(from, { image: { url: fetchtwt.thumb } }, { quoted: info })
        }
      } else {
        // Modo áudio: mesmo link do vídeo, só muda o tipo de envio
        react(blackmd, from, `🎶`, info)
        let videoUrl = fetchtwt.HD || fetchtwt.SD
        if (videoUrl) {
          blackmd.sendMessage(from, { audio: { url: videoUrl }, mimetype: 'audio/mpeg' }, { quoted: info })
        }
      }

    } catch (e) {
      console.log("Erro em dw do twitter - ", e)
    }
  }
  await sleep(1000)
}
            if(dw.includes(`mediafire`)) {
                mf = data.platforms[5]
                if(mf.mediafire) {
                    try {
                        fetchmf = await fetchJson(blacksite+`/api/dl/mediafire?url=${dw}&apikey=`+API_KEY_BLACK)
                        blackmd.sendMessage(from, {text: `📂 *Nome:* ${fetchmf.resultado.filename}\n🧮 *Tamanho:* ${fetchmf.resultado.size}\n_Criado em ${fetchmf.resultado.uploadDate}_`}, {quoted: info})
                        blackmd.sendMessage(from, {document: {url: fetchmf.resultado.url}, mimetype: "application/"+fetchmf.resultado.filetype, fileName: fetchmf.resultado.filename}, {quoted: info})
                    } catch(e) {console.log(`Erro em dw do mediafire - `, e)}
                }
                await sleep(1000)
            }
            if(dw.includes(`github`)) {
                gh = data.platforms[6]
                if(gh.github) {
                    try {
                        let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
                        let [, user, repo] = dw.match(regex1) || []
                        repo = repo.replace(/.git$/, '')
                        let giturl = `https://api.github.com/repos/${user}/${repo}/zipball`
                        let filename = (await fetch(giturl, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
                        let finishname = filename.split(`-`).splice(0, filename.split(`-`).length - 1).join(`-`)
                        blackmd.sendMessage(from, {document: {url: giturl}, fileName: finishname+'.zip', mimetype: 'application/zip'}, {quoted: info})
                    } catch(e) {console.log(`Erro em dw do github - `, e)}
                }
                await sleep(1000)
            }
            if(dw.includes(`xvideos`)) {
                xv = data.platforms[7]
                if(xv.xvideos) {
                    try {
                        fetchxv = await fetchJson(blacksite+`/api/xvideos?url=${dw}&apikey=`+API_KEY_BLACK)
                        blackmd.sendMessage(from, {video: {url: fetchxv.resultado.download}}, {quoted: info})
                    } catch(e) {console.log(`Erro em dw do xvideos - `, e)}
                }
                await sleep(1000)
            }
            if(dw.includes(`xnxx`)) {
                xx = data.platforms[7]
                if(xx.xnxx) {
                    try {
                        fetchxx = await fetchJson(blacksite+`/api/xnxxdl?url=${dw}&apikey=`+API_KEY_BLACK)
                        blackmd.sendMessage(from, {video: {url: fetchxx.resultado.url}}, {quoted: info})
                    } catch(e) {console.log(`Erro em dw do xnxx - `, e)}
                }
            }
        }
    }
}

module.exports = { autodw, saveAutoDW, addUsuInAutoDW, getUsuAutoDW, activateAutoDWinUsu, disableAutoDWinUsu, idAllLinkAutoDW }