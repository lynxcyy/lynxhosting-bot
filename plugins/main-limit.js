let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') return m.reply('User does not exist in the database')
    m.reply(`${global.db.data.users[who].limit} Limit Left`)
  }
  handler.help = ['limit']
  handler.tags = ['main']
  handler.command = ['limit']
  handler.register = true;
  module.exports = handler