let handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (/image/.test(mime)) {
    let img = await q.download()
    if (!img) return m.reply('Image not found')
    await conn.updateProfile(m.chat, img)
  } else return m.reply(`send/reply images with commands *${usedPrefix + command}*`)
}
handler.help = ['setppgc']
handler.tags = ['group']
handler.command = ['setpic', 'setppgc']
handler.register = true
handler.group = handler.botAdmin = handler.admin = true
module.exports = handler