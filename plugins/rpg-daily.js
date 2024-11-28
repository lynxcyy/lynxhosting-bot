const rewards = {
  exp: 9999,
  money: 4999,
  limit: 20,
}
const cooldown = 86400000
let handler = async (m,{ conn} ) => {
  let user = global.db.data.users[m.sender]
  if (new Date - user.lastclaim < cooldown) return m.reply( `You have already claimed this daily claim! Please wait for *${msToTime(user.lastclaim + cooldown - new Date())}*`);
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    user[reward] += rewards[reward]
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  conn.reply(m.chat, `DAILY\n` + text.trim(), m)
  user.lastclaim = new Date * 1
}
handler.help = ['daily']
handler.tags = ['rpg']
handler.command = /^(daily|claim)$/i
handler.register = true;
handler.limit = true;

handler.cooldown = cooldown
module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}
