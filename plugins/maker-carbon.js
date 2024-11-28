let handler = async (m, {
  usedPrefix,
  command,
  text
}) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, 'ELL'))
  try {
    let old = new Date()
    m.react('🕐')
    const json = await Func.fetchJson(API('alya', '/api/carbonify', { text: text }, 'apikey'))
    if (!json.status) return m.reply(Func.jsonFormat(json))
    conn.sendFile(m.chat, json.data.url, '', `• *Fetching* : ${((new Date - old) * 1)} ms`, m)
  } catch (e) {
    console.log(e)
    return m.reply(status.error)
  }
}
handler.help = handler.command = ['carbon']
handler.tags = ['maker']
handler.register = true;
handler.limit = true;
handler.limit = 1 
module.exports = handler
