let { MessageType } = require('@whiskeysockets/baileys')

let handler = async (m, { conn, usedPrefix, command, text }) => {
  function no(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '')
  }

  let userJid = ''

  if (m.quoted && m.quoted.sender) {
    userJid = m.quoted.sender
  } else {
    if (!text) return conn.reply(m.chat, Func.example(usedPrefix, command, '62xx'), m)
    userJid = no(text) + "@s.whatsapp.net"
  }
  
  if (!global.db.data.users[userJid]) {
    return conn.reply(m.chat, '🚩 Pengguna tidak ditemukan dalam database premium', m)
  }
  global.db.data.users[userJid].premium = false
  global.db.data.users[userJid].premiumDate = 0

  conn.reply(m.chat, `Berhasil menghapus akses premium untuk @${userJid.split('@')[0]}`, m, { contextInfo: { mentionedJid: [userJid] } })
}

handler.help = handler.command = ['delprem']
handler.tags = ['owner']
handler.owner = true
module.exports = handler