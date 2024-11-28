var fetch = require("node-fetch")
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) return m.reply('Masukkan Query Link!')
 try {
 await m.reply(wait)
let anu = await fetch(`https://api.betabotz.eu.org/api/download/xvideosdl?url=${text}&apikey=${lann}`)
let hasil = await anu.json() 

conn.sendMessage(m.chat, { video: { url: hasil.result.url }, fileName: 'xnxx.mp4', mimetype: 'video/mp4' }, { quoted: m })
} catch (e) {
throw `*Server Error!*`
}
  }                                                    
handler.command = /^(xvidl|xvideosdl|xvdl)$/i
handler.help = ['xvideosdl'];
handler.tags = ['downloader', 'premium'];
handler.premium = true
module.exports = handler;