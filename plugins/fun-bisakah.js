let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`Apanya yang bisa?`)
  conn.reply(m.chat, `
*Pertanyaan:* ${m.text}
*Jawaban:* ${pickRandom(['Iya', 'Bisa', 'Tentu saja bisa', 'Tentu bisa', 'Sudah pasti', 'Sudah pasti bisa', 'Tidak', 'Tidak bisa', 'Tentu tidak', 'tentu tidak bisa', 'Sudah pasti tidak'])}
`.trim(), m, m.mentionedJid ? {
    contextInfo: {
      mentionedJid: m.mentionedJid
    }
  } : {})
}
handler.help = ['bisakah']
handler.tags = ['fun']
handler.command = /^bisa(kah)?$/i
handler.register = true;
handler.limit = true;
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
