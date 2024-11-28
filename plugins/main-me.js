let levelling = require('../lib/levelling')
let handler = async (m, {
  usedPrefix,
  command,
  text,
  args
}) => {
  try {
    var pp = await conn.profilePictureUrl(m.sender, 'image')
  } catch (e) {
    var pp = './src/pp.png'
  } finally {
    let setting = db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(setting.level, global.multiplier)
    let pme = `╭───「\t*U S E R - I N F O*\t\n`
    pme += `│ ◦  *Name* : ${conn.getName(m.sender)} ${setting.registered ? '(' + setting.name + ') ' : ''}\n`
    pme += `│ ◦  *Partner* : ${setting.pasangan ? ` @${setting.pasangan.split`@`[0]}` : '×'}\n`
    pme += `│ ◦  *Exp* : ${Func.formatNumber(setting.exp)} (${setting.exp - min} / ${xp})\n`
    pme += `│ ◦  *Level* : ${setting.level}\n`
    pme += `│ ◦  *Role* : ${setting.role}\n`
    pme += `│ ◦  *Limit* : ${Func.formatNumber(setting.limit)}\n`
    pme += `│ ◦  *Money* : ${Func.formatNumber(setting.money)}\n`
    pme += `╰──────────────✧\n`
    pme += `╭───「\t*U S E R - S T A T U S*\t」\n`
    pme += `│ ◦  *Register* : ${setting.registered ? "√" : "×"}\n`
    pme += `│ ◦  *Premium* : ${setting.premium ? "√" : "×"}\n`
    pme += `│ ◦  *Expired* : ${setting.premiumTime - new Date() * 1 > 1 ? Func.toDate(setting.premiumTime - new Date() * 1) : "-"}\n`
    pme += `│ ◦  *Banned* : ${setting.banned ? "√" : "×"}\n`
    pme += `╰──────────────✧\n`
    pme += `*ꜱɪᴍᴘʟᴇ ʙᴏᴛ ʙʏ ᴇʟ ᴅᴇ ʟʏɴx*\n╰─｟ *ʟʏɴxʙᴏᴛ - ᴍᴅ* ｠─╯`
    conn.sendMessageModify(m.chat, pme, m, {
      largeThumb: true,
      thumbnail: await Func.fetchBuffer(pp)
    })
  }
}
handler.help = handler.command = ['me']
handler.tag = ['me']
module.exports = handler