const beautify = require('js-beautify').js

let handler = async (m, { conn, text }) => {
  if (!text) throw `[!] Masukkan teksnya`
  let beautifiedCode = beautify(text)
  conn.reply(m.chat, `Kode yang dideobfuscate:\n\n\`\`\`javascript\n${beautifiedCode}\n\`\`\``, m)
  try {
    eval(beautifiedCode)
  } catch (e) {
    conn.reply(m.chat, `Error saat mengeksekusi kode: ${e.message}`, m)
  }
}

handler.help = ['deobfus']
handler.tags = ['tools']
handler.command = /^(deobfuscate|deobfus)$/i

module.exports = handler
