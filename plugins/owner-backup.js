let fs = require('fs')
let handler = async (m, { conn, text }) => {
    m.reply(status.wait)
    let sesi = await fs.readFileSync('./database.json')
    return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'database.json' }, { quoted: m })
}
handler.help = ['backupdb']
handler.tags = ['owner']
handler.command = /^(backup(db))$/i
handler.owner = true

module.exports = handler
