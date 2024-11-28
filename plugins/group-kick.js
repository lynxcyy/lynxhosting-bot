let handler = async (m, {
  text,
  participants,
  conn,
  isOwner,
}) => {
  try {
    if (!isOwner && !isAdmin) {
      return conn.reply(m.chat, Func.texted('bold', `Only admins can use this command.`), m)
    }

    let input = text ? text : m.quoted ? m.quoted.sender : m.mentionedJid.length > 0 ? m.mentioneJid[0] : false
    if (!input) return conn.reply(m.chat, Func.texted('bold', `Mention or reply chat target.`), m)
    
    let p = await conn.onWhatsApp(input.trim())
    if (p.length == 0) return conn.reply(m.chat, Func.texted('bold', `Invalid number.`), m)
    
    let jid = conn.decodeJid(p[0].jid)
    let number = jid.replace(/@.+/, '')
    let member = participants.find(u => u.id == jid)
    
    if (!member) return conn.reply(m.chat, Func.texted('bold', `@${number} already left or does not exist in this group.`), m)
    
    conn.groupParticipantsUpdate(m.chat, [jid], 'remove').then(res => {
      conn.reply(m.chat, 'User telah dikeluarkan dari grup.', m)
    })
  } catch (e) {
    console.log(e)
  }
}

handler.help = handler.command = ['kick']
handler.tags = ['group']
handler.botAdmin = true
handler.register = true
handler.admin = true

module.exports = handler