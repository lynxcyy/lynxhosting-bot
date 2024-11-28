let handler = async (m, {
  usedPrefix,
  command,
  args
}) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Photo only!`)
    let media = await q.download()
    let url = await scrap.uploader(media)
    let old = new Date()
    m.react('🕒')
    let json = await Func.fetchJson(API('alya', '/api/prompter', {
      image: url.data.url
    }, 'apikey'))
    if (!json.status) return m.reply(Func.jsonFormat(json))
    m.reply(json.data.output)
  } catch (e) {
    console.log(e)
    return m.reply(Func.jsonFormat(e))
  }
}
handler.help = ['prompter']
handler.tags = ['tools','premium']
handler.command = ['prompter', 'prompt']
handler.register = true;
handler.premium = true
module.exports = handler