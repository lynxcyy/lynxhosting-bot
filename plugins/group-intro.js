const fetch = require('node-fetch')
let handler = async(m, { conn, text, usedPrefix, command }) => {
let pp = await conn.profilePictureUrl(m.chat).catch(_ => null)
let krtu = `ཻུ۪۪ꦽꦼ̷⸙‹•══════════════♡᭄
│       *「 Kartu Intro 」*
│ *Nama:* 
│ *Gender:* 
│ *Umur:*
│ *Kelas:* 
│ *Asal:*
│ *Status:* 
╰═════ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙`
m.reply(krtu)
}
handler.help = 'intro'
handler.group = true
handler.tags = ["group"];
handler.command = /^(intro)$/i
module.exports = handler