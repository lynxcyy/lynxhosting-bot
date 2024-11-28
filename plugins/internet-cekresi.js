let handler = async (m, {
  usedPrefix,
  command,
  text
}) => {
  try {
    if (!text) return m.reply(`Masukan Jenis Ekspedisi Dan Nomor Resi\n\nContoh : ${usedPrefix + command} jnt | JXxxxxxxx`)
    let [ku, rir] = text.split` | `
    m.react('🕒')
    const json = await Func.fetchJson(API('alya', '/api/checkresi', { kurir: `${ku}`, resi: `${rir}` }, 'apikey'))
    if (!json.status) return m.reply(Func.jsonFormat(json))
    m.reply(Func.jsonFormat(json))
  } catch (e) {
    console.log(e)
    return m.reply(Func.jsonFormat(e))
  }
}
handler.help = handler.command = ['cekresi']
handler.tags = ['internet']
handler.register = true
handler.limit = true
module.exports = handler