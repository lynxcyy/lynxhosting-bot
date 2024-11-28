let { MessageType } = require('@whiskeysockets/baileys')

let handler = async (m, { conn, text, usedPrefix }) => {
  function no(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '')
  }

  var hl = []
  hl[0] = text.split('|')[0]
  hl[0] = no(hl[0]) + "@s.whatsapp.net"
  hl[1] = text.split('|')[1]
  
  if (!text) return conn.reply(m.chat, `• *Example :* .addprem 628816609112|1d2h30m15s`, m)
  if (typeof db.data.users[hl[0]] == 'undefined') return conn.reply(m.chat,  '🚩 Pengguna tidak ada didalam data base', m)

  // Convert time string to milliseconds
  let duration = parseTime(hl[1])

  if (duration === 0) return conn.reply(m.chat, '🚩 Format waktu tidak valid', m)

  var now = new Date() * 1
  global.db.data.users[hl[0]].premium = true
  if (now < global.db.data.users[hl[0]].premiumDate) global.db.data.users[hl[0]].premiumDate += duration
  else global.db.data.users[hl[0]].premiumDate = now + duration

  conn.reply(m.chat, `• *UPGRADE PREMIUM*\n\nBerhasil menambahkan akses premium kepada *@${hl[0].split('@')[0]}* selama *${hl[1]}*.\n\n*Premium : ${msToDate(global.db.data.users[hl[0]].premiumDate - now)}*`, m, { contextInfo: { mentionedJid: [hl[0]] } })
  conn.reply(hl[0], `• *UPGRADE PREMIUM*\n\nBerhasil menambahkan akses premium kepada *@${hl[0].split('@')[0]}* selama *${hl[1]}*.\n\n*Premium : ${msToDate(global.db.data.users[hl[0]].premiumDate - now)}*`, m, { contextInfo: { mentionedJid: [hl[0]] } })
}

handler.help = ['addprem *<@tag>*']
handler.tags = ['owner']
handler.command = /^(addprem)$/i
handler.owner = true
handler.fail = null
module.exports = handler

function parseTime(str) {
  let duration = 0
  const regex = /(\d+)([mhd])/g
  let m
  while ((m = regex.exec(str)) !== null) {
    let amount = parseInt(m[1])
    let unit = m[2]
    switch (unit) {
      case 'm':
        duration += amount * 60 * 1000 // menit ke milidetik
        break
      case 'h':
        duration += amount * 60 * 60 * 1000 // jam ke milidetik
        break
      case 'd':
        duration += amount * 24 * 60 * 60 * 1000 // hari ke milidetik
        break
    }
  }
  return duration
}

function msToDate(ms) {
  temp = ms
  days = Math.floor(ms / (24*60*60*1000));
  daysms = ms % (24*60*60*1000);
  hours = Math.floor((daysms)/(60*60*1000));
  hoursms = ms % (60*60*1000);
  minutes = Math.floor((hoursms)/(60*1000));
  minutesms = ms % (60*1000);
  sec = Math.floor((minutesms)/(1000));
  return days+":"+hours+":"+ minutes + "";
}
