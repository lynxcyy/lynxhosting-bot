let handler = async (m, { 
  isAdmin, 
  isOwner, 
  conn, 
  command 
}) => {
  conn.groupRevokeInvite(m.chat)
  conn.reply(m.chat, `Successful ${command} group link, link has been sent to private chat`, m,)
  await delay(1000)
  let linknya = await conn.groupInviteCode(m.chat)
  conn.reply(m.sender, 'https://chat.whatsapp.com/' + linknya, m)
}
handler.help = handler.command = ['revoke']
handler.tags = ['group']
handler.register = true
handler.admin = handler.botAdmin = true
module.exports = handler

const delay = (time) => new Promise((res) => setTimeout(res, time))