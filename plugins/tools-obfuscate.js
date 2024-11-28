const JavaScriptObfuscator = require('javascript-obfuscator')

let handler = async (m, { conn, text }) => {
if (!text) throw `[!] Masukan textnya`
let res = JavaScriptObfuscator.obfuscate(text)
conn.reply(m.chat, res.getObfuscatedCode(), m)
}
handler.help = ['obfus']
handler.tags = ['tools']
handler.command = /^(obfuscate|obfus)$/i

module.exports = handler