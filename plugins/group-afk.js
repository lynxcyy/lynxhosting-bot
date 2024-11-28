let handler = async (m, { text, isOwner, command }) => {
  let user = global.db.data.users[m.sender]

  if (command === 'afk') {
    user.afk = +new Date()
    user.afkReason = text
    m.reply(`${conn.getName(m.sender)} is now AFK${text ? ': ' + text : ''}`)
  } else if (command === 'unafk') {
    if (text === 'all' && isOwner) {
      for (let jid in global.db.data.users) {
        if (global.db.data.users[jid].afk) {
          global.db.data.users[jid].afk = null
          global.db.data.users[jid].afkReason = null
        }
      }
      m.reply('All users are no longer AFK')
    } else {
      user.afk = null
      user.afkReason = null
      m.reply(`${conn.getName(m.sender)} is no longer AFK`)
    }
  }
}

handler.help = ['afk', 'unafk']
handler.command = ['afk', 'unafk']
handler.tags = ['group']
handler.register = true

module.exports = handler
