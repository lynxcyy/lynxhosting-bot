let handler = async (m, { 
  conn,
  usedPrefix, 
  command, 
  args
}) => {
  if (!args[0]) return m.reply(Func.example(usedPrefix, command, 'https://Instagram.com'))
  if (!Func.isUrl(args[0])) return m.reply(status.invalid)
  m.react('🕒')
  try {
    const json = await Func.fetchJson(API('alya', '/api/shorten', { url: args[0] }, 'apikey'))
    if (!json.status) return m.reply(Func.jsonFormat(json))
    await m.reply(Func.jsonFormat(json))
  } catch (e) {
    console.log(e)
    return m.reply(Func.jsonFormat(e))
  }
}
handler.help = ['shortlink']
handler.tags = ['tools']
handler.command = /^(shortlink|short|shorturl)$/i
handler.register = true;
handler.limit = true
module.exports = handler