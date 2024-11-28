const rewards = {
  exp: 100,
  money: 200,
}
const cooldown = 3600000
let handler = async (m,{ conn} ) => {
  let user = global.db.data.users[m.sender]
  if (new Date - user.lastclaim < cooldown) return m.reply( `You have already claimed this daily claim!, wait for *${((user.lastclaim + cooldown) - new Date()).toTimeString()}*`)
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    user[reward] += rewards[reward]
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  conn.reply(m.chat,'*––––––『 HOUR 』––––––* \n\n' + text.trim(), m)
  user.lastclaim = new Date * 1
}
handler.help = ['hourly']
handler.tags = ['rpg']
handler.command = /^(hourly|hour)$/i
handler.register = true
handler.limit = true;
handler.cooldown = cooldown
module.exports = handler