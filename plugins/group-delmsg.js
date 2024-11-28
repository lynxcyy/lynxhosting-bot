let handler = async (m, {
  conn,
  isBotAdmin
}) => {
  if (!m.quoted) return
  conn.sendMessage(m.chat, {
    delete: {
      remoteJid: m.chat,
      fromMe: isBotAdmin ? false : true,
      id: m.quoted.id,
      participant: m.quoted.sender
    }
  })
}
handler.help = ['delete']
handler.tags = ['group']
handler.command = ['d', 'del']
handler.register = true;
handler.group = true
module.exports = handler