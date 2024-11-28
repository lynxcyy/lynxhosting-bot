let handler = async (m, { usedPrefix, command, text }) => {
  try {
    if (!text) return m.reply(Func.example(usedPrefix, command, 'ALONE'))
    m.react('🕒')
    var json = await Func.fetchJson(`https://widipe.com/chord?query=${text}`)
    if (!json.status) return m.reply(Func.jsonFormat(json))
    var result = json.result
    var title = text 
    var chord = result.chord || 'Chord data not available.'
    var message = `
*Title:* ${title}

*Chord:*
${chord}
    `
    
    // Sending the response to the chat
    m.reply(message)
  } catch (e) {
    console.log(e)
    return m.reply('Terjadi kesalahan saat memproses permintaan.')
  }
}

handler.help = ['chord'].map(v => v + 'judul lagu')
handler.tags = ['internet']
handler.command = /^(chord)$/i
handler.register = true;
handler.limit = 1

module.exports = handler
