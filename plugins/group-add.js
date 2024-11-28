let handler = async (m, { conn, args, text, usedPrefix, command }) => {
if (!text) return m.reply(`✳️ Masukkan nomor yang ingin Anda undang ke grup\n\n📌 Contoh :\n*${usedPrefix + command}* 62812xxxxx`)
if (text.includes('+')) return m.reply(`🚩 Masukkan nomor tanpa *+*`)
if (isNaN(text)) return m.reply(' 🚩 Masukan nomor tanpa spasi dan tanda(+, -)\n📌 *Contoh:* 62812xxxx')
let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
      await conn.reply(text+'@s.whatsapp.net', `*UNDANGAN GRUP*\n\nSeseorang telah mengundang Anda untuk bergabung dengan grup ini \n\n${link}`, m, {mentions: [m.sender]})
        m.reply(`✅ Tautan undangan dikirim ke pengguna`) 
}
handler.help = ['add']
handler.tags = ['group']
handler.command = /^(add|\+)$/i
handler.group = true
handler.botAdmin = true
module.exports = handler