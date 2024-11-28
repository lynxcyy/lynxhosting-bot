let levelling = require('../lib/levelling')

let handler = m => {
  let user = global.db.data.users[m.sender]
  if (!levelling.canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
    return m.reply(`
Level *${user.level} (${user.exp - min}/${xp})*
Kurang *${max - user.exp}* lagi!
    `)
  }

  let before = user.level * 1
  while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
  if (before !== user.level) {
    m.reply(`
Selamat, anda telah naik level!
*${before}* -> *${user.level}*
gunakan *.me* untuk mengecek
    `)
  }
}

handler.help = handler.command = ['levelup']
handler.tags = ['rpg']
handler.register = true
handler.limit = true

module.exports = handler