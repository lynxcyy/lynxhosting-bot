const { getDevice } = require('@whiskeysockets/baileys')

let handler = async (m) => {
	m.reply(await getDevice(m.quoted ? m.quoted.id : m.key.id))
}

handler.help = ['getdevice']
handler.tags = ['tools']
handler.register = true
handler.command = /^(getdevice|device)$/i

module.exports = handler