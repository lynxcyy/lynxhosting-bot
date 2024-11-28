let handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let who
  if (m.isGroup) who = args[1] ? args[1] : m.chat
  else who = args[1]
  if (new Date() * 1 < global.db.data.chats[who].expired)
    global.db.data.chats[who].expired = undefined
  else global.db.data.chats[who].expired = undefined
  conn.reply(m.chat, `Successfully removed the expiration day for this Group`, m)
}
handler.help = ['delexpired']
handler.command = /^(dexpired|delexpired|dxpr|-durasi|hpsdurasi|deldurasi)$/i
handler.tags = ['owner']
handler.owner = true
handler.group = true
module.exports = handler