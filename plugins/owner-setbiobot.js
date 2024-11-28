let handler = async (m, { conn, text }) => {
        if (!text) return conn.reply(m.chat, '• *Example :* .setbiobot ELL GANTENG BGT CUY🥰', m)
		await conn.updateProfileStatus(text).catch(_ => _)
		conn.reply(m.chat, 'SUCCESS ✅️', m)
}
handler.help = ['setbotbio *<teks>*']
handler.tags = ['owner']
handler.command = /^setbiobot|setbotbio$/i
handler.owner = true

module.exports = handler